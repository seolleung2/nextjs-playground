import React from "react";
import Head from "next/head";
import { EventList } from "@Components/events";
import { NewsLetterRegistration } from "@Components/input";
import { getFeaturedEvents } from "@Helpers/api-utils";

export interface IEventDataProps {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

interface HomeProps {
  featuredEvents: IEventDataProps[];
}

export default function Home({ featuredEvents }: HomeProps) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <NewsLetterRegistration />
      <EventList items={featuredEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800, // 30 mins, 30분마다 한번 페이지를 재생성한다.
  };
}
