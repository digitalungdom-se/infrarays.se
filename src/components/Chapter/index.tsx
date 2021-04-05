import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import ReactMarkdown from "react-markdown";

interface ChapterProps {
  title: string;
  subtitle: string;
  description: string;
}

const Chapter: React.FC<ChapterProps> = ({
  title,
  subtitle,
  description,
  children,
}) => {
  return (
    <div>
      <h3 style={{ display: "block" }}>{title}</h3>
      <h4>{subtitle}</h4>
      <div
        style={{
          paddingTop: 10,
        }}
      >
        <ReactMarkdown source={description} />
      </div>
      <div style={{ padding: "10px 0" }}>{children}</div>
      <hr style={{ color: "#b8b8b8" }} />
    </div>
  );
};

export default Chapter;
