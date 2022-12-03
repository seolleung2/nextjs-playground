export async function getAllEvents() {
  const response = await fetch(
    "https://nextjs-course-df954-default-rtdb.firebaseio.com/events.json"
  );

  const data = await response.json();

  const dataSet: Array<IEventDataProps> = [];

  for (const key in data) {
    dataSet.push({
      id: key,
      ...data[key],
    });
  }

  return dataSet;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event: IEventDataProps) => event.isFeatured);
}

export async function getEventById(id: string | string[] | undefined) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter: DateFilterType) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  const filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export interface IEventDataProps {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

type DateFilterType = {
  year: number;
  month: number;
};
