import { Chain, bsc, bscTestnet } from "wagmi/chains";
interface IAddressConfig {
  tickFactory: string;
  ticket: string;
  ticketLottery: string;
  testToken: string;
}
const addressConfig: Record<Chain["id"], IAddressConfig> = {
  [bscTestnet.id]: {
    tickFactory: "",
    ticket: "",
    ticketLottery: "",
    testToken: "",
  },
  [bsc.id]: {
    tickFactory: "",
    ticket: "",
    ticketLottery: "",
    testToken: "",
  },
};
export default addressConfig;
