import React from 'react';
import styled from 'styled-components';

import { HTMBlockWidget } from '@sitecore-search/react';

import { HighlightedWrapper, PageSection } from '../components/Common';
import HomeFAQ from '../components/HomeFAQ';
import { PAGE_EVENTS_HOME } from '../data/constants';
import withPageTracking from '../hocs/withPageTracking';
import HomeHighlighted from '../widgets/HomeHighlighted';

const HighlightedArticles = styled(PageSection)`
  background: url(https://wwwsitecorecom.azureedge.net/assets/images/Sitecore_3D-Composition_Neutral_Scene04.jpg);
  background-size: cover;
  background-position: left;
  opacity: 0.9;
`;

const Home = (): JSX.Element => {
  return (
    <>
      <HTMBlockWidget rfkId="home_hero" />
      <HomeFAQ />
      <HighlightedArticles>
        <HighlightedWrapper>
          <HTMBlockWidget rfkId="highlight_title" />
          <HomeHighlighted rfkId="search_home_highlight_articles" />
        </HighlightedWrapper>
      </HighlightedArticles>
    </>
  );
};

export default withPageTracking(Home, PAGE_EVENTS_HOME);
