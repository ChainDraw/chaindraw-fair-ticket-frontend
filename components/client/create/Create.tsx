import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Image from "next/image";
import Link from "next/link";
import { paths } from "@/utils/paths";

type Props = {};

const Create = (props: Props) => {
  return (
    <MaxWidthWrapper className="pt-10 md:pt-20 relative">
      <header className="text-center">
        <h1 className="font-bold text-4xl mb-9 bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
          Create Ticket for Your Event
        </h1>
        <p className="text-xl text-white opacity-65 italic">
          Please fill in the following information to create your ticket.
        </p>
      </header>
      <Link
        href={paths.admin.events}
        className="cursor-pointer bg-[#8cbdb6] mt-36  flex-1 hidden md:flex gap-x-4 justify-between items-center relative  rounded-full shadow-inner shadow-[#8cbdb8]"
      >
        <Image
          src="/images/nftCard.png"
          width={400}
          height={300}
          className=" w-full h-full rounded-lg animate-bounce"
          alt="connectImage"
        />
      </Link>
      <div className="w-full flex justify-center mt-5 md:hidden">
        <Link
          href={paths.admin.events}
          className="px-6 py-2 rounded-md bg-gradient-to-br from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white font-bold text-base"
        >
          Create -&gt;
        </Link>
      </div>
    </MaxWidthWrapper>
  );
};

export default Create;
