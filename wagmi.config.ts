import { react } from "@wagmi/cli/plugins";
import LotteryEscrowABI from "./contracts/abis/LotteryEscrow.json";
import { getNetwork } from "./contracts/hooks/useNetwork";
import MarketABI from "./contracts/abis/LotteryMarket.json";
const { market } = getNetwork(97);
console.log(market);
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
