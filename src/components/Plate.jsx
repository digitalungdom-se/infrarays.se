import styled from "styled-components";

const Plate = styled.div`
  padding: 20px 36px;
  @media (max-width: 400px) {
    padding: 20px 5%;
  }
  background: #fff;
  color: #000;
  -moz-box-shadow: 0 0 3px #ccc;
  -webkit-box-shadow: 0 0 3px #ccc;
  -o-box-shadow: 0 0 3px #ccc;
  box-shadow: 0 0 3px #ccc;
  border-radius: 8px;

  min-width: 300px;

  /* display: block; */
`;

export default Plate;
