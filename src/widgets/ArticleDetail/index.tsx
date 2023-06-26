import React from 'react';

import { FilterEqual, WidgetDataType, useSearchResults, widget } from '@sitecore-search/react';

import { DEFAULT_IMAGE } from '../../data/constants';
import type { ArticleModel } from '../utils';
import {
  DetailDescription,
  DetailHeader,
  DetailHeaderContent,
  DetailHeaderImage,
  DetailHeaderTitle,
  DetailSubtitle,
  DetailWrapper,
} from './styled';

type ArticleDetailProps = {
  id: string;
};

export const ArticleDetailComponent = ({ id }: ArticleDetailProps): JSX.Element => {
  const {
    context: { itemsPerPage = 1 },
    queryResult: { isLoading, isFetching, data: { content: articles = [] } = {} },
  } = useSearchResults<ArticleModel>((query) => {
    query.getRequest().setSearchFilter(new FilterEqual('id', id));
  });
  let mainArticle: ArticleModel = { id: '', title: '' };
  if (articles.length > 0) {
    mainArticle = articles[0];
  }
  return (
    <DetailWrapper>
      <DetailHeader>
        <DetailHeaderContent>
          <DetailHeaderTitle>{mainArticle.title}</DetailHeaderTitle>
        </DetailHeaderContent>
        <DetailHeaderContent>
          <DetailHeaderImage src={mainArticle.image_url || mainArticle.image || DEFAULT_IMAGE} />
        </DetailHeaderContent>
      </DetailHeader>
      <DetailSubtitle>{mainArticle?.subtitle}</DetailSubtitle>
      <DetailDescription>{mainArticle?.description}</DetailDescription>
    </DetailWrapper>
  );
};

const ArticleDetailWidget = widget(ArticleDetailComponent as React.FC, WidgetDataType.SEARCH_RESULTS, 'content');

export default ArticleDetailWidget;
