import React from "react";
import Link from "next/link";
import { getFeaturedEvents } from "../dummy-data";

export default function Home() {
  const featuredEvents = getFeaturedEvents();
  console.log(featuredEvents);
  return (
    <div>
      <h1>The Home Page</h1>
    </div>
  );
}
