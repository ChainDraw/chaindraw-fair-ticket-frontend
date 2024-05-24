import { Address } from "viem";
import { Chain, bsc, bscTestnet } from "wagmi/chains";
interface IAddressConfig {
  lotteryEscrowFactory: Address;
  // token: Address;
}
const addressConfig: Record<Chain["id"], IAddressConfig> = {
  [bscTestnet.id]: {
    lotteryEscrowFactory: "0xF27ae6E1336BdC88161D7591355495C6ed98947e",
  },
  [bsc.id]: {
    lotteryEscrowFactory: "0x271fAE920a22e50E27E7ec6fD1a1aD097d48d86a",
  },
};

export default addressConfig;
