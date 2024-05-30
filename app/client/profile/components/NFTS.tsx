import { useUserNfts } from "@/services/api";
import { NFT } from "@/types";
import { formatAddress, formatImage } from "@/utils/common";
import { paths } from "@/utils/paths";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Address } from "viem";
type Props = {
  address: string;
};
export const NFTItem = (props: NFT) => {
  const image = formatImage(props.nftMetadata);
  return (
    <Link
      href={paths.client.ticketInfo(props.id)}
      className="flex flex-col bg-gradient-to-br from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white rounded-2xl overflow-hidden "
    >
      <div className="relative h-64 overflow-hidden group">
        <span className="w-full h-full bg-black bg-opacity-25 absolute top-0 z-10"></span>
        <Image
          src={image}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
          alt="lottery"
          className="transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="py-2">
        {/* <h1 className="text-white font-semibold text-lg px-2">{props.name}</h1> */}
        <h1 className="text-white font-semibold text-lg px-2">
          {props.nftMetadata.concertName}
        </h1>
        <article className="px-4">
          <div className="flex justify-between">
            <span>Price</span>
            <div>
              {props.price}
              <span> Wei</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span>Location</span>
            <div>{props.nftMetadata.address}</div>
          </div>
        </article>
      </div>
    </Link>
  );
};

const NFTS = ({ address }: { address: string }) => {
  const { data: items } = useUserNfts(address);
  return items?.map((item: any) => <NFTItem key={item.id} {...item} />);
};

export default NFTS;
