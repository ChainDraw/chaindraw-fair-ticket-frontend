"use client";
import React, { useEffect, useState } from "react";
import MaxWidthWrapper from "@/components/client/MaxWidthWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Copy } from "lucide-react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "@tanstack/react-query";
import EventItem from "@/components/client/eventsItem/EventItem";
import LatestLotteryItem from "../lottery/components/LatestLottery/LatestLotteryItem";
import useAuthStore from "@/stores/authStore";
import { redirect } from "next/navigation";
import { useAccount } from "wagmi";
import { useUserCreateLottery } from "@/services/api";
import Create from "./components/Create";
import NFTS from "./components/NFTS";
import JoinLottery from "./components/JoinLottery";

interface Item {
  id: number;
  title: string;
  // Add other item properties as needed
}

interface ApiResponse {
  items: Item[];
  nextCursor?: number;
  prevCursor?: number;
}
enum Filter {
  Collected = "Collected",
  Create = "Create",
  Lottery = "Lottery",
}
const fetchItems = async ({
  pageParam = 1,
  filter,
}: {
  pageParam?: number;
  filter: string;
}): Promise<ApiResponse> => {
  const { data } = await axios.get<ApiResponse>(
    `/api/items?filter=${filter}&page=${pageParam}`
  );
  return data;
};

const Page: React.FC = () => {
  const [filter, setFilter] = useState<Filter[number]>(Filter.Collected);
  const { address } = useAccount();
  const userAddress = address?.toLocaleLowerCase();

  const handleFilterChange = (newFilter: Filter[number]) => {
    setFilter(newFilter);
  };

  return (
    <main className="min-h-screen bg-white md:py-20">
      <div className="flex justify-center items-end h-44 md:h-64 bg-transparent bg-profile-bgi bg-cover bg-center bg-no-repeat">
        <h1 className="font-selima text-orange-500 py-2 text-3xl md:text-5xl">
          &ldquo; ChainDraw Ticket &rdquo;
        </h1>
      </div>
      <article>
        <MaxWidthWrapper className="text-black -mt-10 md:-mt-12 flex flex-col ">
          <Avatar className="w-20 h-20 md:w-24 md:h-24 border border-black">
            <AvatarImage src="/images/profile.jpg" />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-2 py-4">
            <h1 className="text-2xl font-bold">Name</h1>
            <button className="px-2 flex items-center gap-2 text-black opacity-75">
              <Copy size={18} /> <span>0x....1234821</span>
            </button>
          </div>
          {/* Filter */}
          <div className="flex gap-4">
            {["Collected", "Create", "Lottery"].map((option) => (
              <button
                key={option}
                onClick={() => handleFilterChange(option)}
                className={`px-4 py-2 ${
                  filter === option ? "bg-gray-100 rounded-lg font-bold" : ""
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <hr className="text-gray-600 mt-6 mb-4" />

          <div className="px-12 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center text-white">
            {filter === "Collected" && <NFTS address={userAddress!} />}
            {filter === "Create" && <Create address={userAddress!} />}
            {filter === "Lottery" && <JoinLottery address={userAddress!} />}
          </div>
        </MaxWidthWrapper>
      </article>
    </main>
  );
};

export default Page;
