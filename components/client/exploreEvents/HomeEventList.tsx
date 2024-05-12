import React from "react";
import EventItem from "../eventsItem/EventItem";
const events = [
  {
    id: "asdasdasd123123",
    name: "演唱会01",
    address: "上海市新天地",
    date: "2023-01-01",
    endDate: "2023-01-03",
    time: "12:00",
    cover: "https://picsum.photos/200/300",
    description: "上海市新天地有一场演唱会。",
    status: "已结束",
    review_status: "已审核",
    ticket: {
      ticket_name: "演唱会01门票",
      ticket_type: "普通票",
      ticket_price: 100,
      ticket_cover: "https://picsum.photos/200/300",
      ticket_max_num: 1000,
      ticket_status: "已售罄",
      allowSecondHandTrade: true, // 二手交易开关
    },
  },
  {
    id: "asdasdasd123123",
    name: "演唱会01",
    address: "上海市新天地",
    date: "2023-01-01",
    endDate: "2023-01-03",
    time: "12:00",
    cover: "https://picsum.photos/200/300",
    description: "上海市新天地有一场演唱会。",
    status: "已结束",
    review_status: "已审核",
    ticket: {
      ticket_name: "演唱会01门票",
      ticket_type: "普通票",
      ticket_price: 100,
      ticket_cover: "https://picsum.photos/200/300",
      ticket_max_num: 1000,
      ticket_status: "已售罄",
      allowSecondHandTrade: true, // 二手交易开关
    },
  },
  {
    id: "asdasdasd123123",
    name: "演唱会01",
    address: "上海市新天地",
    date: "2023-01-01",
    endDate: "2023-01-03",
    time: "12:00",
    cover: "https://picsum.photos/200/300",
    description: "上海市新天地有一场演唱会。",
    status: "已结束",
    review_status: "已审核",
    ticket: {
      ticket_name: "演唱会01门票",
      ticket_type: "普通票",
      ticket_price: 100,
      ticket_cover: "https://picsum.photos/200/300",
      ticket_max_num: 1000,
      ticket_status: "已售罄",
      allowSecondHandTrade: true, // 二手交易开关
    },
  },
  {
    id: "asdasdasd123123",
    name: "演唱会01",
    address: "上海市新天地",
    date: "2023-01-01",
    endDate: "2023-01-03",
    time: "12:00",
    cover: "https://picsum.photos/200/300",
    description: "上海市新天地有一场演唱会。",
    status: "已结束",
    review_status: "已审核",
    ticket: {
      ticket_name: "演唱会01门票",
      ticket_type: "普通票",
      ticket_price: 100,
      ticket_cover: "https://picsum.photos/200/300",
      ticket_max_num: 1000,
      ticket_status: "已售罄",
      allowSecondHandTrade: true, // 二手交易开关
    },
  },
  {
    id: "asdasdasd123123",
    name: "演唱会01",
    address: "上海市新天地",
    date: "2023-01-01",
    endDate: "2023-01-03",
    time: "12:00",
    cover: "https://picsum.photos/200/300",
    description: "上海市新天地有一场演唱会。",
    status: "已结束",
    review_status: "已审核",
    ticket: {
      ticket_name: "演唱会01门票",
      ticket_type: "普通票",
      ticket_price: 100,
      ticket_cover: "https://picsum.photos/200/300",
      ticket_max_num: 1000,
      ticket_status: "已售罄",
      allowSecondHandTrade: true, // 二手交易开关
    },
  },
  {
    id: "asdasdasd123123",
    name: "演唱会01",
    address: "上海市新天地",
    date: "2023-01-01",
    endDate: "2023-01-03",
    time: "12:00",
    cover: "https://picsum.photos/200/300",
    description: "上海市新天地有一场演唱会。",
    status: "已结束",
    review_status: "已审核",
    ticket: {
      ticket_name: "演唱会01门票",
      ticket_type: "普通票",
      ticket_price: 100,
      ticket_cover: "https://picsum.photos/200/300",
      ticket_max_num: 1000,
      ticket_status: "已售罄",
      allowSecondHandTrade: true, // 二手交易开关
    },
  },
];
export interface EventItemProps {
  id: string;
  name: string;
  address: string;
  date: string;
  endDate: string;
  time: string;
  cover: string;
  description: string;
  status: string;
  review_status: string;
  ticket: {
    ticket_name: string;
    ticket_type: string;
    ticket_price: number;
    ticket_cover: string;
    ticket_max_num: number;
    ticket_status: string;
    allowSecondHandTrade: boolean; // 二手交易开关
  };
}
type Props = {};
const HomeEventList = (props: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center text-white">
      {events.map((item, index) => {
        return <EventItem {...item} key={index} />;
      })}
    </div>
  );
};

export default HomeEventList;
