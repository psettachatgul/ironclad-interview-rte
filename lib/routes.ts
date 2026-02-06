import { NextRequest, NextResponse } from 'next/server';

export const getAllSearchParams = (request: NextRequest): unknown => {

  return getAllSearchParamsFromEntries(request.nextUrl.searchParams.entries());
};

export const getAllSearchParamsFromEntries = (entries: URLSearchParamsIterator<[string, string]>) => {

  return entries.reduce(
    (params, [key, value]) => {

      return {
        ...params,
        [key]: value,
      };
    },
    {},
  );

};

export const handleRoute = (
  cb: (request: NextRequest, params?: unknown) => Promise<NextResponse<unknown>>,
): (request: NextRequest) => Promise<NextResponse<unknown>> => {

  return async (request: NextRequest) => {
    try {
      const params = getAllSearchParams(request);
      return await cb(request, params);
    }
    catch (err) {
      console.error(`Error in ${request.method} ${request.url}:`, err);
      return NextResponse.json(
        {
          success: false,
          message: JSON.stringify(err),
        },
        { status: 500 },
      );
    }
  };
};
