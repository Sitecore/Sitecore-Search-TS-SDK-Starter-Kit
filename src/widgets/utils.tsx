import React from 'react';

import type { HighlightTag } from '../data/types';

type HighlightModel = {
  description?: Array<string>;
  subtitle?: Array<string>;
  title?: Array<string>;
};

export type ArticleModel = {
  id: string;
  type?: string;
  title: string;
  subtitle?: string;
  url?: string;
  description?: string;
  image_url?: string;
  image?: string;
  source_id?: string;
  highlight?: HighlightModel;
};

export const getDescription = (article: ArticleModel, key: 'description' | 'subtitle' | 'title'): string => {
  if (article?.highlight && article?.highlight[key] && (article.highlight[key] || []).length > 0) {
    return (article.highlight[key] || []).join(' ');
  }
  return article[key] || '';
};

export const HighlightComponent = ({
  text,
  preSeparator,
  postSeparator,
  highlightElement,
}: {
  text: string;
  preSeparator: string;
  postSeparator: string;
  highlightElement: HighlightTag;
}) => {
  const elements = text.split(preSeparator);
  const Highlight = highlightElement;
  if (elements.length > 1) {
    return (
      <div>
        {elements.map((e, index: number) => {
          if (e.includes(postSeparator)) {
            const parts = e.split(postSeparator);
            return (
              <span key={index}>
                <Highlight key={`${index}-${index}`}>{parts[0]}</Highlight> {parts[1]}
              </span>
            );
          } else {
            return <span key={index}>{e}</span>;
          }
        })}
      </div>
    );
  }
  return <>{text}</>; // means that separator is not in the text
};
