import React, { useState } from "react";
import styled from "styled-components";
import { CommentList, NewComment } from "@Components/input";

function Comments(props: any) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState<boolean>(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData: any) {
    // send data to API
  }

  return (
    <CommentsWrapper className="comments">
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList />}
    </CommentsWrapper>
  );
}

export default Comments;

const CommentsWrapper = styled.section`
  margin: 3rem auto;
  width: 90%;
  max-width: 40rem;
  text-align: center;

  button {
    font: inherit;
    border-radius: 6px;
    padding: 0.5rem 1rem;
    background-color: transparent;
    color: #03be9f;
    border: 1px solid #03be9f;
    cursor: pointer;
  }

  button:hover,
  button:active {
    background-color: #dcfff9;
  }
`;
