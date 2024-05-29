import { encodeFunctionData, type WriteContractParameters } from "viem";
import { useEstimateGas } from "wagmi";

export function useEstimateExtraGas(
  params: WriteContractParameters,
  percentage: bigint
) {
  const data = params ? encodeFunctionData(params) : null;

  const { data: estimatedGas } = useEstimateGas(
    data ? { data, to: params.address } : undefined
  );

  const estimatedWithExtra = estimatedGas
    ? (estimatedGas * percentage) / BigInt(100)
    : null;

  return estimatedWithExtra;
}
