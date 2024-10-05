"use client";

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { ReactNode } from 'react';

const config = getDefaultConfig({
  appName: 'op-wallet',
  projectId: 'fa4b924238637332f41e25d81690178b',
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  ssr: true, 
});

const queryClient = new QueryClient();

const Provider = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          { children }
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Provider;