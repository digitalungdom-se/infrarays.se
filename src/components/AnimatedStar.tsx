import styled from "styled-components";

const AnimatedStar = styled.label`
  color: ${(props) => props.theme.brand};
  font-family: sans-serif;
  animation: scale 5s infinite;

  @keyframes scale {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.3);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export default AnimatedStar;
