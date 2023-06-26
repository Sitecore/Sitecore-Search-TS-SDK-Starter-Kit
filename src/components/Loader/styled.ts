import styled, { keyframes } from 'styled-components';

import { theme } from '@sitecore-search/ui';

export const LoaderContainer = styled.div`
  align-items: center;
  display: flex;
  min-height: 50vh;
`;

const Rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoaderAnimation = styled.svg`
  animation: ${Rotate} 2s linear infinite;
  display: block;
  fill: ${theme.vars.palette.primary.main};
  height: 50px;
  margin: auto;
  width: 50px;
`;
