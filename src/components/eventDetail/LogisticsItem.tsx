import React from "react";
import styled from "styled-components";

interface ILogisticsItemProps {
  icon: () => JSX.Element;
  children: React.ReactNode;
}

function LogisticsItem({ icon: Icon, children }: ILogisticsItemProps) {
  return (
    <LogisticsItemWrapper className="item">
      <span className="icon">
        <Icon />
      </span>
      <span className="content">{children}</span>
    </LogisticsItemWrapper>
  );
}

export default LogisticsItem;

const LogisticsItemWrapper = styled.li`
  display: flex;
  font-size: 1.5rem;
  align-items: center;
  flex-direction: column;
  text-align: center;
  color: #aefff8;

  span {
    display: block;
  }

  .icon {
    margin-right: 1rem;
    color: #18e0d0;
  }

  .icon svg {
    width: 2rem;
    height: 2rem;
  }

  @media (min-width: 768px) {
    align-items: flex-start;
    text-align: left;
  }
`;
