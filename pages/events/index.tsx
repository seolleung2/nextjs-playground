import React from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { EventList, EventSearch } from "@Components/events";
import { getAllEvents, IEventDataProps } from "@Helpers/api-utils";

interface IAllEventsProps {
  events: IEventDataProps[];
}

function AllEventsPage({ events }: IAllEventsProps) {
  const router = useRouter();

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

export const getStaticProps: GetStaticProps = async () => {
  const events = await getAllEvents();

  const notFound = events ? false : true;
  return {
    props: {
      events,
    },
    notFound,
    revalidate: 60,
  };
};
