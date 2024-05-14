"use client";
import MaxWidthWrapper from "@/components/client/MaxWidthWrapper";

import { Input } from "@/components/ui/input";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";
import debounce from "lodash.debounce";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback, useState } from "react";
import LatestLotteryItem from "../components/LatestLottery/LatestLotteryItem";

type Props = {};

const AllLottery = (props: Props) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchLotteries = async (page: number, search: string) => {
    const { data } = await axios.post("/api/lottery", {
      search,
      page,
    });
    return data;
  };

  const { data, isPlaceholderData, refetch } = useQuery({
    queryKey: ["lottery"],
    queryFn: () => fetchLotteries(currentPage, searchValue),
    placeholderData: keepPreviousData,
  });
  const onSubmit = () => refetch();

  const debouncedSubmit = debounce(onSubmit, 400);
  const _debouncedSubmit = useCallback(debouncedSubmit, []);
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
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
            _debouncedSubmit();
          }}
        />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.map((lottery: any) => (
            <LatestLotteryItem {...lottery} key={lottery.concert_id} />
          )) || <div className="text-white">Loading...</div>}
        </div>
        <div className="mt-8 flex justify-center items-center gap-8 ">
          <button className="text-white w-8 h-8 rounded-full bg-white flex justify-center items-center">
            <ChevronLeft className="h-6 w-6" color="black" />
          </button>
          <div className="text-white">Page</div>
          <button className="text-white w-8 h-8 rounded-full bg-white flex justify-center items-center">
            <ChevronRight className="h-6 w-6" color="black" />
          </button>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default AllLottery;
