import styled from "styled-components";
import { Button } from "@Components/ui";

interface IResultsTitleProps {
  date: Date;
}

function ResultsTitle({ date }: IResultsTitleProps) {
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <TitleWrapper className="title">
      <h1>Events in {humanReadableDate}</h1>
      <Button link="/events">Show all events</Button>
    </TitleWrapper>
  );
}

export default ResultsTitle;

const TitleWrapper = styled.section`
  margin: 2rem auto;
  width: 90%;
  max-width: 40rem;
  text-align: center;
`;
