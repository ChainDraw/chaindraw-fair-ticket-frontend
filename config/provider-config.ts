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
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  sepolia,
} from "wagmi/chains";
import { injected } from "wagmi/connectors";
declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
if (!projectId) throw new Error("Project ID is not defined");
const isDev = process.env.NODE_ENV === "development";
// const supportChains: [Chain, ...Chain[]] = isDev ? [bscTestnet] : [bsc];
const isClient = typeof window === "undefined" ? true : false;
console.log(isClient);
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
  chains: [mainnet /**........ */],
  connectors,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [mainnet.id]: http(),
    // [bscTestnet.id]: http(process.env.BSC_RPC),
  },
});
