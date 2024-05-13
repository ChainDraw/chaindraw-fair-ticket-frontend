import MaxWidthWrapper from "@/components/client/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { paths } from "@/utils/paths";
import Link from "next/link";
import React from "react";

type Props = {};

const LotteryHero = (props: Props) => {
  return (
    <MaxWidthWrapper className="py-10 md:py-20 flex flex-col justify-center  md:grid md:grid-cols-[40%_60%] ">
      <div className="flex flex-col justify-center items-center gap-4 md:justify-center md:items-start">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold ">
          Could you be our <span className="text-red-500">next winner?</span>
        </h1>
        <Link href={paths.admin.events}>
          <Button
            className={buttonVariants({
              variant: "destructive",
              size: "sm",
            })}
          >
            Enter now -&gt;
          </Button>
        </Link>
      </div>

      <div className="hidden md:flex justify-center items-center relative image-container ">
        <div className="absolute w-full h-full bg-white rounded-full "></div>
        <div className="image-flip ">
          <img src="/images/nftLottery.png" alt="lotteryImg" />
          <img src="/images/nftLottery2.png" alt="lotteryImg" />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default LotteryHero;
