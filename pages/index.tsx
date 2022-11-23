import React from "react";
import { getFeaturedEvents } from "@Data/dummy-data";
import { EventList } from "@Components/events";

export default function Home() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}
