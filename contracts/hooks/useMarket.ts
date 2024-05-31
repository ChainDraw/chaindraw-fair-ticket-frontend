import { Address } from "viem";
import {
  marketAddress,
  useWriteLotteryApprove,
  useWriteMarketBuyNft,
  useWriteMarketListNft,
} from "../generated";

export const useMarketBuy = () => {
  const {
    writeContractAsync: buy,
    isPending,
    isSuccess,
  } = useWriteMarketBuyNft();
  const handleBuy = async (
    lotteryAddress: Address,
    tokenId: string,
    price: string
  ) => {
    try {
      const data = await buy({
        args: [lotteryAddress, BigInt(tokenId)],
        value: BigInt(price),
      });
    } catch (error) {
      console.log("handleBuy", error);
    }
  };

  return { handleBuy, isPending, isSuccess };
};
