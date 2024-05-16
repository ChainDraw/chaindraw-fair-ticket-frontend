import { Address } from "viem";
import { Chain, bsc, bscTestnet } from "wagmi/chains";
interface IAddressConfig {
  tickFactory: Address;
  ticket: Address;
  ticketLottery: Address;
  token: Address;
}
const addressConfig: Record<Chain["id"], IAddressConfig> = {
  [bscTestnet.id]: {
    tickFactory: "0x6b175474e89094c44da98b954eedeac495271d0f",
    ticket: "0x6b175474e89094c44da98b954eedeac495271d0f",
    ticketLottery: "0x6b175474e89094c44da98b954eedeac495271d0f",
    token: "0x6b175474e89094c44da98b954eedeac495271d0f",
  },
  [bsc.id]: {
    tickFactory: "0x6b175474e89094c44da98b954eedeac495271d0f",
    ticket: "0x6b175474e89094c44da98b954eedeac495271d0f",
    ticketLottery: "0x6b175474e89094c44da98b954eedeac495271d0f",
    token: "0x6b175474e89094c44da98b954eedeac495271d0f",
  },
};

export default addressConfig;
