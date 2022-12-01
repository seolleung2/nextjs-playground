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

export interface IEventDataProps {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}
