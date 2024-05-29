"use client";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import {
  RainbowKitAuthenticationProvider,
  RainbowKitProvider,
  createAuthenticationAdapter,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, cookieToInitialState } from "wagmi";
import { config } from "./provider-config";
import { SiweMessage } from "siwe";
import useAuthStore from "@/stores/authStore";
import {
  fetchNonce,
  fetchUserInfo,
  fetchVerifySignature,
} from "@/services/api";

const queryClient = new QueryClient();
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { authStatus, setAuthStatus } = useAuthStore();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchUserInfo();
        setAuthStatus(
          response.code !== -1 ? "authenticated" : "unauthenticated"
        );
      } catch (error) {
        console.log("error: ", error);
        setAuthStatus("unauthenticated");
      }
    };
    fetch();
  }, []);
  const expirationTime = new Date(Date.now() + 15 * 60 * 1000).toISOString();
  const authAdapter = useMemo(() => {
    return createAuthenticationAdapter({
      getNonce: async () => {
        const response = await fetchNonce();
        return response;
      },

      createMessage: ({ nonce, address, chainId }) => {
        return new SiweMessage({
          domain: window.location.host,
          address,
          statement: "Sign in with Ethereum to the app.",
          uri: window.location.origin,
          version: "1",
          chainId,
          nonce,
          expirationTime,
        });
      },

      getMessageBody: ({ message }) => {
        return message.prepareMessage();
      },

      verify: async ({ message, signature }) => {
        try {
          const messageString = message.prepareMessage();
          setAuthStatus("loading");
          const verifyRes = await fetchVerifySignature(
            messageString,
            signature
          );
          if (verifyRes.code === 0) {
            setAuthStatus("authenticated");
          } else if (verifyRes.code === -1) {
            setAuthStatus("unauthenticated");
          }
          return !!verifyRes.ok;
        } catch (error) {
          console.log("verify", error);
          setAuthStatus("unauthenticated");
          return false;
        }
      },

      signOut: async () => {},
    });
  }, []);

  return (
    <RainbowKitAuthenticationProvider adapter={authAdapter} status={authStatus}>
      <RainbowKitProvider locale="en-US">{children}</RainbowKitProvider>
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
  const initialState = cookieToInitialState(config, cookie);
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
