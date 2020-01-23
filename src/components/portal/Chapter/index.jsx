import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

function Chapter({
  title,
  subtitle,
  description,
  children,
}) {
  return (
    <div>
      <h3 style={{ display: 'block' }}>
        {title}
      </h3>
      <h4>{subtitle}</h4>
      <div
        style={{
          paddingTop: 10,
        }}
      >
        <ReactMarkdown
          source={description}
        />
      </div>
      <div style={{ padding: '10px 0' }}>
        {children}
      </div>
      <hr styled="color:#b8b8b8" size="1" />
    </div>
  );
}

Chapter.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
};

Chapter.defaultProps = {
  title: null,
  subtitle: null,
  description: null,
};

export default Chapter;
