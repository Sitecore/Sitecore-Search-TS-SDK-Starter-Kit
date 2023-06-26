import React from 'react';
import styled from 'styled-components';

import article from './images/article.png';
import blogs from './images/blogs.png';
import events from './images/events.png';
import news from './images/news.png';
import webinars from './images/webinars.png';

export const PageSection = styled.section`
  padding-top: 80px;
  padding-bottom: 80px;
  position: relative;
  z-index: 1;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  justify-content: space-between;
`;

export const MainTitle = styled.h1``;

export const ArticleIcon = styled.div`
  display: inline-flex;
  height: 30px;
  vertical-align: middle;
  width: 30px;
`;

const imgLookup: Record<string, string> = {
  blogs,
  news,
  events,
  webinars,
};

const getArticleImg = (type: string): string => {
  if (Object.hasOwn(imgLookup, type)) {
    return imgLookup[type];
  }
  return article;
};

export const ArticleType = ({ type }: { type: string }): JSX.Element => (
  <ArticleIcon>
    <img src={getArticleImg(type)} alt={type} />
  </ArticleIcon>
);

export const HighlightedWrapper = styled.div`
  max-width: 1280px;
  justify-content: center;
  margin: auto;
`;
