import React from 'react';

import { PAGE_EVENTS_HOME } from '@/data/constants';
import withPageTracking from '@/hocs/withPageTracking';
import { HTMBlockWidget } from '@sitecore-search/react';

const Home = (): JSX.Element => {
  return (
    <>
      <HTMBlockWidget rfkId="home_hero" />
      {/* <HomeFAQ /> */}
      <HTMBlockWidget rfkId="highlight_title" />
      {/* <HomeHighlighted rfkId="search_home_highlight_articles" /> */}
    </>
  );
};

export default withPageTracking(Home, PAGE_EVENTS_HOME);
