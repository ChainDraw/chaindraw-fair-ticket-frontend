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
    <Link
      href={paths.client.lotteryInfo(props.concert_id)}
      className="flex flex-col bg-white text-black rounded-lg overflow-hidden shadow-sm hover:shadow-white"
    >
      <div className="flex-1">
        <div className="overflow-hidden">
          <Image
            src="/images/test8.png"
            width={400}
            height={400}
            alt="lottery"
            className="w-full h-full  hover:scale-110 duration-300 "
          />
        </div>
      </div>
      <div className=" flex-1 px-2 pt-2">
        <h1 className="font-semibold text-lg ">{props.concert_name}</h1>
        <div className="flex justify-between">
          <span>Price</span>
          <div>
            <span>$</span>
            {props.ticket_types[1].price}
          </div>
        </div>
      </div>
      <div className="flex justify-between px-2 pb-6">
        <span>concertDate</span>
        <div>{props.concert_date}</div>
      </div>
    </Link>
  );
};

export default LatestLotteryItem;
