import React from "react";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import {
  EventSummary,
  EventLogistics,
  EventContent,
} from "@Components/eventDetail";
import {
  getFeaturedEvents,
  getEventById,
  IEventDataProps,
} from "@Helpers/api-utils";

interface IEventDetailProps {
  event: IEventDataProps;
}

function EventDetailPage({ event }: IEventDetailProps) {
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
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

  const notFound = event ? false : true;

  return {
    props: {
      event,
    },
    revalidate: 30, // 만약 새로운 요청이 들어오고 페이지가 마지막으로 생성된 지 30초가 지나면 다시 생성된다.
    notFound,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getFeaturedEvents();

  const pathsWithParams = events.map((event) => ({
    params: {
      eventId: event.id,
    },
  }));

  return {
    paths: pathsWithParams,
    fallback: true,
  };
};
