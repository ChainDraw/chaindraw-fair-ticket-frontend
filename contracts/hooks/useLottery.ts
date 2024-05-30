import useAuthStore from "@/stores/authStore";
import { useConnectModal } from "@rainbow-me/rainbowkit";

import { Address, parseEther, parseUnits } from "viem";
import { useAccount, useSimulateContract, useWalletClient } from "wagmi";
import {
  useReadLotteryCompleteDraw,
  useReadLotteryDdl,
  useReadLotteryDeposits,
  useReadLotteryIsWinner,
  useReadLotteryPrice,
  useWriteLotteryApprove,
  useWriteLotteryDeposit,
  useWriteLotteryRefund,
  useWriteLotteryStartLottery,
} from "../generated";
import toast from "react-hot-toast";

export const useLottery = (contractAddress: Address) => {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { authStatus } = useAuthStore();
  // Getter
  const { data: price, error: priceError } = useReadLotteryPrice({
    address: contractAddress,
  });
  const { data: isWinner } = useReadLotteryIsWinner({
    address: contractAddress,
    args: [address!],
  });
  const { data: isEnded } = useReadLotteryCompleteDraw();
  const { data: isJoin } = useReadLotteryDeposits({
    address: contractAddress,
    args: [address!],
  });
  const { data: ddl } = useReadLotteryDdl({ address: contractAddress });
  // Write
  const { writeContractAsync: refund } = useWriteLotteryRefund();

  const handleRefound = async () => {
    try {
      await refund({ address: contractAddress, args: [address!] });
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  };

  const { writeContractAsync: deposit } = useWriteLotteryDeposit();

  const handleDeposit = async () => {
    if (authStatus === "unauthenticated") {
      openConnectModal!();
      return;
    }
    if (!price) {
      console.log("price not");
      return;
    }

    try {
      const result = await deposit({
        address: contractAddress,
        args: [],
        value: price,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const { writeContractAsync: startLottery, error } =
    useWriteLotteryStartLottery();

  const handleStartLottery = async () => {
    try {
      const data = await startLottery({
        address: contractAddress,
        gas: BigInt(400000),
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleRefound,
    handleDeposit,
    handleStartLottery,
    price,
    isWinner,
    isJoin,
    isEnded,
    ddl,
  };
};
