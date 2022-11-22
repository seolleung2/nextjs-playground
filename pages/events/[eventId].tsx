import React from "react";
import { useRouter } from "next/router";
import {
  EventSummary,
  EventLogistics,
  EventContent,
} from "@Components/eventDetail";
import { getEventById } from "@Data/dummy-data";

function EventDetailPage() {
  const router = useRouter();

  const {
    query: { eventId },
  } = router;

  const event = getEventById(eventId);

  if (!event) {
    return <p>No event found!</p>;
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
