import MaxWidthWrapper from "@/components/client/MaxWidthWrapper";
import Title from "@/components/client/title/Title";
import React from "react";
import LatestLotteryList from "./LatestLotteryList";
import { Rocket } from "lucide-react";
import { paths } from "@/utils/paths";

type Props = {};

const LatestLottery = (props: Props) => {
  return (
    <MaxWidthWrapper className="py-10 md:py-20">
      <Title
        title="LatestLottery"
        description="test"
        button={{
          icon: <Rocket />,
          buttonContent: "View All",
          link: paths.client.allLottery,
        }}
      />
      <LatestLotteryList />
    </MaxWidthWrapper>
  );
};

export default LatestLottery;
