import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import type { SearchResultsInitialState, SearchResultsStoreState } from '@sitecore-search/react';
import { WidgetDataType, useSearchResults, widget } from '@sitecore-search/react';
import { CardViewSwitcher } from '@sitecore-search/ui';

import type { ILanguageContext } from '../../contexts/languageContext';
import { LanguageContext } from '../../contexts/languageContext';
import { HIGHLIGHT_DATA } from '../../data/constants';
import type { ArticleModel } from '../utils';
import { generateQueryString, getQueryParam, paramsToObject, removeDuplicates } from '../utils';
import CardViewToggle from './CardViewSwitcher';
import SearchFacets from './Facets';
import Loader from './Loader';
import Pagination from './Pagination';
import GridStyledResults from './Results/GridStyles';
import RowStyledResults from './Results/RowStyles';
import SearchSort from './Sort';
import { QuerySummaryStyled, SearchResultsLayout } from './styled';

type ArticlesSearchResultsProps = {
  defaultSortType?: SearchResultsStoreState['sortType'];
  defaultPage?: SearchResultsStoreState['page'];
  defaultItemsPerPage?: SearchResultsStoreState['itemsPerPage'];
  defaultKeyphrase?: SearchResultsStoreState['keyphrase'];
  facetsToDisplay: { name: string }[];
};

type InitialState = SearchResultsInitialState<'itemsPerPage' | 'keyphrase' | 'page' | 'sortType'>;

