import React from "react";

import Hero from "@/components/client/hero/Hero";

import ExploreEvents from "@/components/client/exploreEvents/ExploreEvents";
import Feature from "@/components/client/Feature/Feature";

type Props = {};

const Home = (props: Props) => {
  return (
    <main className="w-full pb-10 md:pb-20">
      <Hero />
      <ExploreEvents />
      <Feature />
    </main>
  );
};

export default Home;
