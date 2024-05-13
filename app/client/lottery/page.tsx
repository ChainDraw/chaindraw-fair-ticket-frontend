import React from "react";
import LotteryHero from "./_components/LotteryHero/LotteryHero";
import LatestLottery from "./_components/LatestLottery/LatestLottery";
import HowItWork from "./_components/howItWork/HowItWork";

type Props = {};

const page = (props: Props) => {
  return (
    <main className="text-white py-10 md:py-20 bg-black">
      <LotteryHero />
      <HowItWork />
      <LatestLottery />
    </main>
  );
};

export default page;
