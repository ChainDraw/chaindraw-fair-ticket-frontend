"use client";
// function fetchNFTList() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve([
//         {
//           previewImage: {
//             asset: [
//               {
//                 _ref: "image-ee298e2fb78803f3226dcde22f1f2a8d69f56fad-600x600-png",
//                 _type: "reference",
//               },
//             ],
//           },
//           _id: "fbe3cc63-b47b-4a0c-8622-06f3c2d668fb",
//           title: "The Ape | NFT Drop",
//           nftCollectionName: "Apes",
//           slug: { current: "ape" },
//           creator: {
//             _id: "366eb843-855f-419d-9b62-5ad8b9265567",
//             name: "Cris",
//             address: "0x37A2E873Ff37BAec54D75D68446FF5EB195D6859",
//             slug: [{ current: "cris" }],
//           },
//           ContractAddress: "0xdf2f3aD8d81915192E3646CC3F28F6347aCCEbF0",
//           description: "description",
//           mainImage: {
//             asset: [
//               {
//                 _ref: "image-a8b470ce656d91c45b9cd8a86e0b39ccb7dcee61-2951x2430-webp",
//                 _type: "reference",
//               },
//             ],
//           },
//         },
//       ]);
//     }, 1000);
//   });
// }

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
