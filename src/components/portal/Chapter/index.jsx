import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import PropTypes from 'prop-types';
import Plate from 'components/Plate';

function Chapter({
  title,
  subtitle,
  description,
}) {
  return (
    <div style={{ background: '#f6f6f6', padding: 100 }}>
      <Plate>
        <div className="section">
          <h3 style={{ display: 'block' }}>
            {title}
          </h3>
          <h4>{subtitle}</h4>
          <div className="col-md-12">
            {description}
          </div>
          <form className="upload" method="post" action="/upload/coverLetter" id="coverLetterForm" encType="multipart/form-data">
            <div className="custom-file">
              <input type="file" className="custom-file-input file-input" name="file" id="coverLetter" />
              <label className="custom-file-label">Ladda upp personligt brev</label>
            </div>
          </form>
        </div>
      </Plate>
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
