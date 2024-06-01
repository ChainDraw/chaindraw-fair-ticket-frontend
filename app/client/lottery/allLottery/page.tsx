"use client";
import MaxWidthWrapper from "@/components/client/MaxWidthWrapper";

import { Input } from "@/components/ui/input";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";
import debounce from "lodash.debounce";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import LatestLotteryItem from "../components/LatestLottery/LatestLotteryItem";
import { useLotteryList, useSearchLottery } from "@/services/api";

type Props = {};

const AllLottery = (props: Props) => {
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const searchHook = useSearchLottery(
    "createAtTimestamp",
    "desc",
    currentPage * 10,
    searchValue
  );
  const listHook = useLotteryList(
    "createAtTimestamp",
    "desc",
    currentPage * 10
  );

  const { data, error, isFetching } = searchValue ? searchHook : listHook;

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prePage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <section className="min-h-screen bg-black py-10 md:py-20">
      <MaxWidthWrapper className="py-8">
        <Input
          className="w-full"
          placeholder="Search for what you join"
          autoFocus={true}
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isFetching ? (
            <div className="text-white">Fetching...</div>
          ) : (
            data?.map((lottery: any) => (
              <LatestLotteryItem {...lottery} key={lottery.concert_id} />
            ))
          )}
        </div>
        <div className="mt-8 flex justify-center items-center gap-8 ">
          <button
            onClick={() => prePage()}
            className="text-white w-8 h-8 rounded-full bg-white flex justify-center items-center"
          >
            <ChevronLeft className="h-6 w-6" color="black" />
          </button>
          <div className="text-white">Page</div>
          <button
            onClick={() => nextPage()}
            className="text-white w-8 h-8 rounded-full bg-white flex justify-center items-center"
          >
            <ChevronRight className="h-6 w-6" color="black" />
          </button>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default AllLottery;
