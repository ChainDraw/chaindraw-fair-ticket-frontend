import { react } from "@wagmi/cli/plugins";
import LotteryEscrowABI from "./contracts/abis/LotteryEscrow.json";
import { getNetwork } from "./contracts/hooks/useNetwork";
import MarketABI from "./contracts/abis/LotteryMarket.json";
import { abi } from "./contracts/abis/erc721";
const { lotteryEscrowFactory, market } = getNetwork(97);

export default {
  out: "contracts/generated.ts",
  contracts: [
    {
      abi: LotteryEscrowABI.abi,
      name: "Lottery",
    },
    {
      abi: MarketABI.abi,
      name: "Market",
      address: market,
    },
  ],
  plugins: [react()],
};
