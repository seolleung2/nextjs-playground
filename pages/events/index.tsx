import React from "react";
import { useRouter } from "next/router";
import { EventList, EventSearch } from "@Components/events";
import { getAllEvents, getFilteredEvents } from "@Data/dummy-data";

function AllEventsPage() {
  const router = useRouter();
  const events = getAllEvents();

  const findEventsHandler = (
    year: string | undefined,
    month: string | undefined
  ) => {
    router.push(`/events/${year}/${month}`);
  };
  return (
    <>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
}

export default AllEventsPage;
