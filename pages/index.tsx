import React from "react";
import { EventList } from "@Components/events";
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
