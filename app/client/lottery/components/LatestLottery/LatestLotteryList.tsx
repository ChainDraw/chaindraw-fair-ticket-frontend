"use client";
import React from "react";
import LatestLotteryItem, { LotteryItemProps } from "./LatestLotteryItem";

type Props = {};

const LatestLotteryList = (props: Props) => {
  const result: LotteryItemProps[] = [
    {
      concert_id: "123456",
      concert_name: "Example Concert",
      concert_img: "/images/test8.png",
      concert_date: "2024-05-15",
      lottery_start_date: "2024-05-06",
      lottery_end_date: "2024-05-10",
      concert_status: 0,
      ticket_types: [
        {
          ticket_type: "123",
          type_name: "VIP",
          price: "100",
          max_quantity_per_wallet: 2,
        },
        {
          ticket_type: "456",
          type_name: "Regular",
          price: "50",
          max_quantity_per_wallet: 4,
        },
      ],
    },
    {
      concert_id: "123456",
      concert_name: "Example Concert",
      concert_img: "/images/nftticketbg.jpg",
      concert_date: "2024-05-15",
      lottery_start_date: "2024-05-06",
      lottery_end_date: "2024-05-10",
      concert_status: 0, // 0: 未开始 1：已过期 2、已取消
      ticket_types: [
        {
          ticket_type: "123", //门票种类唯一键
          type_name: "VIP",
          price: "100",
          max_quantity_per_wallet: 2,
        },
        {
          ticket_type: "456", //门票种类唯一键
          type_name: "Regular",
          price: "50",
          max_quantity_per_wallet: 4,
        },
      ],
    },
    {
      concert_id: "123456",
      concert_name: "Example Concert",
      concert_img: "/images/heroImg.jpg",
      concert_date: "2024-05-15",
      lottery_start_date: "2024-05-06",
      lottery_end_date: "2024-05-10",
      concert_status: 0, // 0: 未开始 1：已过期 2、已取消
      ticket_types: [
        {
          ticket_type: "123", //门票种类唯一键
          type_name: "VIP",
          price: "100",
          max_quantity_per_wallet: 2,
        },
        {
          ticket_type: "456", //门票种类唯一键
          type_name: "Regular",
          price: "50",
          max_quantity_per_wallet: 4,
        },
      ],
    },
  ];
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 ">
      {result.map((item, index) => {
        return <LatestLotteryItem key={`item.concert_id_${index}`} {...item} />;
      })}
    </section>
  );
};

export default LatestLotteryList;
