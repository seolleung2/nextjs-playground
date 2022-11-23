import React from "react";
import { useRouter } from "next/router";
import { EventList } from "@Components/events";
import { getFilteredEvents } from "@Data/dummy-data";

function FilteredEventsPage() {
  const router = useRouter();

  if (!router.query.slug) {
    return <p className="center">Loading...</p>;
  }

  const [year, month] = router.query.slug as string[];

  if (
    isNaN(Number(year)) ||
    isNaN(Number(month)) ||
    Number(year) > 2030 ||
    Number(year) < 2021 ||
    Number(month) < 1 ||
    Number(month) > 12
  ) {
    return <p className="">Invalid filter. Please adjust your values!</p>;
  }

  const filteredEvents = getFilteredEvents({
    year: Number(year),
    month: Number(month),
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p className="">No events found for the chosen filter!</p>;
  }

  return (
    <>
      <EventList items={filteredEvents} />
    </>
  );
}

export default FilteredEventsPage;
