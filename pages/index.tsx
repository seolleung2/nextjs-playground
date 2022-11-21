import React from "react";
import Link from "next/link";
import { getFeaturedEvents } from "@Data/dummy-data";
import { EventList } from "@Components/events";

export default function Home() {
  const featuredEvents = getFeaturedEvents();
  console.log(featuredEvents);
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}
