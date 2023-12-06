import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, GridIcon, ListBulletIcon } from '@radix-ui/react-icons';
import { Presence } from '@radix-ui/react-presence';
import type { SearchResultsInitialState, SearchResultsStoreState } from '@sitecore-search/react';
import { WidgetDataType, useSearchResults, useSearchResultsSelectedFilters, widget } from '@sitecore-search/react';
import { AccordionFacets, CardViewSwitcher, Pagination, Select, SortSelect } from '@sitecore-search/ui';

import type { ILanguageContext } from '../../contexts/languageContext';
import { LanguageContext } from '../../contexts/languageContext';
import { DEFAULT_IMAGE, HIGHLIGHT_DATA, SEARCH_SOURCE } from '../../data/constants';
import type { ArticleModel } from '../utils';
import { HighlightComponent, getDescription } from '../utils';
import {
  AccordionFacetsStyled,
  ArticleCardRowStyled,
  ArticleCardStyled,
  CardViewSwitcherStyled,
  FiltersStyled,
  GridStyled,
  LoaderAnimation,
  LoaderContainer,
  PageControlsStyled,
  PaginationStyled,
  QuerySummaryStyled,
  RowStyled,
  SearchResultsLayout,
  SelectStyled,
  SortSelectStyled,
} from './styled';

type ArticlesSearchResultsProps = {
  defaultSortType?: SearchResultsStoreState['sortType'];
  defaultPage?: SearchResultsStoreState['page'];
  defaultItemsPerPage?: SearchResultsStoreState['itemsPerPage'];
  defaultKeyphrase?: SearchResultsStoreState['keyphrase'];
};

type InitialState = SearchResultsInitialState<'itemsPerPage' | 'keyphrase' | 'page' | 'sortType'>;

