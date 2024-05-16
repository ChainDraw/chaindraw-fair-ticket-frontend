"use client";

import type { Abi, Address } from "viem";
import erc20ABI from "../abis/erc20.json";
import { useReadContract, useWriteContract } from "wagmi";
import type {
  UseReadContractParameters,
  UseWriteContractParameters,
} from "wagmi";
import { config } from "@/config/provider-config";
import useNetworkData from "./useNetwork";
import { handleError } from "@/utils/errors";
type UseTokenReadParameters = Omit<
  UseReadContractParameters,
  "abi" | "address" | "functionName" | "args"
>;

export function useTokenRead<T = unknown>(
  functionName: string,
  args: Array<any> = [],
  options?: UseTokenReadParameters
) {
  const { token } = useNetworkData();
  return useReadContract({
    abi: erc20ABI as Abi,
    address: token,
    functionName: functionName,
    args,
    ...options,
  });
}

type useTokenWriteParameters = Pick<
  UseWriteContractParameters,
  "mutation"
>["mutation"];

export function useTokenWrite(
  functionName: string,
  options?: useTokenWriteParameters
) {
  const { token } = useNetworkData();
  const { writeContractAsync, writeContract, ...rest } = useWriteContract({
    config: config,
    mutation: {
      onError: (error) => {
        handleError(error);
      },
      onSettled: (data) => {
        console.log(data);
      },
      ...options,
    },
  });

  const write = async (args: Array<any> = []) => {
    await writeContractAsync({
      abi: erc20ABI as Abi,
      address: token,
      args,
      functionName,
    });
  };
  return { write, ...rest };
}
