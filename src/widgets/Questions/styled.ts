import styled from 'styled-components';

import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { theme } from '@sitecore-search/ui';

export const AnswerAreaWrapper = styled.div`
  width: 95%;
  margin: auto;
  margin-bottom: ${theme.vars.spacing.m};
`;

export const PrimaryQuestionBox = styled.div`
  width: 100%;
  background: linear-gradient(120deg, #eb1f1f 30%, #5548d9 160%);
  padding: ${theme.vars.spacing.m};
  text-align: left;
  color: ${theme.vars.palette.grey['100']};
  box-sizing: border-box;
`;

export const FrequentQuestionsBox = styled.div`
  width: 100%;
  border: 1px solid ${theme.vars.palette.grey['500']};
  border-top: none;
  color: ${theme.vars.palette.primary.contrastText};
  box-sizing: border-box;
  padding: ${theme.vars.spacing.m};
  text-align: left;
  cursor: pointer;
  border-radius: 0 0 8px 8px;
`;

export const FrequentQuestionTitle = styled.h4`
  font-size: ${theme.vars.typography.fontSize4.fontSize};
`;

export const FrequentQuestionIconClosed = styled(ChevronDownIcon)`
  color: ${theme.vars.palette.primary.contrastText};
  transition: transform 300ms cubic-bezier(0.87, 0, 0.13, 1);
`;

export const FrequentQuestionIconOpen = styled(ChevronUpIcon)`
  color: ${theme.vars.palette.primary.contrastText};
  transition: transform 300ms cubic-bezier(0.87, 0, 0.13, 1);
`;

export const FrequentQuestionBoxTitle = styled.h4`
  color: ${theme.vars.palette.primary.contrastText};
  font-size: ${theme.vars.typography.fontSize4.fontSize};
`;

export const PrimaryQuestionBoxTitle = styled.h4`
  font-size: ${theme.vars.typography.fontSize5.fontSize};
`;

export const PrimaryQuestionBoxAnswer = styled.p`
  font-size: ${theme.vars.typography.fontSize3.fontSize};
`;

export const QuestionBoxAnswer = styled.p`
  font-size: ${theme.vars.typography.fontSize2.fontSize};
  line-height: 1.5;
`;
