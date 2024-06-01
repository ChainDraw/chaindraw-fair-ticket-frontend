"use client";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Image from "next/image";
import { useLotteryInfo, useNftInfo } from "@/services/api";
import { formatImage, formatNFTId, formatTokenURI } from "@/utils/common";
import { useMarketBuy } from "@/contracts/hooks/useMarket";
import useAuthStore from "@/stores/authStore";
import { toast } from "@/components/ui/use-toast";
import MaxWidthWrapper from "@/components/client/MaxWidthWrapper";
import { Address } from "viem";
interface Props {
  params: {
    tokenId: string;
  };
}
const NFTDropPage = (props: Props) => {
  const { data: nftData } = useNftInfo(props.params.tokenId);
  console.log(nftData);
  const { handleBuy } = useMarketBuy();
  const { authStatus } = useAuthStore();
  const [metadata, setMetadata] = useState<any>({
    name: "",
    description: "",
    image: "",
    attributes: { concert_name: "", address: "" },
  });
  const { address } = formatNFTId(props.params.tokenId);
  const { data } = useLotteryInfo(address);
  useEffect(() => {
    const fetchTokenURI = async () => {
      if (data && data.url) {
        try {
          const response = await formatTokenURI(data.url);
          setMetadata(response);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchTokenURI();
  }, [data]);
  console.log(metadata);
  return (
    <main className=" relative">
      <MaxWidthWrapper className="flex w-full h-full min-h-screen flex-col md:grid md:grid-cols-[40%_60%]  overflow-hidden px-0 md:px-0">
        {/* left */}
        <div className="w-full h-full pt-10 md:pt-20 bg-gradient-to-br from-cyan-800 to-rose-500">
          <div className="flex flex-col items-center justify-center py-2 h-full">
            <div className="relative rounded-xl bg-gradient-to-br from-yellow-400 to-purple-600 p-2 ">
              <div className="round-xl overflow-hidden w-full h-full">
                <Image
                  className=" w-full h-full object-cover "
                  width={200}
                  height={400}
                  src={metadata.image}
                  alt=""
                />
              </div>
            </div>
            <div className="space-y-6 p-5 text-center">
              <h1 className="text-4xl font-bold text-white">
                {metadata.attributes.concert_name}
              </h1>
              <h2 className="text-xl text-gray-300">{metadata.description}</h2>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="w-full flex flex-col md:items-center pt-10 md:pt-20  px-12 md:px-20 text-orange-500 bg-white">
          {/* Header */}
          <div className=" w-full">
            <header className="flex item-center justify-between md:pt-10">
              <div>
                <h1 className="text-2xl font-bold italic">Ticket Info :</h1>
              </div>
            </header>
            <hr className="my-2 border" />
            <div className="pb-2 md:pb-4">
              <h1 className="pb-1 text-">ConcertName:</h1>
              <p className="px-2 text-black">
                {metadata.attributes.concert_name}
              </p>
            </div>
            <div className="pb-2 md:pb-4">
              <h1 className="pb-1">Description:</h1>
              <p className="px-2 text-black">{metadata.description}</p>
            </div>
            <div className="pb-2 md:pb-4">
              <h1>Seller:</h1>
              <p className="px-2 text-black">{nftData?.seller.id}</p>
            </div>
            <div className="pb-2 md:pb-4">
              <h1>Location:</h1>
              <p className="px-2 text-black">{metadata.attributes.address}</p>
            </div>
            <div className="pb-2 md:pb-4">
              <h1>Price:</h1>
              <p className="px-2 text-black">{data?.price} Wei</p>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center max-w-md">
            <div className=" bg-black flex justify-center items-center p-4  rounded-xl bg-gradient-to-br from-green-400 to-blue-500">
              <Image
                className="w-full h-full border border-black p-2 rounded-xl"
                src={metadata.image}
                width={200}
                height={400}
                alt=""
              />
            </div>
          </div>
          {/* Mint Button */}
          <button
            className="mt-10 font-bold bg-red-600 rounded-full h-16 w-[50%] text-white"
            onClick={async () => {
              if (!data) return;
              if (authStatus !== "authenticated") {
                toast({
                  description: "Please Connect wallet",
                  variant: "destructive",
                });
                return;
              }

              const { address, tokenId } = formatNFTId(props.params.tokenId);
              console.log(address, tokenId);
              await handleBuy(address as Address, tokenId, data.price);
            }}
          >
            <div>Buy and pay {data?.price} Wei </div>
          </button>
        </div>
      </MaxWidthWrapper>
    </main>
  );
};

export default NFTDropPage;
