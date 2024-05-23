import { react } from "@wagmi/cli/plugins";
import LotteryEscrowFactoryABI from "./contracts/abis/LotteryEscrowFactory.json";
import { bscTestnet } from "viem/chains";
import { getNetwork } from "./contracts/hooks/useNetwork";
const { lotteryEscrowFactory } = getNetwork(97);
console.log(lotteryEscrowFactory);
export default {
  out: "contracts/generated.ts",
  contracts: [
    {
      abi: LotteryEscrowFactoryABI,
      address: {
        [bscTestnet.id]: lotteryEscrowFactory,
      },
      name: "LotteryEscrowFactory",
    },
  ],
  plugins: [react()],
};
