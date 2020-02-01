import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

const StyledGroup = styled(Form.Group)`
  & {
    position: relative;
    margin-bottom: 1rem;
  }

  .inputbox {
    margin-top: 30px;
    width: 300px;
  }

  & > input {
    padding: ${props => props.y}rem ${props => props.x}rem;
  }

  & > label {
    padding: ${props => props.y / 2}rem ${props => props.x}rem;
  }

  & > label {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    margin-bottom: 0;
    /* line-height: 0; */
    color: #495057;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    transition: all 0.1s ease-in-out;
    pointer-events: none;
  }

  & input::-webkit-input-placeholder {
    color: transparent;
  }

  & input:-ms-input-placeholder {
    color: transparent;
  }

  & input::-ms-input-placeholder {
    color: transparent;
  }

  & input::-moz-placeholder {
    color: transparent;
  }

  & input::placeholder {
    color: transparent;
  }

  & input:not(:placeholder-shown):not([type='date']) {
    padding-top: calc(
      ${props => props.y}rem + ${props => props.y}rem * (1 / 3)
    );
    padding-bottom: calc(${props => props.y}rem * (2 / 3));
  }

  & input:not(:placeholder-shown) ~ label {
    padding-top: calc(${props => props.y / 2}rem * (1 / 3));
    padding-bottom: calc(${props => props.y}rem * (2 / 3));
    font-size: 12px;
    color: #777;
  }
`;

StyledGroup.defaultProps = {
  x: 0.75,
  y: 1.5
};

StyledGroup.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number
};

export default StyledGroup;
