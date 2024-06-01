import { Address } from "viem";
import { Chain, bsc, bscTestnet } from "wagmi/chains";
interface IAddressConfig {
  lotteryEscrowFactory: Address;
  market: Address;
}
const addressConfig: Record<Chain["id"], IAddressConfig> = {
  [bscTestnet.id]: {
    lotteryEscrowFactory: "0x7C9621B1B60A2dFb22Bd427cA429066015Ed0EFF",
    market: "0xBE9137770D8546A7494a94c87C88273f04571a48",
  },
  [bsc.id]: {
    lotteryEscrowFactory: "0x7C9621B1B60A2dFb22Bd427cA429066015Ed0EFF",
    market: "0xBE9137770D8546A7494a94c87C88273f04571a48",
  },
};

export default addressConfig;
