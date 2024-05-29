"use client";
import React, { useEffect } from "react";

import Hero from "@/components/client/hero/Hero";

import ExploreEvents from "@/components/client/exploreEvents/ExploreEvents";
import Feature from "@/components/client/Feature/Feature";
import MaxWidthWrapper from "@/components/client/MaxWidthWrapper";
import Image from "next/image";
import Create from "@/components/client/create/Create";

type Props = {};
const Home = (props: Props) => {
  return (
    <main className="bg-[#040001] w-full pb-10 relative md:pb-20">
      <Hero />
      <MaxWidthWrapper className="pt-14 md:pt-32">
        <div className="hidden  md:flex md:text-center justify-center ">
          <h1 className="py-1 text-3xl font-bold md:text-4xl lg:text-5xl text-white">
            Revolutionise your ticketing with NFTs
          </h1>
        </div>
      </MaxWidthWrapper>
      <div className="max-md:hidden absolute top-[100vh] left-[50%] -translate-x-1/2 -translate-y-full pb-4 ">
        <Image
          src="/images/xiajiantou.png"
          width={52}
          height={52}
          alt="下箭头"
          className="animate-bounce"
        />
      </div>
      <Feature />
      <ExploreEvents />
      <Create />
    </main>
  );
};

export default Home;
