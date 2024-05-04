"use client";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
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
// fake signature  use JWT or Session cookie
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<AuthenticationStatus>("unauthenticated");
  async function signIn() {
    const token = localStorage.getItem("token");
    if (!token) return;
    setStatus("authenticated");
  }
  useEffect(() => {
    signIn();
  }, []);
  const authenticationAdapter = useMemo(
    () =>
      createAuthenticationAdapter({
        getNonce: async () => {
          await new Promise((r) => setTimeout(r, 100));
          const nonce = "mockNonce";
          return nonce;
        },

        createMessage: ({ nonce, address, chainId }) => {
          return new SiweMessage({
            domain: window.location.host,
            address,
            statement: "Disclaimer",
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
          const verifyResult = {
            data: {
              status: "SUCCESS",
              token: `${Math.random()}token`,
            },
          };
          if (verifyResult.data.status === "SUCCESS") {
            setStatus("authenticated");
            localStorage.setItem("token", verifyResult.data.token);
            return true;
          }
          setStatus("unauthenticated");
          return false;
        },

        signOut: async () => {
          localStorage.removeItem("token");
          setStatus("unauthenticated");
        },
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
