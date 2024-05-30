import { Address } from "viem";
import { Chain, bsc, bscTestnet } from "wagmi/chains";
interface IAddressConfig {
  lotteryEscrowFactory: Address;
  market: Address;
}
const addressConfig: Record<Chain["id"], IAddressConfig> = {
  [bscTestnet.id]: {
    lotteryEscrowFactory: "0xF27ae6E1336BdC88161D7591355495C6ed98947e",
    market: "0xD2BDf4F1F8f667d91809594cbbdCc7b23a160656",
  },
  [bsc.id]: {
    lotteryEscrowFactory: "0x271fAE920a22e50E27E7ec6fD1a1aD097d48d86a",
    market: "0xD2BDf4F1F8f667d91809594cbbdCc7b23a160656",
  },
};

export default addressConfig;
