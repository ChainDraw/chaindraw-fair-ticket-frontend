import { Button } from "@/components/ui/button";
import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Title from "../title/Title";
import { icons, Rocket } from "lucide-react";
import HomeEventList from "./HomeEventList";

const ExploreEvents = () => {
  return (
    <MaxWidthWrapper className="py-10 lg:py-20">
      <Title
        title="Trending Collection"
        description="Checkout our weekly updated trending collection."
        button={{ icon: <Rocket />, buttonContent: "Collection" }}
      />

      <article className="flex justify-center items-center">
        <HomeEventList />
      </article>
    </MaxWidthWrapper>
  );
};

export default ExploreEvents;
