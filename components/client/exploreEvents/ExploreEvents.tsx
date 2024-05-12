import { Button } from "@/components/ui/button";
import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Title from "../title/Title";
import { icons, Rocket } from "lucide-react";
import HomeEventList from "./HomeEventList";
import { paths } from "@/utils/paths";

const ExploreEvents = () => {
  return (
    <MaxWidthWrapper className="py-10 md:pt-24 lg:py-32 border-b border-gray-500">
      <Title
        title="Trending Collection"
        description="Checkout our weekly updated trending collection."
        button={{
          icon: <Rocket />,
          buttonContent: "Buy",
          link: paths.client.market,
        }}
      />

      <article className="flex justify-center items-center">
        <HomeEventList />
      </article>
    </MaxWidthWrapper>
  );
};

export default ExploreEvents;
