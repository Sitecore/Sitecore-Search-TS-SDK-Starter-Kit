import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { PageSection } from '../components/Common';
import SearchResults from '../widgets/SearchResults';

const SearchPageSection = styled(PageSection)`
  max-width: 1248px;
  margin: auto;
  padding-top: 40px;
`;

const Search = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  return (
    <SearchPageSection>
      <SearchResults key={query} rfkId="rfkid_7" defaultKeyphrase={query} title={`Showing results for "${query}"`} />
    </SearchPageSection>
  );
};

export default Search;
