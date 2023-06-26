import React from 'react';

import { WidgetDataType, useSearchResults, widget } from '@sitecore-search/react';

import { HeroGlassPanel } from './styled';

// Recommendation widgets can only be created via api for now.
const HomeHeroWidget = (): JSX.Element => {
  const {
    queryResult: { data: { related_questions: relatedQuestions = [] } = {} },
  } = useSearchResults((query: any): any => {
    query.getRequest().setSearchRelatedQuestions({ max: 4 });
    return {
      keyphrase: 'What is sitecore',
    };
  });
  return (
    <>
      {relatedQuestions.map((a, index) => (
        <HeroGlassPanel key={`${a.question}-${index}`}>
          <h1>{a.question}</h1>
          <div>{a.answer}</div>
        </HeroGlassPanel>
      ))}
    </>
  );
};

export default widget(HomeHeroWidget, WidgetDataType.SEARCH_RESULTS, 'content');
