import styled from 'styled-components';

import { theme } from '@sitecore-search/ui';

export const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 999998;
`;

export const HeaderContentWrapper = styled.div`
  -webkit-box-align: center;
  align-items: center;
  background-color: ${theme.vars.palette.primary.main};
  box-shadow: rgb(153 153 153) 0 1px 3px;
  padding: 1em;
`;

export const HeaderContent = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  align-items: center;
`;
