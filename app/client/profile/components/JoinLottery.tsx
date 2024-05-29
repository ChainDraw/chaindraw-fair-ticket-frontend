import React from "react";
import LatestLotteryItem from "../../lottery/components/LatestLottery/LatestLotteryItem";
import { useUserLottery } from "@/services/api";

type Props = {
  address: string;
};

const JoinLottery = (props: Props) => {
  const { data: items } = useUserLottery(props.address);
  return items?.map((item: any) => (
    <LatestLotteryItem key={item.id} {...item} />
  ));
};

export default JoinLottery;
