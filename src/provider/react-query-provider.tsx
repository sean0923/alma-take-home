'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
});

export const ReactQueryProvider = (props: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;
};
