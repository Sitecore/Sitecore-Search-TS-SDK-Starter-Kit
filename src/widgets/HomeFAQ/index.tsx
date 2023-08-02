import React from 'react';

import { WidgetDataType, useQuestions, useSearchResults, widget } from '@sitecore-search/react';

import { HeroGlassPanel } from './styled';

const HomeHeroWidget = (): JSX.Element => {
  const {
    widgetRef,
    queryResult: {
      data: {
        related_questions: relatedQuestionsResponse = [],
        answer: { answer, question } = {
          answer: undefined,
          question: undefined,
        },
      } = {},
    },
  } = useQuestions({
    state: {
      keyphrase: 'What is XM cloud',
      relatedQuestions: 3,
    },
  });
  return (
    <>
      {relatedQuestionsResponse.map((a, index) => (
        <HeroGlassPanel key={`${a.question}-${index}`} ref={widgetRef}>
          <h1>{a.question}</h1>
          <div>{a.answer}</div>
        </HeroGlassPanel>
      ))}
    </>
  );
};

export default widget(HomeHeroWidget, WidgetDataType.QUESTIONS, 'content');
