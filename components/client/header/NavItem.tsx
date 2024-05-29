"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  link: string;
  title: string;
}
const NavItem = (props: Props) => {
  const pathName = usePathname();
  return (
    <Link
      href={props.link}
      className={cn(
        "font-medium text-m block select-none cursor-pointer hover:text-orange-500",
        pathName === props.link ? "text-orange-500" : "text-white"
      )}
    >
      {props.title}
    </Link>
  );
};

export default NavItem;
