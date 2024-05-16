"use client";

import { useAccount } from "wagmi";
import addressConfig from "../contractAddressConfig";
const getNetwork = (chainId?: number) => {
  if (chainId === undefined || !addressConfig[chainId]) {
    return addressConfig[97];
  }
  return addressConfig[chainId];
};
const useNetworkData = () => {
  const { chainId } = useAccount();
  const networkData = getNetwork(chainId);
  return networkData;
};

export default useNetworkData;
