import { JSONParser } from '@streamparser/json-node';
import { Readable } from 'stream';

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const STREAM_TIMEOUT = 5 * 60 * 1000; // 5 minutes

export type UploadJsonConfig = {
  onData?: (chunk: {
    value: unknown,
    key: string,
    stack: { key: string; }[];
  }) => Promise<void>;
  onError?: (err: Error) => Promise<void>;
  onEnd?: () => Promise<void>;
  paths?: string[];
};

export const uploadJsonStream = async (readable: Readable, config: UploadJsonConfig) => {

  const jsonParserConfig = config.paths ? { paths: config.paths } : undefined;

  const parser = new JSONParser(jsonParserConfig);

  await new Promise<void>((resolve, reject) => {

    if (!!config.onData) {
      parser.on('data', config.onData);
    }

    if (!!config.onError) {
      parser.on('error', async (err) => {
        console.error('Parsing error:', err);
        await config.onError?.(err);
        reject(new Error('Parsing error', { cause: err }));
      });
    }

    if (!!config.onEnd) {
      parser.on('end', async () => {
        await config.onEnd?.();
        resolve();
      });
    }

    readable.pipe(parser);
  });

};
