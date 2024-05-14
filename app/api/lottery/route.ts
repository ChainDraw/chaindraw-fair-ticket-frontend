// app/api/lottery.ts

import { NextResponse } from "next/server";

// Sample lottery data
const lotteries = [
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

// Handler function for the API route
export async function POST(request: Request) {
  const { search, page = 1 } = await request.json();

  const filteredLotteries = lotteries.filter((lottery) =>
    lottery.concert_name.toLowerCase().includes(search.toLowerCase())
  );
  // const filteredLotteries = lotteries;
  const pageSize = 2;
  const paginatedLotteries = filteredLotteries.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return NextResponse.json({
    data: paginatedLotteries,
    total: filteredLotteries.length,
    page,
    pageSize,
  });
}
