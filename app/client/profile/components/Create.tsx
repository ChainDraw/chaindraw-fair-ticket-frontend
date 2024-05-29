import React from "react";
import LatestLotteryItem from "../../lottery/components/LatestLottery/LatestLotteryItem";
import { useUserCreateLottery } from "@/services/api";

type Props = {
  address: string;
};

const Create = (props: Props) => {
  const { data: items } = useUserCreateLottery(props.address);
  return items?.map((item: any) => (
    <LatestLotteryItem key={item.id} {...item} />
  ));
};

export default Create;
