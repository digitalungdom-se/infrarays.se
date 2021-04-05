import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

interface ChapterProps {
  title: string; // title of the chapter
  subtitle: string; // subtitle of the chapter, used for hints like "Max 2 pages"
  description: string; // Description will be rendered with Markdown
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
}) => (
  <StyledDiv>
    <h3>{title}</h3>
    <h4>{subtitle}</h4>
    <ReactMarkdown source={description} />
    <div>{children}</div>
    <hr />
  </StyledDiv>
);

export default Chapter;
