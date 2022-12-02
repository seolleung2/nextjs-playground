import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import {
  EventSummary,
  EventLogistics,
  EventContent,
} from "@Components/eventDetail";
import { ErrorAlert } from "@Components/ui";
import {
  getAllEvents,
  getEventById,
  IEventDataProps,
} from "@Helpers/api-utils";

interface IEventDetailProps {
  event: IEventDataProps;
}

function EventDetailPage({ event }: IEventDetailProps) {
  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}

export default EventDetailPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  const event = await getEventById(params?.eventId);

  return {
    props: {
      event,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allEvents = await getAllEvents();

  const pathsWithParams = allEvents.map((event) => ({
    params: {
      eventId: event.id,
    },
  }));

  return {
    paths: pathsWithParams,
    fallback: false,
  };
};
