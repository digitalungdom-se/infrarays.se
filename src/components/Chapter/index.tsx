import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

interface ChapterProps {
  title: string;
  subtitle: string;
  description: string;
}

const StyledDiv = styled.div`
  & > div {
    margin-top: 1.5rem;
  }
  hr {
    color: #b8b8b8;
  }
`;

const Chapter: React.FC<ChapterProps> = ({
  title,
  subtitle,
  description,
  children,
}) => {
  return (
    <StyledDiv>
      <h3>{title}</h3>
      <h4>{subtitle}</h4>
      <ReactMarkdown source={description} />
      <div>{children}</div>
      <hr />
    </StyledDiv>
  );
};

export default Chapter;
