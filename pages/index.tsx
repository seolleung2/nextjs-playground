import React from "react";
import { EventList } from "@Components/events";

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
  return fetch(
    "https://nextjs-course-df954-default-rtdb.firebaseio.com/events.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const dataSet = [];

      for (const key in data) {
        dataSet.push({
          ...data[key],
          id: key,
        });
      }

      return {
        props: {
          featuredEvents: dataSet.filter((data) => data.isFeatured),
        },
      };
    });
}
