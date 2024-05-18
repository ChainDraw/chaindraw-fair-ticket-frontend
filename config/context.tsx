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
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authStatus, setAuthStatus] = useState<AuthenticationStatus>("loading");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "http://www.biturd.com/api/v1/user/personal_information"
        );
        const { code } = await response.json();
        console.log(code !== -1);
        setAuthStatus(code !== -1 ? "authenticated" : "unauthenticated");
      } catch (error) {
        console.log("error: ", error);
        setAuthStatus("unauthenticated");
      }
    };
    fetchUser();
  }, []);
  const expirationTime = new Date(Date.now() + 15 * 60 * 1000).toISOString();
  const authAdapter = useMemo(() => {
    return createAuthenticationAdapter({
      getNonce: async () => {
        const response = await fetch("http://www.biturd.com/api/v1/user/nonce");
        const data = await response.json();
        return data.data;
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
          setAuthStatus("loading");
          console.log(message, signature);
          const verifyRes = await fetch(
            "http://www.biturd.com/api/v1/user/verify",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ message, signature }),
            }
          );
          const res = await verifyRes.json();
          console.log(verifyRes.ok);
          console.log(res);
          setAuthStatus("authenticated");
          return !!verifyRes.ok;
        } catch (error) {
          setAuthStatus("unauthenticated");
          return false;
        }
      },

      signOut: async () => {},
    });
  }, []);

  return (
    <RainbowKitAuthenticationProvider adapter={authAdapter} status={authStatus}>
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
  const initialState = cookieToInitialState(config, cookie);
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
