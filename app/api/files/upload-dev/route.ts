import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'node:stream';
import { handleRoute } from '../../../../lib/routes';
import { ZUploadFileParams } from '../upload/_schemas';
import { uploadJsonStream } from '../../../../lib/jsonStreamHelpers';

export const maxDuration = 300;

// this is just to handle log file imports for dev as vercel would need to do a callback to the host
export const POST = handleRoute(
  async (request: NextRequest, params) => {

    const { fileName } = ZUploadFileParams.parse(params);

    const body = request.body;

    if (!!body) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nodeReadableStream = Readable.fromWeb(body as any);
      await uploadJsonStream(nodeReadableStream, {
        onData: async () => {
          console.log('onData fired');
        },
        onEnd: async () => {
          console.log('onEnd fired');
        },
        onError: async () => {
          console.log('onError fired');
        },
      });
    }


    return NextResponse.json(
      { success: true },
      { status: 200 },
    );
  },
);
