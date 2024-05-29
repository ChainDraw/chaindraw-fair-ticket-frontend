import Link from "next/link";
import { memo } from "react";
import { Menu, Webhook } from "lucide-react";
import NavItem from "./NavItem";
import { CustomConnectButton } from "./CustomConnectButton";
import MaxWidthWrapper from "../MaxWidthWrapper";

import { cn } from "@/lib/utils";
import { paths } from "@/utils/paths";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
const Header = memo(function Header() {
  const navList = [
    {
      title: "Market",
      link: paths.client.market,
    },
    {
      title: "Lottery",
      link: paths.client.lottery,
    },
    {
      title: "Create",
      link: paths.admin.events,
    },
  ];

  return (
    <header
      className={cn(
        "bg-black w-full sticky md:fixed top-0 inset-x-0 z-50  py-4 px-6 lg:px-18  lg:h-auto duration-300 backdrop-blur-md"
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

          <Drawer direction="right">
            <DrawerTrigger>
              <div className="hover:cursor-pointer h-full flex lg:hidden text-[#f8cf15]">
                <Menu size={40} color="#fff" />
              </div>
            </DrawerTrigger>
            <DrawerPortal>
              <DrawerOverlay className="fixed inset-0 bg-black/40" />
              <DrawerContent className=" bg-black border-none flex flex-col rounded-t-[10px] h-full w-[80%] mt-24 fixed bottom-0 left-0 right-0">
                <div className="px-10 py-10 flex flex-col flex-1 gap-10 ">
                  {navList.map((item, index) => {
                    return <NavItem {...item} key={item.title} />;
                  })}
                  <CustomConnectButton />
                </div>
              </DrawerContent>
            </DrawerPortal>
          </Drawer>
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
