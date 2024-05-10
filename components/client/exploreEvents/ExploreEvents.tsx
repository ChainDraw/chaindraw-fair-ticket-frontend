import { Button } from "@/components/ui/button";
import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Title from "../title/Title";

type Props = {};

const ExploreEvents = (props: Props) => {
  return (
    <MaxWidthWrapper className="py-20 min-h-screen">
      <Title
        title="Trending Collection"
        description="Checkout our weekly updated trending collection."
        button={false}
      />
    </MaxWidthWrapper>
  );
};

export default ExploreEvents;
