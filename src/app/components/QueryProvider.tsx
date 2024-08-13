'use client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();
import React, { ReactNode } from 'react';

const QueryProvider = ({ children }: { children: ReactNode }) => {
  return (
  <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
  </QueryClientProvider >
);
};

export default QueryProvider;