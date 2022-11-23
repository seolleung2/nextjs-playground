import React from "react";
import { EventList, EventSearch } from "@Components/events";
import { getAllEvents } from "@Data/dummy-data";

function AllEventsPage() {
  const events = getAllEvents();
  return (
    <>
      <EventSearch />
      <EventList items={events} />
    </>
  );
}

export default AllEventsPage;
