import styled from 'styled-components';

import { theme } from '@sitecore-search/ui';

export const QuerySummaryWrapper = styled.div`
  display: flex;
  text-align: left;
`;

export const MainQuerySummary = styled.span`
  color: ${theme.vars.palette.primary.contrastText};
  font-size: 14px;
  display: inline-flex;
`;

export const SummaryHighlight = styled.span`
  font-weight: bold;
`;
