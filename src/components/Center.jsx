import styled from 'styled-components';

export default styled.div`

  width: 80%;
  max-width: ${(props) => props.maxWidth || '700px'};
  @media(max-width: ${(props) => props.minWidth || '400px'}) {
    height: 100%;
    width: 100%;
  }

  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;
