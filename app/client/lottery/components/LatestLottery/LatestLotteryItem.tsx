import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  formatAddress,
  formatImage,
  formatNFTId,
  formatTokenURI,
} from "@/utils/common";
import { paths } from "@/utils/paths";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Address } from "viem";

interface TicketType {
  ticket_type: string;
  type_name: string;
  price: string;
  max_quantity_per_wallet: number;
}
export interface LotteryItemProps {
  id: Address;
  concertId: string;
  ddl: string;
  price: string;
  remainingTicketCount: string;
  ticketCount: string;
  ticketType: string;
  url: string;
  organizer: {
    id: Address;
  };
  participants: any;
  name: string;
  nftMetadata: {
    address: string;
    concertName: string;
    description: string;
    image: string;
    name: string;
  };
}

const LatestLotteryItem = (props: LotteryItemProps) => {
  const [metadata, setMetadata] = useState<any>({
    name: "",
    description: "",
    image: "",
    attributes: { concert_name: "", address: "" },
  });

  useEffect(() => {
    const fetchTokenURI = async () => {
      try {
        const response = await formatTokenURI(props.url);
        setMetadata(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTokenURI();
  }, []);

  return (
    <div className="flex flex-col bg-gradient-to-br from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white rounded-2xl overflow-hidden ">
      <div className="relative h-64 overflow-hidden group">
        <span className="w-full h-full bg-black bg-opacity-25 absolute top-0 z-10"></span>
        <Image
          src={metadata?.image}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
          alt="lottery"
          className="transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="py-2">
        <h1 className="text-white font-semibold text-lg px-2">{props.name}</h1>
        <article className="px-4">
          <div className="flex justify-between">
            <span>Type</span>
            <div>{metadata.name}</div>
          </div>
          <div className="flex justify-between">
            <span>Price</span>
            <div>
              {props.price}
              <span> Wei</span>
            </div>
          </div>

          <div className="flex justify-between">
            <span>End_Date</span>
            <div>
              {new Date(Number(props.ddl) * 1000).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
          <div className="flex justify-between">
            <span>Location</span>
            <div>{metadata.address}</div>
          </div>
          <div className="flex justify-between">
            <span>organizer</span>
            <div>{formatAddress(props.organizer.id)}</div>
          </div>
        </article>
      </div>

      {/* {props.concert_status === 0 &&<Button variant="destructive">Has Not Started</Button> } */}
      {Date.now() > Number(props.ddl) * 1000 ? (
        <Link
          href={paths.client.lotteryInfo(props.id)}
          className="text-center py-2 border-t border-white"
        >
          Ended
        </Link>
      ) : (
        <Link
          href={paths.client.lotteryInfo(props.id)}
          className="text-center py-2 border-t border-white"
        >
          Join
        </Link>
      )}
    </div>
  );
};

export default LatestLotteryItem;
