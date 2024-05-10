/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridIcon, ListBulletIcon } from '@radix-ui/react-icons';

import { CardViewSwitcherStyled } from '../styled';

export interface SearchSortType {
  onToggle: (conf: any) => void;
  defaultCardView: 'list';
}

export const CardViewToggle = ({ onToggle, defaultCardView }: SearchSortType) => {
  return (
    <>
      <CardViewSwitcherStyled.Root onValueChange={onToggle} defaultValue={defaultCardView}>
        <CardViewSwitcherStyled.Item value="grid" aria-label="Grid View">
          <GridIcon />
        </CardViewSwitcherStyled.Item>
        <CardViewSwitcherStyled.Item value="list" aria-label="List View">
          <ListBulletIcon />
        </CardViewSwitcherStyled.Item>
      </CardViewSwitcherStyled.Root>
    </>
  );
};

export default CardViewToggle;
