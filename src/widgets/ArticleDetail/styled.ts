import styled from 'styled-components';

import { theme } from '@sitecore-search/ui';

export const DetailWrapper = styled.div`
  max-width: 1200px;
  margin: auto;
`;

export const DetailHeader = styled.div`
  display: flex;
  align-items: center;
`;

export const DetailHeaderContent = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  min-height: 300px;
  align-self: center;
  display: flex;
  align-items: center;
`;

export const DetailHeaderTitle = styled.h1`
  color: ${theme.vars.palette.primary.contrastText};
  font-size: ${theme.vars.typography.fontSize8.fontSize};
  padding: ${theme.vars.spacing.m};
`;

export const DetailHeaderImage = styled.img`
  max-width: 500px;
`;

export const DetailSubtitle = styled.h2`
  text-align: left;
  color: ${theme.vars.palette.primary.contrastText};
  font-size: ${theme.vars.typography.fontSize5.fontSize};
`;

export const DetailDescription = styled.div`
  text-align: left;
  line-height: 2;
  padding: ${theme.vars.spacing.m} 0;
  color: ${theme.vars.palette.primary.contrastText};
  font-size: ${theme.vars.typography.fontSize2.fontSize};
`;
