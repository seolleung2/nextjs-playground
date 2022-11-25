import React from "react";
import { useRouter } from "next/router";
import { EventList, ResultsTitle } from "@Components/events";
import { Button, ErrorAlert } from "@Components/ui";

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
    return (
      <>
        <ErrorAlert>
          <p className="">Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: Number(year),
    month: Number(month),
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p className="">No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(Number(year), Number(month) - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}

export default FilteredEventsPage;
