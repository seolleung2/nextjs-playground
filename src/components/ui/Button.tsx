import React from "react";
import Link from "next/link";
import styled from "styled-components";

interface IButtonProps {
  link?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

function Button({ link, onClick, children }: IButtonProps) {
  if (link) return <ButtonLink href={link}>{children}</ButtonLink>;

  return <ButtonWrapper onClick={onClick}>{children}</ButtonWrapper>;
}

export default Button;

const ButtonLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  font: inherit;
  background-color: #03be9f;
  border: 1px solid #03be9f;
  border-radius: 6px;
  color: #dafff7;
  padding: 0.5rem 1.5rem;
  text-align: center;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);

  :hover,
  :active {
    background-color: #02afa1;
    border-color: #02afa1;
  }
`;

const ButtonWrapper = styled.button`
  text-decoration: none;
  cursor: pointer;
  font: inherit;
  background-color: #03be9f;
  border: 1px solid #03be9f;
  border-radius: 6px;
  color: #dafff7;
  padding: 0.5rem 1.5rem;
  text-align: center;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);

  :hover,
  :active {
    background-color: #02afa1;
    border-color: #02afa1;
  }
`;