export const SearchResultsWithLayoutOptionComponent = ({
  defaultSortType = 'featured_desc',
  defaultPage = 1,
  defaultKeyphrase = '',
  defaultItemsPerPage = 24,
  facetsToDisplay,
}: ArticlesSearchResultsProps) => {
  const { language } = useContext<ILanguageContext>(LanguageContext);
  const navigate = useNavigate();
  const location = useLocation();

  const getTypesIntinalValue = () => {
    const defaultTypes = facetsToDisplay;
    const types = structuredClone(defaultTypes);
    // eslint-disable-next-line array-callback-return
    types.map((type: any) => {
      const value = getQueryParam(location.search, type.name);
      let queryValue = value != null && value !== '' ? value.split(',') : [];
      queryValue = queryValue.filter((n: any) => n);
      if (queryValue && queryValue.length > 0) {
        type.filter = { type: 'or', values: queryValue };
      }
    });
    return types;
  };

  const initialTypes = getTypesIntinalValue();
  const [types] = useState([...initialTypes]);

  const {
    widgetRef,
    actions: {
      onResultsPerPageChange,
      onPageNumberChange,
      onItemClick,
      onFilterClick,
      onSortChange,
      onFacetClick,
      onClearFilters,
    },
    state: { sortType, page, itemsPerPage },
    queryResult: {
      isLoading,
      isFetching,
      data: {
        total_item: totalItems = 0,
        sort: { choices: sortChoices = [] } = {},
        facet: facets = [],
        content: articles = [],
      } = {},
    },
  } = useSearchResults<ArticleModel, InitialState>({
    query: (query): any => {
      query
        .getRequest()
        .setSearchQueryHighlightFragmentSize(500)
        .setSearchQueryHighlightFields(['subtitle', 'description'])
        .setSearchQueryHighlightPreTag(HIGHLIGHT_DATA.pre)
        .setSearchQueryHighlightPostTag(HIGHLIGHT_DATA.post);

      if (types != null && types.length > 0) {
        query.getRequest().setSearchFacet({ types });
      }
    },
    state: {
      sortType: defaultSortType,
      page: defaultPage,
      itemsPerPage: defaultItemsPerPage,
      keyphrase: defaultKeyphrase,
    },
  });
  const totalPages = Math.ceil(totalItems / (itemsPerPage !== 0 ? itemsPerPage : 1));
  const selectedSortIndex = sortChoices.findIndex((s) => s.name === sortType);
  const defaultCardView = CardViewSwitcher.CARD_VIEW_LIST;
  const [dir, setDir] = useState(defaultCardView);
  const onToggle = (value = defaultCardView) => setDir(value);

  const onPageNumberChangeOveride = (params: any) => {
    const updatedRelativeUrl = generateQueryString(location.pathname + location.search, {
      page: params.page,
    });

    navigate(updatedRelativeUrl);
    onPageNumberChange(params);
  };

  const updateFacetsSearchParams = (params: any, remove = false) => {
    const queryParams = new URLSearchParams(location.search);
    const searchParamsObject = paramsToObject(queryParams.entries()) as any;
    let values = searchParamsObject[params.facetId]?.split(',') ?? [];
    values = values.filter((n: any) => n);
    if (remove || params.checked === false) {
      const index = values.indexOf(params.facetValueId);
      if (index > -1) {
        values.splice(index, 1);
      }
    } else {
      values.push(params.facetValueId);
    }
    if (values.length <= 0) {
      delete searchParamsObject[params.facetId];
    }
    delete searchParamsObject.page;
    searchParamsObject[params.facetId] = removeDuplicates(values).join(',');
    const updatedRelativeUrl = generateQueryString('/search', searchParamsObject);
    navigate(updatedRelativeUrl);
  };

  const onFacetClickOveride = (params: any) => {
    updateFacetsSearchParams(params);
    onFacetClick(params);
  };

  const onFilterClickOveride = (params: any) => {
    updateFacetsSearchParams(params, true);
    onFilterClick(params);
  };

  const onClearFiltersOveride = () => {
    navigate('/search');
    onClearFilters();
  };

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      {!isLoading && (
        <SearchResultsLayout.MainArea ref={widgetRef}>
          <SearchResultsLayout.MainArea>
            {isFetching && <Loader isLoading={isFetching} />}
            {totalItems > 0 && (
              <>
                <SearchResultsLayout.LeftArea>
                  <SearchFacets
                    facets={facets}
                    clearfiltersText="Clear"
                    facetsnumbertoshow={5}
                    onFacetClick={onFacetClickOveride}
                    onFilterClick={onFilterClickOveride}
                    onClearFilters={onClearFiltersOveride}
                  />
                </SearchResultsLayout.LeftArea>
                <SearchResultsLayout.RightArea>
                  <SearchResultsLayout.RightTopArea>
                    {totalItems && (
                      <QuerySummaryStyled>
                        <b>
                          Showing {itemsPerPage * (page - 1) + 1} - {itemsPerPage * (page - 1) + articles.length} of{' '}
                          {totalItems} results
                        </b>
                      </QuerySummaryStyled>
                    )}

                    <SearchResultsLayout.Toolbar>
                      {/* Card View Switcher */}
                      <CardViewToggle onToggle={onToggle} defaultCardView={defaultCardView} />

                      {/* Sort Select */}
                      <SearchSort
                        language={language}
                        onSortChange={onSortChange}
                        selectedSortIndex={selectedSortIndex}
                        sortChoices={sortChoices}
                      />
                    </SearchResultsLayout.Toolbar>
                  </SearchResultsLayout.RightTopArea>

                  {/* Results */}
                  {dir === CardViewSwitcher.CARD_VIEW_GRID ? (
                    <GridStyledResults articles={articles} language={language} onItemClick={onItemClick} />
                  ) : (
                    <RowStyledResults articles={articles} language={language} onItemClick={onItemClick} />
                  )}

                  {/* Pagination */}
                  <Pagination
                    defaultItemsPerPage={defaultItemsPerPage}
                    onPageNumberChange={onPageNumberChangeOveride}
                    onResultsPerPageChange={onResultsPerPageChange}
                    page={page}
                    totalPages={totalPages}
                  />
                </SearchResultsLayout.RightArea>
              </>
            )}
          </SearchResultsLayout.MainArea>
        </SearchResultsLayout.MainArea>
      )}
    </>
  );
};

const SearchResultsWithLayoutOptionWidget = widget(
  SearchResultsWithLayoutOptionComponent,
  WidgetDataType.SEARCH_RESULTS,
  'content',
);

export default SearchResultsWithLayoutOptionWidget;
