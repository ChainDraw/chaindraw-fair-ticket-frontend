import React from "react";
import EventItem, { EventItemProps } from "../eventsItem/EventItem";

type Props = {};
const fakeData: EventItemProps[] = [{}];
const HomeEventList = (props: Props) => {
  return (
    <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid gap-8 justify-items-center">
      {fakeData.map((item, index) => {
        return <EventItem {...item} key={index} />;
      })}
    </div>
  );
};

export default HomeEventList;
