import { Address } from "viem";
import { Chain, bsc, bscTestnet } from "wagmi/chains";
interface IAddressConfig {
  lotteryEscrowFactory: Address;
  market: Address;
}
const addressConfig: Record<Chain["id"], IAddressConfig> = {
  [bscTestnet.id]: {
    lotteryEscrowFactory: "0x7C9621B1B60A2dFb22Bd427cA429066015Ed0EFF",
    market: "0xefA0E99A60512cDDa5bEA302b40438A76b8b78E2",
  },
  [bsc.id]: {
    lotteryEscrowFactory: "0x7C9621B1B60A2dFb22Bd427cA429066015Ed0EFF",
    market: "0xefA0E99A60512cDDa5bEA302b40438A76b8b78E2",
  },
};

export default addressConfig;
