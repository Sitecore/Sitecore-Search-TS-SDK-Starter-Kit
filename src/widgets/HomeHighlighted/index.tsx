import React from 'react';

import { FilterEqual, WidgetDataType, useSearchResults, widget } from '@sitecore-search/react';

import { Row } from '../../components/Common';
import { getContentIcon } from '../../components/Icons';
import fields from '../../data/contentFields.json';
import { ArticleCard, ArticleCardContent, ArticleCardImage } from './styled';

export const HomeHighlightedComponent = (): JSX.Element => {
  const {
    queryResult: { data: { content: articles = [] } = {} },
  } = useSearchResults((query) => {
    query.getRequest().setSearchFilter(new FilterEqual('type', 'Blogs'));
    return {};
  });
  const articlesToShow = articles.slice(0, 3);
  return (
    <Row>
      {articlesToShow.map((a, index) => (
        <ArticleCard key={`${a.id}-${index}`}>
          <ArticleCardContent>
            <ArticleCardImage>{getContentIcon(a.type)}</ArticleCardImage>
            <h3>{a.title}</h3>
            <span>{a.subtitle}</span>
          </ArticleCardContent>
        </ArticleCard>
      ))}
    </Row>
  );
};

export default widget(HomeHighlightedComponent, WidgetDataType.SEARCH_RESULTS, 'content');
