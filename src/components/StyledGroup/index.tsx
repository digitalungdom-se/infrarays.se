import Form from "react-bootstrap/Form";
import styled from "styled-components";

interface StyledGroupProps {
  x: number;
  y: number;
}

const defaultProps = {
  x: 0.75,
  y: 1.5,
};

const StyledGroup = styled(Form.Group)<StyledGroupProps>`
  & {
    position: relative;
    margin-bottom: 1rem;
  }

  .inputbox {
    margin-top: 30px;
    width: 300px;
  }

  & > input {
    padding: ${({ y = defaultProps.y }) => y}rem
      ${({ x = defaultProps.x }) => x}rem;
  }

  & > label {
    padding: ${({ y = defaultProps.y }) => y / 2}rem
      ${({ x = defaultProps.x }) => x}rem;
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

  & input:not(:placeholder-shown):not([type="date"]) {
    padding-top: calc(
      ${({ y = defaultProps.y }) => y}rem + ${({ y = defaultProps.y }) => y}rem *
        (1 / 3)
    );
    padding-bottom: calc(${({ y = defaultProps.y }) => y}rem * (2 / 3));
  }

  & input:not(:placeholder-shown) ~ label {
    padding-top: calc(${({ y = defaultProps.y }) => y / 2}rem * (1 / 3));
    padding-bottom: calc(${({ y = defaultProps.y }) => y}rem * (2 / 3));
    font-size: 12px;
    color: ${(props) => props.theme.brand || "#777"};
  }
`;

export default StyledGroup;
