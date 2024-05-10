import { paths } from "@/utils/paths";
import { Rocket } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  title: string;
  description: string;
  button: boolean;
  buttonText?: string;
};

const Title = ({ children, title, description }: Props) => {
  return (
    <header className="md:flex md:flex-row  md:justify-between lg:items-center mb-7 px-5 lg:mb-12">
      <div className="text-start">
        <h2 className="text-3xl font-bold lg:text-left text-white italic">
          {title}
        </h2>
        {/* <p>{description}</p> */}
        <p className="text-white">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </p>
      </div>
      <Link
        href={paths.client.market}
        className="px-12 py-2 border border-buttonBg  rounded-lg bg-buttonBg text-white hover:border-white flex justify-center items-center gap-2"
      >
        <Rocket /> <span>Text</span>
      </Link>
    </header>
  );
};

export default Title;
