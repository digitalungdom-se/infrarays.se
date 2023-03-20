import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";

interface ChapterProps {
  title?: string;
  subtitle?: string;
  description: string;
  children?: React.ReactNode;
}

function Chapter({ title, subtitle, description, children }: ChapterProps) {
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
}

export default Chapter;
