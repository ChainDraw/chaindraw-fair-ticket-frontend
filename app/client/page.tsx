import React from "react";

import Hero from "@/components/client/hero/Hero";
import MaxWidthWrapper from "@/components/client/MaxWidthWrapper";
import ExploreEvents from "@/components/client/exploreEvents/ExploreEvents";

type Props = {};

const Home = (props: Props) => {
  return (
    <main className="bg-main-bgi bg-top bg-no-repeat min-h-screen">
      <Hero />
      {/* <ExploreEvents /> */}
    </main>
  );
};

export default Home;
