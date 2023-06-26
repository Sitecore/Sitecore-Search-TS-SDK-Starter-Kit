import React from 'react';

import { HTMBlockWidget } from '@sitecore-search/react';

import HomeHeroWidget from '../../widgets/HomeFAQ';
import { FAQBackground, FAQContent, FAQPageSection } from './styled';

const HomeHero = (): JSX.Element => {
  return (
    <FAQPageSection>
      <FAQBackground />
      <HTMBlockWidget rfkId="faqs_title" />
      <FAQContent>
        <HomeHeroWidget rfkId="rfkid_7" />
      </FAQContent>
    </FAQPageSection>
  );
};

export default HomeHero;
