"use client";

import MaxWidthWrapper from "@/components/client/MaxWidthWrapper";

import { Input } from "@/components/ui/input";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";
import debounce from "lodash.debounce";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

import {
  useLotteryList,
  useNFTListings,
  useSearchLottery,
} from "@/services/api";
import LatestLotteryItem from "../lottery/components/LatestLottery/LatestLotteryItem";
import NFTS, { NFTItem } from "../profile/components/NFTS";

type Props = {};

const AllLottery = (props: Props) => {
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { data, error, isFetching } = useNFTListings(
    "createAtTimestamp",
    "desc"
  );
  console.log(data);
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prePage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <section className="min-h-screen bg-black py-10 md:py-20">
      <MaxWidthWrapper className="py-8">
        <section className=" text-white">
          <h1 className="text-2xl text-orange-500 italic">
            Browse NFT Ticket Marketplace
          </h1>
          <p className="opacity-75 py-4">Buy What You Want!!!</p>
          <Input
            className="w-full"
            placeholder="Search for what you join"
            autoFocus={true}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </section>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isFetching ? (
            <div className="text-white">Fetching...</div>
          ) : (
            data?.map((item: any) => <NFTItem key={item.id} {...item} />)
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
