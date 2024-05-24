import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { paths } from "@/utils/paths";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface TicketType {
  ticket_type: string;
  type_name: string;
  price: string;
  max_quantity_per_wallet: number;
}
export type LotteryItemProps = {
  concert_id: string;
  concert_name: string;
  concert_img: string;
  concert_date: string;
  lottery_start_date: string;
  lottery_end_date: string;
  concert_status: number;
  ticket_types: TicketType[];
};

const LatestLotteryItem = (props: LotteryItemProps) => {
  return (
    <div className="flex flex-col bg-gradient-to-br from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white rounded-2xl overflow-hidden ">
      <div className="relative h-64 overflow-hidden group">
        <span className="w-full h-full bg-black bg-opacity-25 absolute top-0 z-10"></span>
        <Image
          src={props.concert_img}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
          alt="lottery"
          className="transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="py-2">
        <h1 className="text-white font-semibold text-lg px-2">
          {props.concert_name}
        </h1>
        <article className="px-4">
          <div className="flex justify-between">
            <span>Price</span>
            <div>
              <span>$</span>
              {props.ticket_types[1].price}
            </div>
          </div>
          <div className="flex justify-between ">
            <span>Start_Date</span>
            <div>{props.concert_date}</div>
          </div>
          <div className="flex justify-between">
            <span>End_Date</span>
            <div>{props.concert_date}</div>
          </div>
        </article>
      </div>

      {/* {props.concert_status === 0 &&<Button variant="destructive">Has Not Started</Button> } */}
      {props.concert_status === 0 && (
        <Link
          href={paths.client.lotteryInfo(props.concert_id)}
          className="text-center py-2 border-t border-white"
        >
          Join
        </Link>
      )}
      {props.concert_status === 1 && (
        <Button variant="destructive">Expired</Button>
      )}
      {props.concert_status === 2 && (
        <Button variant="destructive">Has Not Started</Button>
      )}
    </div>
  );
};

export default LatestLotteryItem;
