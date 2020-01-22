import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

function Chapter({
  title,
  subtitle,
  description,
  upload,
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
          paddingTop: 10, paddingBottom: 20,
        }}
      >
        <ReactMarkdown
          source={description}
        />
      </div>
      {
        upload
      }
      {children}
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
