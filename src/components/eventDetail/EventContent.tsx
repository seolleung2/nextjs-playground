import React from "react";
import styled from "styled-components";

interface IEventContentProps {
  children: React.ReactNode;
}

function EventContent({ children }: IEventContentProps) {
  return (
    <EventContentWrapper className="content">{children}</EventContentWrapper>
  );
}

export default EventContent;

const EventContentWrapper = styled.section`
  font-size: 1.5rem;
  color: #3a3a3a;
  width: 90%;
  max-width: 40em;
  margin: auto;
  margin-top: 8rem;
  text-align: center;
`;
