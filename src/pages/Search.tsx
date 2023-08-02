import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { theme } from '@sitecore-search/ui';

import { PageSection } from '../components/Common';
import { PAGE_EVENTS_SEARCH } from '../data/constants';
import withPageTracking from '../hocs/withPageTracking';
import Questions from '../widgets/Questions';
import SearchResults from '../widgets/SearchResults';

const SearchPageSection = styled(PageSection)`
  max-width: 1248px;
  margin: auto;
  padding-top: 40px;
`;

const SearchPageTitle = styled.h2`
  color: ${theme.vars.palette.primary.contrastText};
  font-size: ${theme.vars.typography.fontSize6.fontSize};
  width: 100%;
  text-align: left;
`;

const Search = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <SearchPageSection>
      <div>
        <SearchPageTitle>{`Showing results for "${query}"`}</SearchPageTitle>
        <Questions key={`${query}-questions`} rfkId="rfkid_qa" keyphrase={query} defaultRelatedQuestions={4} />
        <SearchResults key={`${query}-search`} rfkId="rfkid_7" defaultKeyphrase={query} />
      </div>
    </SearchPageSection>
  );
};

export default withPageTracking(Search, PAGE_EVENTS_SEARCH);
