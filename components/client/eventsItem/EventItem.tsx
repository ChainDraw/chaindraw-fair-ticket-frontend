import React from "react";
import { EventItemProps } from "../exploreEvents/HomeEventList";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { paths } from "@/utils/paths";
const EventItem = (props: EventItemProps) => {
  return (
    <Link
      href={paths.client.ticketInfo(props.id)}
      className="text-white w-full  overflow-hidden rounded-3xl"
    >
      <div className="bg-blue-400 w-auto pb-5 flex flex-col h-auto">
        <div className="cursor-pointer ">
          <div className="overflow-hidden relative max-h-[224px] group">
            <span className="absolute bg-gradient-to-t from-black top-0 left-0 w-full h-full z-10 opacity-70 "></span>
            <Image
              src={props.cover}
              width={200}
              height={200}
              className="w-full object-cover group-hover:scale-110 duration-300"
              alt="Ticket info Image"
            />
            <div className="absolute z-20 bottom-4 w-full flex flex-row items-center px-3">
              <div className="text-white flex-1">
                <div className="flex items-center text-left gap-2">
                  <Avatar>
                    <AvatarImage src={props.cover} />
                    <AvatarFallback>ENS</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col justify-center">
                    <span className="font-medium text-sm avatar_sellerName__6pqLK">
                      Everything in Sport
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-auto">
                <span className="flex items-center gap-2">
                  <span className="text-white">Tickets:</span>
                  <span className="text-xl text-red-500 flex font-bold">
                    50+
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-5 h-1/2 text-white flex flex-col justify-between grow">
          <div>
            <h3 className="text-xl mb-2 font-bold truncate max-w-[300px] cursor-pointer">
              {props.address}
            </h3>
            <div className="flex flex-row flex-wrap justify-between text-lg">
              <span className="flex flex-row items-center space-x-3 mr-5">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.582 2.74994H18.2487C18.4918 2.74994 18.725 2.84652 18.8969 3.01843C19.0688 3.19034 19.1654 3.4235 19.1654 3.66661V18.3333C19.1654 18.5764 19.0688 18.8095 18.8969 18.9815C18.725 19.1534 18.4918 19.2499 18.2487 19.2499H1.7487C1.50558 19.2499 1.27242 19.1534 1.10052 18.9815C0.928608 18.8095 0.832031 18.5764 0.832031 18.3333V3.66661C0.832031 3.4235 0.928608 3.19034 1.10052 3.01843C1.27242 2.84652 1.50558 2.74994 1.7487 2.74994H5.41536V0.916611H7.2487V2.74994H12.7487V0.916611H14.582V2.74994ZM12.7487 4.58328H7.2487V6.41661H5.41536V4.58328H2.66536V8.24994H17.332V4.58328H14.582V6.41661H12.7487V4.58328ZM17.332 10.0833H2.66536V17.4166H17.332V10.0833ZM4.4987 12.8333H6.33203V14.6666H4.4987V12.8333ZM8.16536 12.8333H15.4987V14.6666H8.16536V12.8333Z"
                    fill="white"
                  ></path>
                </svg>
                <span className="text-white">
                  {props.date}~{props.endDate}
                </span>
              </span>
              <span className="flex flex-row items-center space-x-2 text-white">
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.998 20.0001C5.47505 20.0001 0.998047 15.5231 0.998047 10.0001C0.998047 4.47706 5.47505 6.10352e-05 10.998 6.10352e-05C16.521 6.10352e-05 20.998 4.47706 20.998 10.0001C20.998 15.5231 16.521 20.0001 10.998 20.0001ZM10.998 18.0001C13.1198 18.0001 15.1546 17.1572 16.6549 15.6569C18.1552 14.1566 18.998 12.1218 18.998 10.0001C18.998 7.87833 18.1552 5.8435 16.6549 4.34321C15.1546 2.84292 13.1198 2.00006 10.998 2.00006C8.87632 2.00006 6.84148 2.84292 5.34119 4.34321C3.8409 5.8435 2.99805 7.87833 2.99805 10.0001C2.99805 12.1218 3.8409 14.1566 5.34119 15.6569C6.84148 17.1572 8.87632 18.0001 10.998 18.0001ZM11.998 10.0001H15.998V12.0001H9.99805V5.00006H11.998V10.0001Z"
                    fill="white"
                  ></path>
                </svg>
                <span>{props.time}</span>
              </span>
            </div>
            <div className="mb-5"></div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <span className="flex space-x-3">
              <p className="truncate max-w-[180px]">London</p>
            </span>
            <span className="flex flex-row items-center space-x-2">
              <p className="text-lg">
                <span className="text-blue mr-1">£</span>358.80
              </p>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventItem;
