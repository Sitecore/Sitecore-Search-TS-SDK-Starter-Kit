import React from 'react';

import { DEFAULT_IMAGE } from '@/data/constants';
import type { ArticleModel } from '@/widgets/SearchResults';
import type { SearchResultsInitialState } from '@sitecore-search/react';
import { FilterEqual, WidgetDataType, useSearchResults, widget } from '@sitecore-search/react';

type ArticleDetailProps = {
  id?: string;
};

type InitialState = SearchResultsInitialState<'itemsPerPage'>;

export const ArticleDetailComponent = ({ id }: ArticleDetailProps): JSX.Element => {
  const {
    widgetRef,
    queryResult: { data: { content: articles = [] } = {} },
  } = useSearchResults<ArticleModel, InitialState>({
    query: (query) => {
      const equalFilter = new FilterEqual('id', id);
      query.getRequest().setSearchFilter(equalFilter);
    },
    state: {
      itemsPerPage: 1,
    },
  });
  let mainArticle: ArticleModel = { id: '', title: '' };
  if (articles.length > 0) {
    mainArticle = articles[0];
  }
  return (
    <div className="max-w-[1280px] m-auto pt-10" ref={widgetRef}>
      <div className="items-center flex justify-between">
        <div className="max-w-[50%] min-h-[300px] flex items-center flex-col">
          <h1 className="text-xl font-bold text-gray-700 dark:text-gray-100 w-full">{mainArticle.title}</h1>
          <div className="text-left text-md text-gray-700 dark:text-gray-100">{mainArticle?.subtitle}</div>
          <div className="text-left leading-3 text-sm text-gray-700 dark:text-gray-100">{mainArticle?.description}</div>
        </div>
        <div className="max-w-[50%] min-h-[300px] flex items-center">
          <img className="max-w-[500px]" src={mainArticle.image_url || DEFAULT_IMAGE} />
        </div>
      </div>
    </div>
  );
};

const ArticleDetailWidget = widget(ArticleDetailComponent, WidgetDataType.SEARCH_RESULTS, 'content');

export default ArticleDetailWidget;
