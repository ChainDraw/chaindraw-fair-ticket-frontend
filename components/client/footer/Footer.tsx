"use client";
import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { MailCheck, Twitter, Webhook } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { paths } from "@/utils/paths";
type Props = {};

const Footer = (props: Props) => {
  const path = usePathname();

  if (
    path === paths.client.profile ||
    path.startsWith(paths.client.allLottery)
  ) {
    return null;
  }

  return (
    <footer className="w-full h-auto bg-[#181818] text-white py-5 md:py-10">
      <MaxWidthWrapper>
        <div className=" flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="text-white flex items-center gap-2 text-xl md:text-2xl font-bold italic">
            <Webhook size={32} className="text-[#f8cf15]" />
            ChainDraw
          </div>
          <div className="flex gap-x-2">
            <Link href="#">
              <MailCheck size={32} color="skyblue" />
            </Link>
            <Link href="#">
              <Twitter size={32} color="skyblue" />
            </Link>
          </div>
        </div>
        <hr className="bg-black opacity-45 mt-6" />
      </MaxWidthWrapper>
      <div className="text-center mt-2 opacity-75">
        Copyright © 2024 ChainDraw All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
