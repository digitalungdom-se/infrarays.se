import InputGroup from "react-bootstrap/InputGroup";
import styled from "styled-components";

const StyledInputGroup = styled(InputGroup)`
  &.uploaded span,
  &.uploaded .form-control {
    color: #155724;
    background-color: #d4edda;
    border-color: #28a745;
  }

  &.uploaded .form-control,
  &.error .form-control {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &.uploaded span::after,
  &.uploaded .input-group-append .dropdown-toggle {
    color: #fff;
    background-color: #42c15f;
    border-color: #28a745;
  }

  &.uploaded .input-group-append .dropdown-toggle {
    background-color: rgba(40, 167, 69, 1);
  }

  &.uploaded span {
    border-color: rgb(40, 167, 69);
  }

  &.error span,
  &.error .form-control {
    color: #bd2130;
    background-color: #f8d7da;
    border-color: #bd2130;
  }

  &.error span::after,
  &.error .input-group-append .dropdown-toggle {
    color: #fff;
    background-color: #e23d4d;
    border-color: #bd2130;
  }

  &.error .input-group-append .dropdown-toggle {
    background-color: rgba(200, 35, 51, 1);
  }
`;

export default StyledInputGroup;
