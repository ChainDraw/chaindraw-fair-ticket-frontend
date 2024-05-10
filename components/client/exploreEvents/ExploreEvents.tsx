import { Button } from "@/components/ui/button";
import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Title from "../title/Title";
import { icons, Rocket } from "lucide-react";
import HomeEventList from "./HomeEventList";

type Props = {};

const ExploreEvents = (props: Props) => {
  return (
    <MaxWidthWrapper className="py-10 lg:py-20">
      <Title
        title="Trending Collection"
        description="Checkout our weekly updated trending collection."
        button={{ icon: <Rocket />, buttonContent: "Collection" }}
      />
      <HomeEventList />
    </MaxWidthWrapper>
  );
};

export default ExploreEvents;
