import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { Button } from "@Components/ui";
import { AddressIcon, ArrowRightIcon, DateIcon } from "@Components/icons";

interface IEventtItemProps {
  key: string;
  id: string;
  title: string;
  location: string;
  image: string;
  date: string;
}

function EventItem(props: IEventtItemProps) {
  const { title, image, date, location, id } = props;

  const readableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = location.replace(", ", "\n");

  const exploreLink = `/events/${id}`;

  return (
    <EventItemWrapper>
      <Image src={"/" + image} alt={title} width={250} height={160} />
      <div className="content">
        <div className="summary">
          <h2>{title}</h2>
          <div className="date">
            <DateIcon />
            <time>{readableDate}</time>
          </div>
          <div className="address">
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className="actions">
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className="icon">
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </EventItemWrapper>
  );
}

export default EventItem;

const EventItemWrapper = styled.li`
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 1px 12px 2px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  img {
    width: 100%;
    object-fit: cover;
    height: 10rem;
  }

  .content {
    width: 100%;
    padding: 0 1rem;
    text-align: center;
  }

  .content h2 {
    margin: 0.5rem 0;
  }

  .date,
  .address {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .date svg,
  .address svg {
    width: 1.25rem;
    height: 1.25rem;
    color: #666666;
  }

  .content time {
    color: #666666;
    font-weight: bold;
  }

  .content address {
    margin: 0.5rem 0;
    color: #666666;
    white-space: pre;
  }

  .actions {
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }

  .actions a {
    display: block;
  }

  .actions a span {
    vertical-align: middle;
  }

  .icon {
    margin-left: 0.5rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .icon svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  @media (min-width: 768px) {
    flex-direction: row;

    img {
      width: 40%;
      height: 14rem;
    }

    .content {
      width: 60%;
      padding: 0;
      text-align: left;
    }

    .content h2 {
      margin: 1rem 0;
    }

    .actions {
      flex-direction: row;
      justify-content: flex-end;
    }
  }
`;
