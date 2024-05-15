import React from "react";
import LotteryHero from "./components/LotteryHero/LotteryHero";
import HowItWork from "./components/howItWork/HowItWork";
import LatestLottery from "./components/LatestLottery/LatestLottery";

type Props = {};

const page = (props: Props) => {
  return (
    <main className="bg-black py-10 md:py-20">
      <LotteryHero />
      <HowItWork />
      <LatestLottery />
    </main>
  );
};

export default page;
