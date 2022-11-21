import React from "react";
import styled from "styled-components";
import { EventItem } from "@Components/events";
import { IEventDataProps } from "@Data/dummy-data";

interface IEventListProps {
  items: Array<IEventDataProps>;
}

function EventList({ items }: IEventListProps) {
  return (
    <EventListWrapper>
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
    </EventListWrapper>
  );
}

export default EventList;

const EventListWrapper = styled.ul`
  width: 90%;
  max-width: 40rem;
  margin: 5rem auto;
`;
