"use client";
import { memo, useEffect, useState } from "react";
import MaxWidthWrapper from "../MaxWithWrapper";
import { cn } from "@/lib/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = memo(function Header() {
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  useEffect(() => {
    const scrollListener = () => {
      setIsScrolledDown(window.scrollY > 0);
    };
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  return (
    <header
      className={cn(
        "bg-white sticky z-50 top-0 inset-x-0 h-16",
        isScrolledDown ? "border-b border-gray-200" : ""
      )}
    >
      <MaxWidthWrapper className="h-full">
        <div className="h-full flex items-center">
          <ConnectButton />
        </div>
      </MaxWidthWrapper>
    </header>
  );
});
export default Header;
