import Link from "next/link";
import { memo } from "react";
import { Menu, Webhook } from "lucide-react";
import NavItem from "./NavItem";
import { CustomConnectButton } from "./CustomConnectButton";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { ConnectButton } from "@rainbow-me/rainbowkit";
const Header = memo(function Header() {
  const navList = [
    {
      title: "Events",
      link: "/events",
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
    <header className="backdrop-blur-md w-full fixed top-0 inset-x-0 z-50  py-4 px-6 lg:px-18 mb-3 lg:h-auto">
      <MaxWidthWrapper className="mx-auto relative flex-1 px-0">
        <div className="flex justify-between items-center ">
          <Link
            href="/"
            className="text-orange-500 mb-2 flex items-center gap-2 text-2xl lg:text-3xl font-bold italic"
          >
            <Webhook size={40} />
            ChainDraw
          </Link>
          {/* Mobile */}
          <div className="hover:cursor-pointer h-full flex lg:hidden text-orange-500">
            <Menu size={40} />
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
