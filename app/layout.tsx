import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { ContextProvider } from "@/config/context";
import { headers } from "next/headers";
import { cn } from "@/lib/utils";
import Header from "@/components/header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChainDraw",
  description:
    "ChainDraw 是一个去中心化的演唱会门票抽选系统，旨在提供一个公平、透明的门票分配平台。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = headers().get("cookie");
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <ContextProvider cookie={cookie}>
          <Header />
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
