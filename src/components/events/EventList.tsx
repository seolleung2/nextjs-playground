import React from "react";
import { EventItem } from "@Components/events";
import { IEventDataProps } from "@Data/dummy-data";

interface IEventListProps {
  items: Array<IEventDataProps>;
}

function EventList({ items }: IEventListProps) {
  return (
    <ul>
      {items.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          location={event.location}
          image={event.image}
          date={event.date}
        />
      ))}
    </ul>
  );
}

export default EventList;
