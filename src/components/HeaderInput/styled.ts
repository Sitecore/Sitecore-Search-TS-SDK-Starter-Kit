import styled from 'styled-components';

import { theme } from '@sitecore-search/ui';

export const HeaderInputWrapper = styled.div`
  width: 70%;
  display: flex;

  form {
    width: 100%;
    text-align: left;
  }
`;

export const InputField = styled.input`
  background: none;
  border: none;
  width: 90%;
  padding: 5px;
  height: 40px;
  outline: none;
  font-size: 24px;
  color: ${theme.vars.palette.primary.contrastText};
`;

export const HeaderIconWrapper = styled.div`
  svg {
    width: 25px;
    height: 24px;
    padding: 10px;
    color: #7b7b7b;
  }
`;
