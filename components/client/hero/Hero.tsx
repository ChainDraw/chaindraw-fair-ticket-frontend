import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";

import { paths } from "@/utils/paths";
import Link from "next/link";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";

type Props = {};

const Hero = (props: Props) => {
  return (
    <section className="py-10 md:py-20">
      <MaxWidthWrapper>
        <div className="flex flex-col justify-center text-center md:text-start md:grid md:grid-cols-[40%_60%] ">
          <div className="flex-1 flex flex-col text-white px-4 md:pr-10">
            <h1 className="text-3xl leading-tight md:text-4xl lg:text-5xl">
              Discover and Own Exclusive Event Tickets
            </h1>
            <p className="text-sm text-gray-300 mb-3 px-3 md:px-0 md:text-lg lg:mb-6 lg:text-xl">
              Transform your tickets into unique digital assets on the
              blockchain.
            </p>
            <div className="flex gap-3 mt-4 mb-2 justify-center md:flex-col lg:flex-row lg:justify-start">
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
          <div className="hidden flex-2 md:block px-3 py-1.5 text-white ">
            <Image
              src="/images/heroImg.jpg"
              width={200}
              height={200}
              className="w-full h-full rounded-lg"
              alt="NFT Ticket"
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Hero;
