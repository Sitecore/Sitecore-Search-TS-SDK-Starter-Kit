/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckIcon } from '@radix-ui/react-icons';
import type { SearchResponseFacet } from '@sitecore-search/react';
import { AccordionFacets } from '@sitecore-search/ui';
import { useEffect, useState } from 'react';
import type { SelectedFacets } from '../Facets';
import { AccordionFacetsStyled } from '../styled';
export interface FacetListType {
  facet: SearchResponseFacet;
  selectedFacetsToRender: SelectedFacets[];
  facetsnumbertoshow: number;
}

export const FacetList = ({ selectedFacetsToRender, facet, facetsnumbertoshow }: FacetListType) => {
  const isSelected = (facetID: string, facetValue: string) => {
    return (
      selectedFacetsToRender.filter(
        (x) => x.id === facetID && x.values.map((q) => q.id).includes(facetValue)
      ).length > 0
    );
  };

  const minNumberOfItemsToShow = facetsnumbertoshow ?? 5;
  const totalItems = facet.value.length;
  const [keyword, setKeyword] = useState('');
  const [filteredItems, setFilteredItems] = useState(facet.value);
  const [numberOfItemsToShow, setNumberOfItemsToShow] = useState(minNumberOfItemsToShow);

  useEffect(() => {
    // This will be called whenever parentProp changes (i.e., when the parent component rerenders)
    setFilteredItems(facet.value);
  }, [facet.value]);

  const handleInputChange = (event: { target: { value: string } }) => {
    const inputKeyword = event.target.value.toLowerCase();
    setKeyword(inputKeyword);

    // Filter the array based on the input keyword
    const updatedItems = facet.value.filter((item) =>
      item.text.toLowerCase().includes(inputKeyword)
    );
    setFilteredItems(updatedItems);
  };

  const handleShowMore = () => {
    setNumberOfItemsToShow((prevVisibleItems) => prevVisibleItems + minNumberOfItemsToShow);
  };

  const handleShowLess = () => {
    setNumberOfItemsToShow((prevVisibleItems) =>
      Math.max(prevVisibleItems - minNumberOfItemsToShow, minNumberOfItemsToShow)
    );
  };

  return (
    <>
      <AccordionFacetsStyled.Facet facetId={facet.name} key={facet.name}>
        <AccordionFacetsStyled.Header>
          <AccordionFacetsStyled.Trigger>{facet.label}</AccordionFacetsStyled.Trigger>
        </AccordionFacetsStyled.Header>
        <AccordionFacets.Content>
          <div className="input_wrap">
            <input
              name={facet.name}
              placeholder="Type to filter..."
              id={facet.name}
              type="text"
              value={keyword}
              onChange={handleInputChange}
            />
          </div>
          <AccordionFacetsStyled.ValueList>
            {filteredItems.slice(0, numberOfItemsToShow).map((v, index) => (
              <AccordionFacetsStyled.Item
                selected={isSelected(facet.name, v.id)}
                {...{ index, facetValueId: v.id }}
                key={v.id}
              >
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

          {filteredItems.length > minNumberOfItemsToShow && (
            <div className="retractable-actions">
              {numberOfItemsToShow < totalItems && (
                <a
                  href="#"
                  className="retractable-toggle"
                  onClick={(e) => {
                    e.preventDefault();
                    handleShowMore();
                  }}
                >
                  Show More{' '}
                </a>
              )}
              <br />
              {numberOfItemsToShow > minNumberOfItemsToShow && (
                <a
                  href="#"
                  className="retractable-toggle"
                  onClick={(e) => {
                    e.preventDefault();
                    handleShowLess();
                  }}
                >
                  {' '}
                  Show Less
                </a>
              )}
            </div>
          )}
        </AccordionFacets.Content>
      </AccordionFacetsStyled.Facet>
    </>
  );
};

export default FacetList;
