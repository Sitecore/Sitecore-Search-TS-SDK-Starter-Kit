import { useState } from 'react';

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

type RelatedQuestionsModel = {
  question: string;
  answer: string;
};

type AnswerModel = {
  answer: string;
  question: string;
  relatedQuestions: Array<RelatedQuestionsModel>;
};

const AnswerArea = ({ answer, question, relatedQuestions }: AnswerModel) => {
  return (
    <AnswerAreaWrapper>
      <PrimaryQuestionBox>
        <PrimaryQuestionBoxTitle>{question}</PrimaryQuestionBoxTitle>
        <PrimaryQuestionBoxAnswer>{answer}</PrimaryQuestionBoxAnswer>
      </PrimaryQuestionBox>
      {relatedQuestions.length > 0 && (
        <FrequentQuestionsBox>
          <FrequentQuestionBoxTitle>People also ask ...</FrequentQuestionBoxTitle>
          {relatedQuestions.map(({ answer, question }, index) => (
            <FrequentQuestion key={`${question}-${index}`} question={question} answer={answer} />
          ))}
        </FrequentQuestionsBox>
      )}
    </AnswerAreaWrapper>
  );
};

export default AnswerArea;
