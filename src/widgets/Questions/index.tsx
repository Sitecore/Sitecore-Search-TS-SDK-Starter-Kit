import React, { useState } from 'react';

import { WidgetDataType, useQuestions, widget } from '@sitecore-search/react';

import {
  AnswerAreaWrapper,
  FrequentQuestionBoxTitle,
  FrequentQuestionIconClosed,
  FrequentQuestionIconOpen,
  FrequentQuestionTitle,
  FrequentQuestionsBox,
  PrimaryQuestionBox,
  PrimaryQuestionBoxAnswer,
  PrimaryQuestionBoxTitle,
} from './styled';

type QuestionsProps = {
  keyphrase?: string;
  defaultRelatedQuestions?: number;
};

const FrequentQuestion = ({ question, answer }: { question: string; answer: string }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <FrequentQuestionTitle onClick={() => setExpanded(!expanded)}>
        {question} {expanded ? <FrequentQuestionIconOpen /> : <FrequentQuestionIconClosed />}
      </FrequentQuestionTitle>
      {expanded && <p>{answer}</p>}
    </div>
  );
};
const QuestionsComponent = ({ keyphrase = '', defaultRelatedQuestions = 4 }): JSX.Element => {
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
      keyphrase,
      relatedQuestions: defaultRelatedQuestions,
    },
  });
  return (
    <>
      {answer && question && (
        <AnswerAreaWrapper ref={widgetRef}>
          <PrimaryQuestionBox>
            <PrimaryQuestionBoxTitle>{question}</PrimaryQuestionBoxTitle>
            <PrimaryQuestionBoxAnswer>{answer}</PrimaryQuestionBoxAnswer>
          </PrimaryQuestionBox>
          {relatedQuestionsResponse.length > 0 && (
            <FrequentQuestionsBox>
              <FrequentQuestionBoxTitle>People also ask ...</FrequentQuestionBoxTitle>
              {relatedQuestionsResponse.map(({ answer, question }, index) => (
                <FrequentQuestion key={`${question}-${index}`} question={question} answer={answer} />
              ))}
            </FrequentQuestionsBox>
          )}
        </AnswerAreaWrapper>
      )}
    </>
  );
};
export default widget(QuestionsComponent, WidgetDataType.QUESTIONS, 'content');
