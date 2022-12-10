import React from "react";
import styled from "styled-components";

type CommentType = {
  _id: string;
  eventId: string;
  email: string;
  name: string;
  text: string;
};

interface ICommentTypes {
  items: Array<CommentType>;
}

function CommentList({ items }: ICommentTypes) {
  if (!items) {
    return <p className="center">Loading...</p>;
  }

  if (items.length === 0) {
    return <p className="center">Oh, There are not comments on this event.</p>;
  }

  return (
    <CommentListWrapper className="comments">
      {items.map((comment: CommentType) => {
        return (
          <li key={comment._id}>
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
