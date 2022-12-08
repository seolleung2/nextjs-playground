import React from "react";
import styled from "styled-components";
import useSWR from "swr";

interface ICommentListProps {
  eventId: string;
}

const fetcher = (...args: any) => {
  const argsData = [...args] as any;
  return fetch(argsData).then((res) => res.json());
};

function CommentList({ eventId }: ICommentListProps) {
  const { data, error } = useSWR(`/api/comments/${eventId}`, fetcher, {
    refreshInterval: 500,
  });

  if (!data) {
    return <p className="center">Loading...</p>;
  }

  if (data.comment.length === 0) {
    return <p className="center">Oh, There are not comments on this event.</p>;
  }

  return (
    <CommentListWrapper className="comments">
      {/* Render list of comments - fetched from API */}
      {data.comment.map((comment: any) => {
        return (
          <li key={comment.id}>
            <p>{comment.text}</p>
            <div>
              By <address>{comment.name}</address>
            </div>
          </li>
        );
      })}
    </CommentListWrapper>
  );
}

export default CommentList;

const CommentListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  li {
    text-align: left;
    padding: 0.5rem 0;
    border-bottom: 2px solid #ccc;
  }

  p {
    margin: 0;
  }

  li div {
    text-align: right;
    font-style: italic;
  }

  address {
    display: inline;
  }
`;
