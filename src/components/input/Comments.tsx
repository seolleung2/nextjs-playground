import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CommentList, NewComment } from "@Components/input";

type commentInfoType = {
  email: string;
  name: string;
  text: string;
};

interface ICommentTypes {
  _id: string;
  eventId: string;
  email: string;
  name: string;
  text: string;
}

interface ICommentsProps {
  eventId: string;
}

function Comments({ eventId }: ICommentsProps) {
  const [showComments, setShowComments] = useState<boolean>(false);
  const [comments, setComments] = useState<Array<ICommentTypes>>([]);

  useEffect(() => {
    if (showComments) {
      fetch(`/api/comments/${eventId}`)
        .then((res) => res.json())
        .then((data) => {
          setComments(data.comment);
        });
    }

    return () => setComments([]);
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData: commentInfoType) {
    // send data to API

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <CommentsWrapper className="comments">
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
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
