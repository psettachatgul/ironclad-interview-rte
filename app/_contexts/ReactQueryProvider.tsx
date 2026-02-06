'use client';

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AxiosError } from 'axios';
import { ZodError } from 'zod';

const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';

const logError = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response?.data) {
      return console.error(error.response.data);
    }
  }

  console.error(error);
};

const handleError = (error: unknown) => {
  logError(error);
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleError,
  }),
  mutationCache: new MutationCache({
    onError: handleError,
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: isProduction,
      retry: (count, error) => {
        if (error instanceof ZodError) return false;
        return count < 3;
      },
    },
  },
});

interface PropTypes {
  children: React.ReactNode;
}

const ReactQueryProvider = ({ children }: PropTypes) => {

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {!isProduction && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom" buttonPosition="bottom-left" />
      )}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
