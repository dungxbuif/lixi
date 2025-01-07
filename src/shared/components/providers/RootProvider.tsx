'use client';
import { store } from '@/shared/config/store.config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Provider } from 'react-redux';

interface IRootProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const RootProvider = ({ children }: IRootProviderProps) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
};

export default RootProvider;
