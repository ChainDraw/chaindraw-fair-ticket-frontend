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
  const [authStatus, setAuthStatus] =
    useState<AuthenticationStatus>("unauthenticated");
  console.log(authStatus);
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       // const response = await fetch("http://localhost:3000/me");
  //       // const { address } = await response.json();
  //       // console.log("address: ", address);
  //       setAuthStatus(false ? "authenticated" : "unauthenticated");
  //     } catch (error) {
  //       console.log("error: ", error);
  //       setAuthStatus("unauthenticated");
  //     }
  //   };
  //   fetchUser();

  //   window.addEventListener("focus", fetchUser);

  //   return () => {
  //     window.removeEventListener("focus", fetchUser);
  //   };
  // }, []);
  const authAdapter = useMemo(() => {
    return createAuthenticationAdapter({
      getNonce: async () => {
        const response = await fetch(
          "http://localhost:3000/api/signMessage/nonce"
        );
        const { data } = await response.json();
        return data.nonce;
      },

      createMessage: ({ nonce, address, chainId }) => {
        console.log(nonce, address, chainId);
        return new SiweMessage({
          domain: window.location.host,
          address,
          statement: "Sign in with Ethereum to the app.",
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
        try {
          setAuthStatus("loading");
          const verifyRes = await fetch(
            "http://localhost:3000/api/signMessage/verify",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ message, signature }),
            }
          );
          setAuthStatus("authenticated");
          return !!verifyRes.ok;
        } catch (error) {
          setAuthStatus("unauthenticated");
          return false;
        }
      },

      signOut: async () => {
        await fetch("http://localhost:3000/logout");
        setAuthStatus("unauthenticated");
      },
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
