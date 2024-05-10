import { Button } from "@/components/ui/button";
import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Title from "../title/Title";
import { icons, Rocket } from "lucide-react";
import HomeEventList from "./HomeEventList";

type Props = {
  id: string;
  name: string;
  address: string;
  date: string;
  time: string;
  cover: string;
  description: string;
  status: string;
  review_status: string;
  ticket: {
    ticket_name: string;
    ticket_type: string;
    ticket_price: 100;
    ticket_cover: string;
    ticket_max_num: 1000;
    ticket_status: string;
    allowSecondHandTrade: true; // 二手交易开关
  };
};

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
