import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { EventList, ResultsTitle } from "@Components/events";
import { Button, ErrorAlert } from "@Components/ui";
import { getFilteredEvents, IEventDataProps } from "@Helpers/api-utils";

interface IFilteredEventsProps {
  filteredEvents?: IEventDataProps[];
  date?: any;
  isInvalid?: boolean;
}

function FilteredEventsPage({
  filteredEvents,
  date,
  isInvalid,
}: IFilteredEventsProps) {
  const router = useRouter();

  if (!router.query.slug) {
    return <p className="center">Loading...</p>;
  }

  if (isInvalid) {
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  const [year, month] = params?.slug as Array<string>;

  if (
    isNaN(Number(year)) ||
    isNaN(Number(month)) ||
    Number(year) > 2030 ||
    Number(year) < 2021 ||
    Number(month) < 1 ||
    Number(month) > 12
  ) {
    return {
      props: {
        isInvalid: true,
      },
    };
  }

  const date = new Date(Number(year), Number(month) - 1);

  const filteredEvents = await getFilteredEvents({
    year: Number(year),
    month: Number(month),
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return {
      props: {
        filteredEvents: null,
      },
    };
  }

  return {
    props: {
      date: JSON.parse(JSON.stringify(date)),
      filteredEvents,
    },
  };
};
