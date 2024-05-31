"use client";
import MaxWidthWrapper from "@/components/client/MaxWidthWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useLottery } from "@/contracts/hooks/useLottery";
import useAuthStore from "@/stores/authStore";
import { paths } from "@/utils/paths";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import CountdownComponent from "../../components/countdowm/CountDown";
import { useLotteryInfo } from "@/services/api";
import { formatAddress } from "@/utils/common";
import { Address } from "viem";

const LotteryInfo = ({ params }: { params: { lotteryId: string } }) => {
  const { lotteryId } = params;
  // 合约地址
  const contractAddress = lotteryId as Address;

  const {
    handleDeposit,
    handleRefound,
    handleStartLottery,
    isWinner,
    isJoin,
    isEnded,
  } = useLottery(contractAddress);
  const { authStatus } = useAuthStore();
  const { data: lotteryInfo } = useLotteryInfo(lotteryId);

  const image =
    "https://gateway.pinata.cloud/ipfs/" +
    lotteryInfo?.nftMetadata?.image?.split("ipfs://")[1];
  return (
    <main className="min-h-screen bg-black py-10 md:py-20 text-white">
      <MaxWidthWrapper>
        <div className="md:flex justify-between items-start gap-8  md:mt-10">
          <div className="flex md:w-3/5 flex-col">
            <span className="flex flex-col sm:flex-row  sm:items-center font-bold text-sm sm:text-xl text-white mb-4">
              Creator:
              <div className="shrink-0 flex items-center gap-x-2 text-left sm:ml-4 mt-1 sm:mt-0">
                <Avatar>
                  <AvatarImage src="/images/test8.png" />
                  <AvatarFallback>ENS</AvatarFallback>
                </Avatar>

                <span className="font-medium text-sm text-white md:text-xl">
                  {formatAddress(lotteryInfo?.organizer.id)}
                </span>
              </div>
            </span>
            <hr className="mb-5 md:mb-10 opacity-40 bg-brand-black" />
            <div className=" text-white">
              <h1 className="text-2xl md:text-3xl mb-2 md:mb-5 font-bold">
                {lotteryInfo?.nftMetadata?.concertName}
              </h1>
              <div className="mb-2 md:hidden relative">
                <div className="h-64 flex flex-col justify-center bg-dark-panel rounded-3xl overflow-hidden relative">
                  <Image
                    alt="Collectible"
                    width={30}
                    height={30}
                    className="w-full"
                    priority
                    src={image}
                  />
                </div>
              </div>
              <p className="text-lg  mt-5 mb-5 md:mb-12 whitespace-pre-wrap">
                {lotteryInfo && lotteryInfo.nftMetadata.description}
              </p>
              <p className="text-lg  mt-5 mb-5 md:mb-12 whitespace-pre-wrap">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Eveniet voluptatum dolores quasi. Magnam consequatur impedit
                natus voluptatem id placeat ducimus nihil quidem. Fugiat hic
                itaque accusamus sed perferendis, temporibus nihil.
              </p>
            </div>
          </div>
          <div className="hidden md:block md:w-2/5">
            <CountdownComponent targetTime={Number(lotteryInfo?.ddl)} />
            <div className="w-full h-64 flex flex-col justify-center bg-dark-panel rounded-3xl overflow-hidden relative">
              <Image
                alt="Lottery Image"
                width={300}
                height={200}
                priority
                className="w-full"
                src={image}
              />
            </div>

            <div className="hidden md:flex items-center justify-between py-14">
              <h2 className="text-xl mb-2.5 font-bold">Price:</h2>
              <span className="flex items-center space-x-2 mb-2.5">
                <p className="text-3xl md:text-5xl font-bold">
                  {lotteryInfo?.price}
                  <span className="text-blue mr-1"> Wei</span>
                </p>
              </span>
            </div>
            {authStatus === "authenticated" ? (
              <div>
                {isJoin?.toString() !== "0" ? (
                  isWinner ? (
                    <div>
                      <h1 className="text-4xl mb-4 text-orange-500 italic">
                        You are the winner :
                      </h1>
                      <p className="mb-4">
                        The reward has been sent to your wallet address
                      </p>
                      <Link
                        className="hidden md:block w-full bg-gradient-to-br from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 py-2 text-center rounded-lg"
                        href={paths.client.profile}
                      >
                        Check your repository -&gt;
                      </Link>
                    </div>
                  ) : (
                    <Button
                      className="hidden md:block w-full "
                      variant="destructive"
                      onClick={async () => await handleRefound()}
                    >
                      Not Winner - Click Refund
                    </Button>
                  )
                ) : Number(lotteryInfo?.ddl) < Date.now() ? (
                  <Button
                    className="hidden md:block w-full "
                    variant="destructive"
                  >
                    Already Ended && Not Join
                  </Button>
                ) : (
                  <Button
                    className="hidden md:block w-full bg-gradient-to-br from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400"
                    onClick={async () => await handleDeposit()}
                  >
                    Join
                  </Button>
                )}
              </div>
            ) : (
              <Button className="w-full" variant="destructive">
                Please Connect Wallet
              </Button>
            )}
            {isJoin &&
            !isEnded &&
            Number(lotteryInfo?.ddl) * 1000 < Date.now() &&
            lotteryInfo?.participants.length > 0 ? (
              <Button
                onClick={async () => await handleStartLottery()}
                className="mt-4 hidden md:block w-full bg-gradient-to-br from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400"
              >
                opening
              </Button>
            ) : null}
          </div>
        </div>
      </MaxWidthWrapper>
    </main>
  );
};

export default LotteryInfo;
