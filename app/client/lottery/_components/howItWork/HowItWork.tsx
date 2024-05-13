import MaxWidthWrapper from "@/components/client/MaxWidthWrapper";
import { ArrowUp, Medal } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {};

const HowItWork = (props: Props) => {
  return (
    <MaxWidthWrapper className="py-10 md:py-20 border-b border-gray-400">
      <h1 className="text-red-500 text-center font-bold text-3xl md:text-4xl lg:text-5xl ">
        How It Work
      </h1>
      <div className="flex flex-col md:flex-row py-6 md:py-10 text-center items-center gap-10">
        <div className="flex flex-col justify-center ">
          <Image
            src="/images/touchscreen.png"
            alt="Select Event"
            width={50}
            height={50}
            className="mx-auto mb-2"
          />
          <h2 className="font-semibold py-2">Select Event</h2>
          <p className="opacity-75">
            Choose the event you want to participate in from our wide range of
            available NFT ticketed events.
          </p>
        </div>
        <ArrowUp size={32} className="rotate-180 mx-auto md:hidden" />
        <ArrowUp size={80} className="hidden md:block mx-auto md:rotate-90" />
        <div className="flex flex-col justify-center ">
          <Image
            src="/images/pay.png"
            alt="Buy Ticket"
            width={50}
            height={50}
            className="mx-auto mb-2"
          />
          <h2 className="font-semibold py-2">Buy Ticket</h2>
          <p className="opacity-75">
            Purchase your NFT ticket using cryptocurrency directly through our
            secure blockchain platform.
          </p>
        </div>
        <ArrowUp size={32} className="rotate-180 mx-auto md:hidden" />
        <div className="flex flex-col justify-center ">
          <Image
            src="/images/chainlink.png"
            alt="Enter Lottery"
            width={50}
            height={50}
            className="mx-auto mb-2"
          />
          <h2 className="font-semibold py-2">Enter Lottery</h2>
          <p className="opacity-75">
            Your ticket automatically enters you into a lottery draw, powered by
            Chainlink VRF to ensure fairness.
          </p>
        </div>
        <ArrowUp size={80} className="hidden md:block mx-auto md:rotate-90" />
        <div className="flex flex-col justify-center ">
          <Medal color="gold" size={50} className="mx-auto" />
          <h2 className="font-semibold py-2">Win Prizes</h2>
          <p className="opacity-75">
            Winners are picked randomly and announced publicly. Prizes are
            distributed immediately via smart contracts.
          </p>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default HowItWork;
