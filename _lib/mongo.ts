import {
  ClientSession,
  Db,
  MongoClient,
  MongoError,
  ObjectId,
  ServerApiVersion,
} from 'mongodb';

declare let global: {
  dbCache: Map<string, Db>;
  mongoConnection: Promise<MongoClient>;
};

const maxTransactionRetryCount = 6;

export class Mongo {

  public static get dbCache(): Map<string, Db> {
    if (!global['dbCache']) {
      global['dbCache'] = new Map<string, Db>();
    }

    return global['dbCache'] as Map<string, Db>;
  }

  public static get client(): Promise<MongoClient> {

    if (!global['mongoConnection']) {
      global['mongoConnection'] = (new MongoClient(
        process.env.MONGO_DB_URI!,
        {
          serverApi: ServerApiVersion.v1,
          ...(process.env.NODE_ENV !== 'production' && {
            maxConnecting: 10,
            maxIdleTimeMS: 10,
          }),
        },
      )).connect();
    }

    return global['mongoConnection'] as Promise<MongoClient>;

  }

  public static createSession = async (): Promise<ClientSession> => {
    return (await Mongo.client).startSession();
  };

  public static createStringId = (id?: string | undefined) => {
    return new ObjectId(id).toString();
  };

  public static db = async (dbName: string | undefined): Promise<Db> => {

    const db = dbName || process.env.DB_NAME;

    if (!db) {
      throw new Error('dbName not set');
    }

    if (!Mongo.dbCache.has(db)) {
      const newDb = (await Mongo.client).db(db);
      Mongo.dbCache.set(db, newDb);
    }

    return Mongo.dbCache.get(db)!;
  };

  public static withTransaction = async <T>(
    handler: (session: ClientSession) => T | Promise<T>,
  ) => {
    const session = await Mongo.createSession();

    try {
      return await Mongo.runTransactionWithRetry<T>(session, handler);
    } catch (error) {
      console.info('Transaction failed, aborting...');
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  };

  private static async runTransactionWithRetry<T>(
    session: ClientSession,
    handler: (session: ClientSession) => T | Promise<T>,
    retryCount: number = 0,
  ): Promise<T> {

    try {
      session.startTransaction();
      const result = await handler(session);
      await Mongo.commitWithRetry(session);
      return result;
    } catch (err) {
      console.error(err);

      if (!(err instanceof MongoError)) {
        throw err;
      }

      if (retryCount >= maxTransactionRetryCount) {
        throw new Error('Maximum number of transaction retries attempted', { cause: err });
      }

      // If transient error, retry the whole transaction
      if (err.hasErrorLabel('TransientTransactionError')) {
        console.info('TransientTransactionError, retrying transaction ...');

        return await Mongo.runTransactionWithRetry<T>(session, handler, ++retryCount);
      } else {
        throw err;
      }
    }
  }

  private static async commitWithRetry(
    session: ClientSession,
    retryCount: number = 0,
  ) {

    try {
      await session.commitTransaction();
      console.info('Transaction committed.');
    } catch (err) {
      console.error(err);

      if (!(err instanceof MongoError)) {
        throw err;
      }

      if (retryCount >= maxTransactionRetryCount) {
        throw new Error('Maximum number of commit retries attempted', { cause: err });
      }

      if (err.hasErrorLabel('UnknownTransactionCommitResult')) {
        console.info('UnknownTransactionCommitResult, retrying commit operation ...');
        await Mongo.commitWithRetry(session, ++retryCount);
      } else {
        console.error('Error during commit ...');
        throw err;
      }
    }
  }
}
