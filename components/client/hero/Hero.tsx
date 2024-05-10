import React from "react";
// import MaxWidthWrapper from "../MaxWidthWrapper";
// import { Button, buttonVariants } from "../ui/button";
// import { paths } from "@/utils/paths";
import Link from "next/link";
import Image from "next/image";
import { paths } from "@/utils/paths";
import { Button, buttonVariants } from "@/components/ui/button";

type Props = {};

const Hero = (props: Props) => {
  return (
    <section className="flex flex-col items-center text-center md:text-start md:flex-row lg:text-center py-20">
      <div className="flex-1 flex flex-col text-white mt-6 px-4 md:text-start">
        <h1 className="text-3xl leading-tight py-4 md:text-4xl lg:text-5xl">
          Discover and Own Exclusive Event Tickets
        </h1>
        <p className="text-sm text-gray-300 mb-3 px-3 md:px-0 md:text-lg lg:mb-6 lg:text-xl">
          Transform your tickets into unique digital assets on the blockchain.
        </p>
        <div className="flex gap-3 mt-4 mb-2 justify-center  md:justify-start">
          <Link href={paths.client.market}>
            <Button
              className={buttonVariants({
                variant: "destructive",
                size: "sm",
              })}
            >
              Browse Marketplace
            </Button>
          </Link>
          <Link href={paths.client.create}>
            <Button
              className={buttonVariants({
                variant: "default",
                size: "sm",
              })}
            >
              Create Your Ticket -&gt;
            </Button>
          </Link>
        </div>
      </div>
      <div className="hidden flex-1 md:flex justify-center items-center px-3 py-1.5 text-white  ">
        <Image
          src="/images/heroImg.jpg"
          width={200}
          height={200}
          className="w-full h-full rounded-lg max-w-md"
          alt="NFT Ticket"
        />
      </div>
    </section>
  );
};

export default Hero;
