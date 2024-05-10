"use client";
import React, { ReactNode, useMemo, useState } from "react";
import {
  AuthenticationStatus,
  RainbowKitAuthenticationProvider,
  RainbowKitProvider,
  createAuthenticationAdapter,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, cookieToInitialState } from "wagmi";
import { config } from "./provider-config";
import { SiweMessage } from "siwe";
const queryClient = new QueryClient();
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<AuthenticationStatus>("unauthenticated");
  const authenticationAdapter = useMemo(
    () =>
      createAuthenticationAdapter({
        getNonce: async () => {
          // const res = await fetch("/api/nonce");
          // return res.text()
          await new Promise((r) => setTimeout(r, 100));
          const nonce = "mockNonce";
          return nonce;
        },

        createMessage: ({ nonce, address, chainId }) => {
          return new SiweMessage({
            domain: window.location.host,
            address,
            statement: `Welcome to ChainDraw`,
            uri: window.location.origin,
            version: "1",
            chainId,
            nonce,
          });
        },

        getMessageBody: ({ message }) => {
          return message.prepareMessage();
        },

        verify: async ({ message, signature }) => {
          setStatus("loading");
          // const verifyRes = await fetch("/api/verify", {
          //   method: "POST",
          //   headers: { "Content-Type": "application/json" },
          //   body: JSON.stringify({ message, signature }),
          // });
          // return Boolean(verifyRes.ok);\
          setStatus("authenticated");
          return true;
        },

        signOut: async () => {},
      }),
    []
  );

  return (
    <RainbowKitAuthenticationProvider
      adapter={authenticationAdapter}
      status={status}
    >
      <RainbowKitProvider>{children}</RainbowKitProvider>
    </RainbowKitAuthenticationProvider>
  );
};
export function ContextProvider({
  children,
  cookie,
}: {
  children: ReactNode;
  cookie?: string | null;
}) {
  // cookie 缓存 连接状态 ssr
  const initialState = cookieToInitialState(config, cookie);
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RainbowKitProvider locale="zh-CN">{children}</RainbowKitProvider>
        </AuthProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
