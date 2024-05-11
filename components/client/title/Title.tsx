import { paths } from "@/utils/paths";
import Link from "next/link";
import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  title: string;
  description: string;
  button?: {
    icon: any;
    buttonContent: string;
  };
};

const Title = (props: Props) => {
  return (
    <header className="mb-8 md:mb-12  md:flex md:flex-row md:justify-between md:items-center my-6">
      <div className="text-start">
        <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl text-red-500 ">
          {props.title}
        </h2>

        {/* <p className="text-white px-2 py-4 text-sm opacity-75 italic">
          {props.description}
        </p> */}
        <p className="text-white px-2 py-4 text-sm opacity-75 italic">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </p>
      </div>
      {/*  */}

      {props.button && (
        <Link
          href={paths.client.market}
          className="hidden px-12 py-2.5 border border-buttonBg rounded-lg bg-orange-500 text-white hover:border-white md:flex justify-center items-center gap-2"
        >
          {props.button?.icon}
          <span>{props.button?.buttonContent}</span>
        </Link>
      )}
    </header>
  );
};

export default Title;
