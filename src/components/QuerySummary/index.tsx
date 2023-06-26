import React from 'react';
import { MainQuerySummary, SummaryHighlight, QuerySummaryWrapper } from './styled';

export interface IQuerySummary {
  resultsPerPage: number;
  totalResults: number;
  currentPage: number;
}

const QuerySummary = (props: IQuerySummary): JSX.Element => {
  const { resultsPerPage, totalResults, currentPage } = props;

  const showResultFrom = (currentPage - 1) * resultsPerPage + 1;
  const showResultTo = showResultFrom + resultsPerPage - 1;

  return (
    <QuerySummaryWrapper>
      <MainQuerySummary>
        <span>
          Showing <SummaryHighlight>{showResultFrom}</SummaryHighlight> to
          <SummaryHighlight> {showResultTo < totalResults ? showResultTo : totalResults} </SummaryHighlight>
          from <SummaryHighlight>{totalResults} </SummaryHighlight> results
        </span>
      </MainQuerySummary>
    </QuerySummaryWrapper>
  );
};

export default QuerySummary;
