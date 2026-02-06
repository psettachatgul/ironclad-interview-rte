import { NextRequest, NextResponse } from 'next/server';
import { ZUploadFileParams } from './_schemas';
import { handleUpload, HandleUploadBody } from '@vercel/blob/client';
import { del } from '@vercel/blob';
import axios from 'axios';
import { uploadJsonStream } from '../../../../lib/jsonStreamHelpers';
import { handleRoute } from '../../../../lib/routes';

export const maxDuration = 300;

export const POST = handleRoute(
  async (request: NextRequest, params) => {

    const body = (await request.json()) as HandleUploadBody;

    const { fileName } = ZUploadFileParams.parse(params);

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {

        return {
          allowedContentTypes: ['application/json'],
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async ({ blob }) => {

        console.log(`going to process ${blob.url}`);

        const response = await axios.get(blob.url, { responseType: 'stream' });
        await uploadJsonStream(response.data, {/** config stuff */ });
        await del(blob.url);

      },
    });

    return NextResponse.json(
      jsonResponse,
      { status: 200 },
    );
  },
);
