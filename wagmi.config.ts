import { react } from "@wagmi/cli/plugins";
import LotteryEscrowABI from "./contracts/abis/LotteryEscrow.json";
import { getNetwork } from "./contracts/hooks/useNetwork";
const { lotteryEscrowFactory } = getNetwork(97);
console.log(lotteryEscrowFactory);
export default {
  out: "contracts/generated.ts",
  contracts: [
    {
      abi: LotteryEscrowABI.abi,
      name: "Lottery",
    },
  ],
  plugins: [react()],
};
