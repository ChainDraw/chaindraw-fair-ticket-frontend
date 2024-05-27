"use client";
import React from "react";
import LatestLotteryItem, { LotteryItemProps } from "./LatestLotteryItem";
import { useExhibitLottery } from "@/services/api";
import { handleError } from "@/utils/errors";

type Props = {};
const LatestLotteryList = (props: Props) => {
  const { data, isLoading, isError, error } = useExhibitLottery(
    "createAtBlockNumber",
    "desc"
  );
  if (error !== null) {
    handleError(error);
  }
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 ">
      {(data as any)?.lotteries?.map(
        (item: LotteryItemProps, index: number) => {
          return (
            <LatestLotteryItem key={`item.concert_id_${index}`} {...item} />
          );
        }
      )}
    </section>
  );
};

export default LatestLotteryList;
