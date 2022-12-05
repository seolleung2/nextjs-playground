import React from "react";
import styled from "styled-components";

function CommentList() {
  return (
    <CommentListWrapper className="comments">
      {/* Render list of comments - fetched from API */}
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li>
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li>
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
