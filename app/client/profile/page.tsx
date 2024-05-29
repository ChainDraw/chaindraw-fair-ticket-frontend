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
  const { authStatus } = useAuthStore();
  if (authStatus !== "authenticated") {
    redirect("/client");
  }

  const [filter, setFilter] = useState<Filter[number]>(Filter.Collected);
  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    ...result
  } = useInfiniteQuery({
    queryKey: ["items", filter],
    queryFn: ({ pageParam }) => fetchItems({ pageParam, filter }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => lastPage.nextCursor ?? undefined,
    getPreviousPageParam: (firstPage, allPages) =>
      firstPage.prevCursor ?? undefined,
  });

  const handleFilterChange = (newFilter: Filter[number]) => {
    setFilter(newFilter);
  };

  const renderItems = (items: any) => {
    switch (filter) {
      case "Create":
        return items.map((item: any) => (
          <LatestLotteryItem key={item.id} {...item} />
        ));
      case "Lottery":
        return items.map((item: any) => (
          <LatestLotteryItem key={item.id} {...item} />
        ));
      case "Collected":
      default:
        return items.map((item: any) => <EventItem key={item.id} {...item} />);
    }
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
          {/* Content */}
          <InfiniteScroll
            dataLength={data?.pages.flatMap((page) => page.items).length || 0}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<h4>Loading...</h4>}
            endMessage={<p>No more items</p>}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center text-white">
              {data?.pages
                .flatMap((page) => page.items)
                .map((event) => renderItems([event]))}
            </div>
          </InfiniteScroll>
        </MaxWidthWrapper>
      </article>
    </main>
  );
};

export default Page;
