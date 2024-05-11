import Link from "next/link";
import { memo } from "react";
import { Menu, Webhook } from "lucide-react";
import NavItem from "./NavItem";
import { CustomConnectButton } from "./CustomConnectButton";
import MaxWidthWrapper from "../MaxWidthWrapper";

import { cn } from "@/lib/utils";
import { paths } from "@/utils/paths";
const Header = memo(function Header() {
  const navList = [
    {
      title: "Events",
      link: paths.client.market,
    },
    {
      title: "Collectables",
      link: "/collectable",
    },
    {
      title: "Sellers",
      link: "/sellers",
    },
    {
      title: "Blog",
      link: "/blog",
    },
    {
      title: "Contact",
      link: "/contact",
    },
  ];
  return (
    <header
      className={cn(
        "bg-black bg-opacity-10 w-full sticky md:fixed top-0 inset-x-0 z-50  py-4 px-6 lg:px-18 mb-3 lg:h-auto duration-300 backdrop-blur-md"
      )}
    >
      <MaxWidthWrapper className="flex-1 relative px-0 md:px-0 lg:px-0">
        <div className="flex justify-between items-center ">
          <Link
            href="/"
            className="text-white mb-2 flex items-center gap-2 text-2xl lg:text-3xl font-bold italic"
          >
            <Webhook size={40} className="text-[#f8cf15]" />
            ChainDraw
          </Link>
          {/* Mobile */}
          <div className="hover:cursor-pointer h-full flex lg:hidden text-[#f8cf15]">
            <Menu size={40} color="#fff" />
          </div>
        </div>
        <div className="hidden lg:flex flex-col justify-end right-0 lg:mt-0 lg:absolute lg:top-0 lg:h-full lg:items-center">
          <div className="flex flex-col flex-1 gap-10 lg:flex lg:flex-row lg:items-center">
            {navList.map((item, index) => {
              return <NavItem {...item} key={item.title} />;
            })}
            <CustomConnectButton />
          </div>
          {/* TODO:Mobile */}
          <div></div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
});
export default Header;
