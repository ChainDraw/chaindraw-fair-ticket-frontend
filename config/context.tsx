'use client';

import React, { ReactNode } from 'react';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { State, WagmiProvider } from 'wagmi';
import { config } from './provider-config';

const queryClient = new QueryClient();

export function ContextProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale="zh-CN">{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
