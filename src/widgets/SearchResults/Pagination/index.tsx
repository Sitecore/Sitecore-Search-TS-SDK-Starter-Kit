/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Pagination, Select } from '@sitecore-search/ui';

import { PageControlsStyled, PaginationStyled, SelectStyled } from '../styled';

export interface SearchPaginationType {
  onResultsPerPageChange: (facet: any) => void;
  defaultItemsPerPage: number;
  onPageNumberChange: (conf: any) => void;
  totalPages: number;
  page: number;
}

const getCurrentPage = (): number => {
  const paginationContainer = document.querySelector('.sc-tagGq');

  if (paginationContainer) {
    const currentPageAnchor = paginationContainer.querySelector('a[data-current="true"]');

    if (currentPageAnchor) {
      return parseInt(currentPageAnchor.getAttribute('data-page') ?? '0', 10);
    }
  }

  return 0;
};

export const SearchPagination = ({
  defaultItemsPerPage,
  onResultsPerPageChange,
  onPageNumberChange,
  totalPages,
  page,
}: SearchPaginationType) => {
  let previousPage = '?page=' + (getCurrentPage() - 1);
  let nextPage = '?page=' + (getCurrentPage() + 1);

  if (getCurrentPage() - 1 <= 0) {
    previousPage = '#';
  }

  if (getCurrentPage() + 1 > totalPages) {
    nextPage = '#';
  }

  return (
    <>
      <PageControlsStyled>
        <div className="perPageControl">
          <label id="results_per_page_label">Results Per Page</label>
          <Select.Root
            defaultValue={String(defaultItemsPerPage)}
            onValueChange={(v) => onResultsPerPageChange({ numItems: Number(v) })}
          >
            <SelectStyled.Trigger aria-labelledby="results_per_page_label">
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
          <PaginationStyled.PrevPage href={previousPage} aria-label="previous page" onClick={(e) => e.preventDefault()}>
            <ChevronLeftIcon />
          </PaginationStyled.PrevPage>
          <PaginationStyled.Pages>
            {(pagination) =>
              Pagination.paginationLayout(pagination, {}).map(({ page, type }) =>
                type === 'page' ? (
                  <PaginationStyled.Page
                    href={'?page=' + page}
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
          <PaginationStyled.NextPage href={nextPage} aria-label="next page" onClick={(e) => e.preventDefault()}>
            <ChevronRightIcon />
          </PaginationStyled.NextPage>
        </PaginationStyled.Root>
      </PageControlsStyled>
    </>
  );
};

export default SearchPagination;
