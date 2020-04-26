import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loading = styled.div`
  width: 5em;
  height: 5em;
  border: 2em solid #2db1b9;
  border-radius: 50%;
  border-top-color: transparent;
  animation: ${spin} 1s linear infinite;
`;

export default Loading;
