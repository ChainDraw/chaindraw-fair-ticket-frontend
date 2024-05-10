import React from "react";

import Hero from "@/components/client/hero/Hero";
import MaxWidthWrapper from "@/components/client/MaxWidthWrapper";

type Props = {};

const Home = (props: Props) => {
  return (
    <main className="bg-main-bgi bg-center bg-no-repeat min-h-screen">
      <MaxWidthWrapper>
        <Hero />
      </MaxWidthWrapper>
    </main>
  );
};

export default Home;
