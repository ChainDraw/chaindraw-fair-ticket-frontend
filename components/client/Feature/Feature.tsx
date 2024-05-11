import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Title from "../title/Title";
import { BadgeDollarSign, CandlestickChart, Cog, Group } from "lucide-react";

type Props = {};

const Feature = (props: Props) => {
  return (
    <MaxWidthWrapper className="pt-32 text-white">
      <header className="text-center">
        <h1 className="font-bold text-4xl text-white mb-9">
          Unlock the Future with NFT Tickets
        </h1>
        <p className="text-xl text-white">
          Revolutionize how you attend, organize, and remember events with our
          Web3-based ticketing platform.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-11">
        <div className="flex items-stretch justify-center">
          <article className="rounded-3xl  bg-[#006400] hover:bg-[#030e20] duration-300 px-6 py-10 border-brand-black border text-center max-w-sm">
            <div className="h-14 w-14 mx-auto">
              <Cog size={60} />
            </div>
            <header className="text-xl font-bold mt-8 text-white">
              Secure and Immutable
            </header>
            <p className="text-[#D0D0D0] text-base mt-4 whitespace-pre-line opacity-70 leading-8">
              With each ticket minted as a Non-Fungible Token (NFT), our
              platform guarantees the authenticity of every ticket sold. This
              technology eliminates the risk of counterfeit tickets, providing
              peace of mind for both event organizers and attendees.
            </p>
          </article>
        </div>

        <div className="flex items-stretch justify-center ">
          <article className="rounded-3xl bg-[#B8860B]  hover:bg-[#030e20] duration-300 px-6 py-10 border-brand-black border text-center max-w-sm">
            <div className="h-14 w-14 mx-auto">
              <BadgeDollarSign size={60} />
            </div>
            <header className="text-[#FFF8DC] text-xl font-bold mt-8">
              Trade and Resell with Ease
            </header>
            <p className="text-base mt-4 whitespace-pre-line opacity-70 leading-8">
              Our platform not only allows you to purchase tickets but also to
              resell them in a secure and transparent marketplace. The use of
              blockchain ensures that ticket transfers are recorded, and smart
              contracts automatically handle the terms and conditions of resale,
              ensuring a safe and fair transaction process for all users.
            </p>
          </article>
        </div>
        <div className="flex items-stretch justify-center">
          <article className=" bg-[#003366]  hover:bg-[#030e20] duration-300 rounded-3xl px-6 py-10 border-brand-black border text-center max-w-sm">
            <div className="h-14 w-14 mx-auto">
              <Group size={60} />
            </div>
            <header className="text-xl font-bold mt-8 text-white">
              Collectible Value
            </header>
            <p className="text-[#C0C0C0] text-base mt-4 whitespace-pre-line opacity-70 leading-8">
              Our NFT tickets are more than just entry passes—they're
              collectible assets. Each ticket is uniquely designed and becomes a
              valuable piece of memorabilia, especially for landmark events.
              Over time, these tickets can appreciate in value, appealing to
              collectors who value the art and history captured in each NFT.
            </p>
          </article>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Feature;
