import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { EventList, ResultsTitle } from "@Components/events";
import { Button, ErrorAlert } from "@Components/ui";
import { IEventDataProps } from "@Helpers/api-utils";

const fetcher = (...args: any) => {
  const argsData = [...args] as any;
  return fetch(argsData).then((res) => res.json());
};

function FilteredEventsPage() {
  const router = useRouter();
  const {
    query: { slug },
  } = router;

  const [loadedEvents, setLoadedEvents] =
    useState<Array<IEventDataProps> | null>(null);

  const { data, error } = useSWR(
    "https://nextjs-course-df954-default-rtdb.firebaseio.com/events.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents || !router.query.slug) {
    return <p className="center">Loading...</p>;
  }

  const [year, month] = slug as string[];

  if (
    isNaN(Number(year)) ||
    isNaN(Number(month)) ||
    Number(year) > 2030 ||
    Number(year) < 2021 ||
    Number(month) < 1 ||
    Number(month) > 12 ||
    error
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

  const date = new Date(Number(year), Number(month));

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === Number(year) &&
      eventDate.getMonth() === Number(month) - 1
    );
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

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}

export default FilteredEventsPage;