export const SearchResultsWithLayoutOptionComponent = ({
  defaultSortType = 'featured_desc',
  defaultPage = 1,
  defaultKeyphrase = '',
  defaultItemsPerPage = 24,
}: ArticlesSearchResultsProps) => {
  const { language } = useContext<ILanguageContext>(LanguageContext);
  const navigate = useNavigate();
  const {
    widgetRef,
    actions: {
      onResultsPerPageChange,
      onPageNumberChange,
      onItemClick,
      onRemoveFilter,
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

      if (SEARCH_SOURCE != '') {
        query.getRequest().addSource(SEARCH_SOURCE) ;
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
  const selectedFacetsFromApi = useSearchResultsSelectedFilters();
  const defaultCardView = CardViewSwitcher.CARD_VIEW_LIST;
  const [dir, setDir] = useState(defaultCardView);
  const onToggle = (value = defaultCardView) => setDir(value);

  return (
    <>
      {isLoading && (
        <LoaderContainer>
          <Presence present={isLoading}>
            <LoaderAnimation
              aria-busy={isLoading}
              aria-hidden={!isLoading}
              focusable="false"
              role="progressbar"
              viewBox="0 0 20 20"
            >
              <path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" />
            </LoaderAnimation>
          </Presence>
        </LoaderContainer>
      )}
      {!isLoading && (
        <SearchResultsLayout.MainArea ref={widgetRef}>
          <SearchResultsLayout.MainArea>
            {isFetching && (
              <LoaderContainer>
                <Presence present={true}>
                  <LoaderAnimation
                    aria-busy={true}
                    aria-hidden={false}
                    focusable="false"
                    role="progressbar"
                    viewBox="0 0 20 20"
                  >
                    <path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" />
                  </LoaderAnimation>
                </Presence>
              </LoaderContainer>
            )}
            {totalItems > 0 && (
              <>
                <SearchResultsLayout.LeftArea>
                  {selectedFacetsFromApi.length > 0 && (
                    <FiltersStyled.ClearFilters onClick={onClearFilters}>Clear Filters</FiltersStyled.ClearFilters>
                  )}
                  <FiltersStyled.SelectedFiltersList>
                    {selectedFacetsFromApi.map((selectedFacet) => (
                      <FiltersStyled.SelectedFiltersListItem
                        key={`${selectedFacet.facetId}${selectedFacet.facetLabel}${selectedFacet.valueLabel}`}
                      >
                        <FiltersStyled.SelectedFiltersListItemText>
                          {selectedFacet.facetLabel}: {selectedFacet.valueLabel}
                        </FiltersStyled.SelectedFiltersListItemText>
                        <FiltersStyled.SelectedFiltersListItemButton onClick={() => onRemoveFilter(selectedFacet)}>
                          X
                        </FiltersStyled.SelectedFiltersListItemButton>
                      </FiltersStyled.SelectedFiltersListItem>
                    ))}
                  </FiltersStyled.SelectedFiltersList>
                  <AccordionFacetsStyled.Root
                    defaultFacetTypesExpandedList={[]}
                    onFacetTypesExpandedListChange={() => {}}
                    onFacetValueClick={onFacetClick}
                  >
                    {facets.map((f) => (
                      <AccordionFacetsStyled.Facet facetId={f.name} key={f.name}>
                        <AccordionFacetsStyled.Header>
                          <AccordionFacetsStyled.Trigger>{f.label}</AccordionFacetsStyled.Trigger>
                        </AccordionFacetsStyled.Header>
                        <AccordionFacets.Content>
                          <AccordionFacetsStyled.ValueList>
                            {f.value.map((v, index) => (
                              <AccordionFacetsStyled.Item {...{ index, facetValueId: v.id }} key={v.id}>
                                <AccordionFacetsStyled.ItemCheckbox>
                                  <AccordionFacetsStyled.ItemCheckboxIndicator>
                                    <CheckIcon />
                                  </AccordionFacetsStyled.ItemCheckboxIndicator>
                                </AccordionFacetsStyled.ItemCheckbox>
                                <AccordionFacetsStyled.ItemCheckboxLabel>
                                  {v.text} {v.count && `(${v.count})`}
                                </AccordionFacetsStyled.ItemCheckboxLabel>
                              </AccordionFacetsStyled.Item>
                            ))}
                          </AccordionFacetsStyled.ValueList>
                        </AccordionFacets.Content>
                      </AccordionFacetsStyled.Facet>
                    ))}
                  </AccordionFacetsStyled.Root>
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
                      <CardViewSwitcherStyled.Root onValueChange={onToggle} defaultValue={defaultCardView}>
                        <CardViewSwitcherStyled.Item value="grid" aria-label="Grid View">
                          <GridIcon />
                        </CardViewSwitcherStyled.Item>
                        <CardViewSwitcherStyled.Item value="list" aria-label="List View">
                          <ListBulletIcon />
                        </CardViewSwitcherStyled.Item>
                      </CardViewSwitcherStyled.Root>

                      {/* Sort Select */}
                      <SortSelect.Root defaultValue={sortChoices[selectedSortIndex]?.name} onValueChange={onSortChange}>
                        <SortSelectStyled.Trigger>
                          <SortSelectStyled.SelectValue>
                            {selectedSortIndex > -1 ? sortChoices[selectedSortIndex].label : ''}
                          </SortSelectStyled.SelectValue>
                          <SortSelectStyled.Icon />
                        </SortSelectStyled.Trigger>
                        <SortSelectStyled.Content>
                          <SortSelectStyled.Viewport>
                            {sortChoices.map((option: { label: string; name: string }) => (
                              <SortSelectStyled.Option value={option} key={`${option.label}@${language}`}>
                                <SortSelectStyled.OptionText>{option.label}</SortSelectStyled.OptionText>
                              </SortSelectStyled.Option>
                            ))}
                          </SortSelectStyled.Viewport>
                        </SortSelectStyled.Content>
                      </SortSelect.Root>
                    </SearchResultsLayout.Toolbar>
                  </SearchResultsLayout.RightTopArea>

                  {/* Results */}
                  {dir === CardViewSwitcher.CARD_VIEW_GRID ? (
                    <GridStyled>
                      {articles.map((a, index) => (
                        <ArticleCardStyled.Root key={`${a.id}@${a.source_id}@${language}`}>
                          <ArticleCardStyled.ImageWrapper>
                            <ArticleCardStyled.Image src={a.image_url || a.image || DEFAULT_IMAGE} />
                          </ArticleCardStyled.ImageWrapper>
                          <ArticleCardStyled.Title>
                            <ArticleCardStyled.Link
                              title={a.title}
                              to={`/detail/${a.id}`}
                              onClick={(e) => {
                                e.preventDefault();
                                onItemClick({ id: a.id || '', index });
                                navigate(`/detail/${a.id}`);
                              }}
                            >
                              {a.title}
                            </ArticleCardStyled.Link>
                          </ArticleCardStyled.Title>
                          <ArticleCardStyled.Subtitle>
                            <HighlightComponent
                              text={getDescription(a, 'subtitle')}
                              preSeparator={HIGHLIGHT_DATA.pre}
                              postSeparator={HIGHLIGHT_DATA.post}
                              highlightElement={HIGHLIGHT_DATA.highlightTag}
                            />
                          </ArticleCardStyled.Subtitle>
                          <ArticleCardStyled.Type>{a.type ? a.type : 'Unknown'}</ArticleCardStyled.Type>
                        </ArticleCardStyled.Root>
                      ))}
                    </GridStyled>
                  ) : (
                    <RowStyled>
                      {articles.map((a, index) => (
                        <ArticleCardRowStyled.Root key={`${a.id}@${a.source_id}@${language}`}>
                          <ArticleCardRowStyled.Left>
                            <ArticleCardRowStyled.Image src={a.image_url || a.image || DEFAULT_IMAGE} />
                          </ArticleCardRowStyled.Left>
                          <ArticleCardRowStyled.Right>
                            <ArticleCardRowStyled.Title>
                              <ArticleCardRowStyled.Link
                                to={`/detail/${a.id}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  onItemClick({ id: a.id || '', index });
                                  navigate(`/detail/${a.id}`);
                                }}
                              >
                                {a.title}
                              </ArticleCardRowStyled.Link>
                            </ArticleCardRowStyled.Title>
                            <ArticleCardRowStyled.Content>
                              <HighlightComponent
                                text={getDescription(a, 'description')}
                                preSeparator={HIGHLIGHT_DATA.pre}
                                postSeparator={HIGHLIGHT_DATA.post}
                                highlightElement={HIGHLIGHT_DATA.highlightTag}
                              />
                            </ArticleCardRowStyled.Content>
                            <ArticleCardRowStyled.Type>{a.type ? a.type : 'Unknown'}</ArticleCardRowStyled.Type>
                          </ArticleCardRowStyled.Right>
                        </ArticleCardRowStyled.Root>
                      ))}
                    </RowStyled>
                  )}
                  <PageControlsStyled>
                    <div>
                      <label>Results Per Page</label>
                      <Select.Root
                        defaultValue={String(defaultItemsPerPage)}
                        onValueChange={(v) => onResultsPerPageChange({ numItems: Number(v) })}
                      >
                        <SelectStyled.Trigger>
                          <SelectStyled.SelectValue />
                          <SelectStyled.Icon />
                        </SelectStyled.Trigger>
                        <SelectStyled.Content>
                          <SelectStyled.Viewport>
                            <SelectStyled.Option value="24">
                              <SelectStyled.OptionText>24</SelectStyled.OptionText>
                            </SelectStyled.Option>

                            <SelectStyled.Option value="48">
                              <SelectStyled.OptionText>48</SelectStyled.OptionText>
                            </SelectStyled.Option>

                            <SelectStyled.Option value="64">
                              <SelectStyled.OptionText>64</SelectStyled.OptionText>
                            </SelectStyled.Option>
                          </SelectStyled.Viewport>
                        </SelectStyled.Content>
                      </Select.Root>
                    </div>
                    <PaginationStyled.Root
                      currentPage={page}
                      defaultCurrentPage={1}
                      totalPages={totalPages}
                      onPageChange={(v) => onPageNumberChange({ page: v })}
                    >
                      <PaginationStyled.PrevPage onClick={(e) => e.preventDefault()}>
                        <ArrowLeftIcon />
                      </PaginationStyled.PrevPage>
                      <PaginationStyled.Pages>
                        {(pagination) =>
                          Pagination.paginationLayout(pagination, {}).map(({ page, type }) =>
                            type === 'page' ? (
                              <PaginationStyled.Page
                                key={page}
                                aria-label={`Page ${page}`}
                                page={page as number}
                                onClick={(e) => e.preventDefault()}
                              >
                                {page}
                              </PaginationStyled.Page>
                            ) : (
                              <span key={type}>...</span>
                            ),
                          )
                        }
                      </PaginationStyled.Pages>
                      <PaginationStyled.NextPage onClick={(e) => e.preventDefault()}>
                        <ArrowRightIcon />
                      </PaginationStyled.NextPage>
                    </PaginationStyled.Root>
                  </PageControlsStyled>
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
