import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.css';
import PropTypes from 'prop-types';
import Plate from 'components/Plate';

function Chapter({
  title,
  subtitle,
  description,
  upload,
}) {
  return (
    <Plate>
      <div className="section">
        <h3 style={{ display: 'block' }}>
          {title}
        </h3>
        <h4>{subtitle}</h4>
        <div style={{
          paddingTop: 10, paddingBottom: 20,
        }}
        >
          {description}
        </div>
        {
          upload
        }
      </div>
    </Plate>
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
