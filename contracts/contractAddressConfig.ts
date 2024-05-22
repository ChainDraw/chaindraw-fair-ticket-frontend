import { Address } from "viem";
import { Chain, bsc, bscTestnet } from "wagmi/chains";
interface IAddressConfig {
  lotteryEscrowFactory: Address;
  token: Address;
}
const addressConfig: Record<Chain["id"], IAddressConfig> = {
  [bscTestnet.id]: {
    lotteryEscrowFactory: "0xff815403829C77192fBFb8E9590D2EC23a2594e7",
    token: "0x6b175474e89094c44da98b954eedeac495271d0f",
  },
  [bsc.id]: {
    lotteryEscrowFactory: "0x271fAE920a22e50E27E7ec6fD1a1aD097d48d86a",
    token: "0x6b175474e89094c44da98b954eedeac495271d0f",
  },
};

export default addressConfig;
