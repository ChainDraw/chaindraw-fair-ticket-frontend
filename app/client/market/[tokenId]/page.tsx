"use client";
import React from "react";
import Link from "next/link";
import { useAccount, useWriteContract } from "wagmi";
import { abi } from "@/contracts/abis/market";

const NFTDropPage = () => {
  const collection = {
    nftCollectionName: "nftCollectionName",
    price: "1",
    tokenId: "0",
    description: "description",
    title: "title",
    seller: "0x791518786955ca63903fcc22e45bad82c0aff07a",
    lotteryAddress: "0xc1d422d0e382ef2d8b929bc36e1c749aa955a575",
  };

  // Auth
  const { address } = useAccount();
  const contractConfig = {
    address: "0xD2BDf4F1F8f667d91809594cbbdCc7b23a160656",
    abi,
  };
  const {
    writeContract: buyNFT,
    isPending: isPurchaseLoading,
    error: buyError,
  } = useWriteContract();
  const buyBtnClick = () => {
    buyNFT({
      ...contractConfig,
      functionName: "buyNFT",
      args: [collection.lotteryAddress, collection.tokenId],
      value: collection.price
    });
  };

  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      {/* left */}
      <div className="bg-gradient-to-br from-cyan-800 to-rose-500 lg:col-span-4">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="rounded-xl bg-gradient-to-br from-yellow-400 to-purple-600 p-2">
            <img
              className="w-44 round-xl object-cover lg:h-96 lg:w-72"
              src="https://seizon-prod.s3.us-east-1.amazonaws.com/tokens/3282.png"
              alt=""
            />
          </div>
          <div className="space-y-6 p-5 text-center">
            <h1 className="text-4xl font-bold text-white">
              {collection.nftCollectionName}
            </h1>
            <h2 className="text-xl text-gray-300">{collection.description}</h2>
          </div>
        </div>
      </div>
      {/* right */}
      <div className="flex flex-1 flex-col p-12 py-20 lg:col-span-6">
        {/* Header */}
        <header className="flex item-center justify-between">
          <Link href={"/"}>
            <h1 className="w-52 cursor-pointer text-xl font-extralight sm:w-80">
              The{" "}
              <span className="font-extrabold underline decoration-pink-600/50">
                ChainDraw
              </span>{" "}
              NFT Market Place
            </h1>
          </Link>
        </header>
        <hr className="my-2 border" />
        {address && (
          <p>
            You&apos;sre logged in with wallet {address.substring(0, 5)}...
            {address.substring(address.length - 5)}
          </p>
        )}

        {/* content */}
        <div className="mt-10 flex flex-1 flex-col items-center space-y-6 lg:space-y-0 lg:justify-center">
          <img
            className="w-80 object-cover pb-10 lg:h-40"
            src="https://seizon-prod.s3.us-east-1.amazonaws.com/tokens/3282.png"
            alt=""
          />
          <h1 className="text-3xl font-bold lg:text-5xl lg:font-extrabold">
            {collection.title}
          </h1>
          <p className="pt-2 text-xl text-green-500">
            seller: {collection.seller}
          </p>
        </div>
        {/* Mint Button */}
        <button
          className="mt-10 font-bold bg-red-600 rounded-full h-16 w-full text-white"
          onClick={() => buyBtnClick()}
        >
          {isPurchaseLoading ? "Loading..." : "Purchase"} ( {collection.price}{" "}
          ETH )
        </button>
      </div>
    </div>
  );
};

export default NFTDropPage;
