import React from "react";
import Image from "next/image";
import styled from "styled-components";

import { AddressIcon, DateIcon } from "@Components/icons";
import { LogisticsItem } from "@Components/eventDetail";

interface IEventLogisticsProps {
  date: string;
  address: string;
  image: string;
  imageAlt: string;
}

function EventLogistics({
  date,
  address,
  image,
  imageAlt,
}: IEventLogisticsProps) {
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const addressText = address.replace(", ", "\n");

  return (
    <EventLogisticsWrapper className="logistics">
      <div className="image">
        <Image src={`/${image}`} alt={imageAlt} width={400} height={400} />
      </div>
      <ul className="list">
        <LogisticsItem icon={DateIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </EventLogisticsWrapper>
  );
}

export default EventLogistics;

const EventLogisticsWrapper = styled.section`
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  background-color: #2b2b2b;
  padding: 2rem;
  max-width: 50rem;
  width: 80%;
  margin: -3rem auto;
  color: #d5eeeb;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-direction: column;
  align-items: center;

  .image {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    overflow: hidden;
    border: 5px solid white;
  }

  .image img {
    width: 10rem;
    height: 10rem;
    object-fit: cover;
  }

  .list {
    flex: 3;
    display: flex;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  address {
    white-space: pre;
  }

  @media (min-width: 768px) {
    padding: 2rem;
    margin: -5rem auto;
    gap: 3rem;
    flex-direction: row;
    align-items: stretch;

    .image {
      width: 20rem;
      height: 20rem;
    }

    .image img {
      width: 20rem;
      height: 20rem;
    }

    .list {
      align-items: flex-start;
    }
  }
`;
