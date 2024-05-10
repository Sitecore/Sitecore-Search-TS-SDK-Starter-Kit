/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SearchResponseSortChoice } from '@sitecore-search/react';
import { SortSelect } from '@sitecore-search/ui';

import { SortSelectStyled } from '../styled';

export interface SearchSortType {
  onSortChange: (conf: any) => void;
  language: string;
  sortChoices: SearchResponseSortChoice[];
  selectedSortIndex: number;
}

export const SearchSort = ({ onSortChange, language, selectedSortIndex, sortChoices }: SearchSortType) => {
  const show = true;
  return show ? (
    <>
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
    </>
  ) : (
    <></>
  );
};

export default SearchSort;
