import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

export default styled(Button)`
  &.btn-custom {
    background-color: #DC0C05;
    color: white;
  }
  &.btn-custom:hover {
    /* original: #ff7773 */
    /* 25% avmättad, https://encycolorpedia.se/dc0c05 */
    background-color: #c7201a;
  }
  &.btn-custom:active {
    /* 25% mörkare */
    background-color: #b00a04;
  }
`;
