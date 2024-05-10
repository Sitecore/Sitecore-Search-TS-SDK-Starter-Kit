/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { SearchResponseFacet} from '@sitecore-search/react';
import { useSearchResultsQuery } from '@sitecore-search/react';
import FacetList from './FacetList';
import { AccordionFacetsStyled, FiltersStyled } from '../styled';
export interface SearchFacetsType {
  onFacetClick: (facet: any) => void;
  onFilterClick: (conf: any) => void;
  onClearFilters: (conf: any) => void;
  clearfiltersText: string;
  facetsnumbertoshow: number;
  facets: SearchResponseFacet[];
}

export type SelectedFacets = {
  id: string;
  name: string;
  values: {
    id: string;
    text: string;
  }[];
};

export const SearchFacets = (props: SearchFacetsType) => {
  const reqObject = useSearchResultsQuery().getRequest();
  const requestedFacets = reqObject.getSearchFacet();
  const selectedFacetsToRender: SelectedFacets[] = [];

  if (props.facets != null && props.facets.length > 0 && requestedFacets.types) {
    for (const type of requestedFacets.types.filter((x) => x.filter?.values)) {
      let selectedFacets: any[];
      const facetObj = props.facets.filter((x) => x.name === type.name);
      if (facetObj) {
        if (type.filter && type.filter.values) {
          selectedFacets = facetObj[0].value.filter((x) => type?.filter?.values.includes(x.id));
          const facet: SelectedFacets = {
            id: facetObj[0].name,
            name: facetObj[0].label,
            values: selectedFacets,
          };

          selectedFacetsToRender.push(facet);
        }
      }
    }
  }

  const getClearFilterText = (s1: string, s2: string) => `clear ${s1}: ${s2}`;

  return (
    <>
      {selectedFacetsToRender.length > 0 && (
        <FiltersStyled.ClearFilters onClick={props.onClearFilters}>
          {props.clearfiltersText}
        </FiltersStyled.ClearFilters>
      )}
      <FiltersStyled.SelectedFiltersList>
        {selectedFacetsToRender.map((selectedFacet) =>
          selectedFacet.values.map((v) => (
            <FiltersStyled.SelectedFiltersListItem key={`${selectedFacet.id}@${v.id}`}>
              <FiltersStyled.SelectedFiltersListItemText>
                {selectedFacet.name}: {v.text}
              </FiltersStyled.SelectedFiltersListItemText>
              <FiltersStyled.SelectedFiltersListItemButton
                onClick={() =>
                  props.onFilterClick({
                    facetId: selectedFacet.id,
                    facetValueId: v.id,
                    checked: false,
                  })
                }
              >
                X <span className="sr-only">{getClearFilterText(selectedFacet.name, v.text)}</span>
              </FiltersStyled.SelectedFiltersListItemButton>
            </FiltersStyled.SelectedFiltersListItem>
          ))
        )}
      </FiltersStyled.SelectedFiltersList>
      <AccordionFacetsStyled.Root
        defaultFacetTypesExpandedList={[]}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onFacetTypesExpandedListChange={() => {}}
        onFacetValueClick={props.onFacetClick}
      >
        {props.facets.map((f, index) => (
          <FacetList
            key={index}
            facet={f}
            selectedFacetsToRender={selectedFacetsToRender}
            facetsnumbertoshow={props.facetsnumbertoshow}
          />
        ))}
      </AccordionFacetsStyled.Root>
    </>
  );
};

export default SearchFacets;
