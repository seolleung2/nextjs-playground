import React from "react";
import styled from "styled-components";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  function registrationHandler(event: any) {
    event.preventDefault();

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <NewsLetterRegisWrapper className="newsletter">
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className="control">
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </NewsLetterRegisWrapper>
  );
}

export default NewsletterRegistration;

const NewsLetterRegisWrapper = styled.section`
  margin: 3rem auto;
  width: 90%;
  max-width: 20rem;

  h2 {
    text-align: center;
  }

  .control input {
    font: inherit;
    padding: 0.25rem;
    border-radius: 4px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border: 1px solid #ccc;
  }

  button {
    background-color: #03be9f;
    border: 1px solid #03be9f;
    border-radius: 6px;
    color: #dafff7;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    font: inherit;
    cursor: pointer;
  }

  button:hover,
  button:active {
    background-color: #02afa1;
    border-color: #02afa1;
  }

  .control {
    display: flex;
  }

  .control input {
    flex: 1;
  }
`;
