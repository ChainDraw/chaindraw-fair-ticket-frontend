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
export const useMarketList = () => {
  const {
    writeContractAsync: list,
    isPending,
    isSuccess,
  } = useWriteMarketListNft();
  const handleList = async (
    lotteryAddress: Address,
    tokenId: string,
    price: string
  ) => {
    const { writeContractAsync: approve, isError } = useWriteLotteryApprove();
    try {
      await approve({
        address: lotteryAddress,
        args: [marketAddress, BigInt(tokenId)],
      });
      if (isError) {
        console.log("handleList", "error");
        return;
      }
      const data = await list({
        args: [lotteryAddress, BigInt(tokenId), BigInt(price)],
      });
    } catch (error) {
      console.log("handleList", error);
    }
  };
  return { handleList, isPending, isSuccess };
};
