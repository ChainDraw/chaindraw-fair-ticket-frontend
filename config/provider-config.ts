import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { bscTestnet, bsc, Chain } from "wagmi/chains";
declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
if (!projectId) throw new Error("Project ID is not defined");
const isDev = process.env.NODE_ENV === "development";
export const supportChains: [Chain, ...Chain[]] = isDev
  ? [bscTestnet]
  : [bscTestnet];
const isClient = typeof window === "undefined" ? true : false;
const connectors = !isClient
  ? connectorsForWallets(
      [
        {
          groupName: "Recommended",
          wallets: [
            rainbowWallet,
            metaMaskWallet,
            coinbaseWallet,
            walletConnectWallet,
          ],
        },
        {
          groupName: "Other",
          wallets: [argentWallet, trustWallet, ledgerWallet],
        },
      ],
      { appName: "Ticket", projectId: projectId }
    )
  : [];

export const config = createConfig({
  chains: supportChains,
  connectors,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [bscTestnet.id]: http(),
  },
});
