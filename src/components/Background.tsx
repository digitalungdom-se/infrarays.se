import styled from "styled-components";

const Background = styled.div`
  background: ${(props) => props.theme.bg};

  height: 100%;
  width: 100%;
  overflow: auto;

  #centered {
    width: 100%;
    min-height: calc(100% - 2.5rem);
    display: table;
  }
`;

export default Background;
