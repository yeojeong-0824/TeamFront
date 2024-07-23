'use client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();
import React, { ReactNode } from 'react';

const Query_provider = ({ children }: { children: ReactNode }) => {
  return (
  <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
  </QueryClientProvider >
);
};

export default Query_provider;