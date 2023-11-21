import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import {
  AccordionFacets,
  ArticleCard,
  CardViewSwitcher,
  FacetItem,
  Pagination, SearchResultsAccordionFacets,
  Select,
  SortSelect,
  theme
} from "@sitecore-search/ui";

const ArticleCardRowRootStyled = styled(ArticleCard.Root)`
  box-sizing: border-box;
  border: solid 1px ${theme.vars.palette.grey['400']};
  display: flex;
  height: 230px;
  width: 100%;
  margin-bottom: ${theme.vars.spacing.m};
  cursor: pointer;
  &:focus-within {
    & img {
      transform: scale(1.25);
    }
  }
  &:hover {
    & img {
      transform: scale(1.25);
    }
  }
`;

const ArticleCardRowLeftStyled = styled.div`
  position: relative;
  height: 100%;
  width: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const ArticleCardRowRightStyled = styled.div`
  box-sizing: border-box;
  padding: ${theme.vars.spacing.m};
  overflow: hidden;
  width: 65%;
  text-align: left;
`;

const ArticleCardRowImageStyled = styled(ArticleCard.Image)`
  display: block;
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  transform-origin: 50% 50%;
  transition: transform 0.7s, visibility 0.7s ease-in;
`;

const ArticleCardRowTitleStyled = styled(ArticleCard.Title)`
  margin: 0 0 ${theme.vars.spacing.m};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize4.fontSize};
  font-weight: ${theme.vars.typography.fontSize4.fontWeight};
  line-height: ${theme.vars.typography.fontSize4.lineHeight};
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ArticleCardRowContentStyled = styled(ArticleCard.Content)`
  margin: 0;
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize2.fontSize};
  line-height: ${theme.vars.typography.lineHeight};
  color: ${theme.vars.palette.primary.contrastText};
  height: 100px;
  overflow: hidden;
`;

const ArticleCardRowTypeStyled = styled(ArticleCard.Id)`
  border-top: solid 1px ${theme.vars.palette.grey['400']};
  margin-top: ${theme.vars.spacing.m};
  padding-top: ${theme.vars.spacing.m};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize2.fontSize};
  color: ${theme.vars.palette.primary.contrastText};
  font-weight: bold;
`;

const ArticleCardRowLinkStyled = styled(Link)`
  text-decoration: none;
  color: ${theme.vars.palette.primary.contrastText};
  font-size: ${theme.vars.typography.fontSize4.fontSize};
  &:hover {
    text-decoration: none;
  }
  &:focus {
    text-decoration: none;
  }
`;

export const ArticleCardRowStyled = {
  Link: ArticleCardRowLinkStyled,
  Type: ArticleCardRowTypeStyled,
  Content: ArticleCardRowContentStyled,
  Image: ArticleCardRowImageStyled,
  Title: ArticleCardRowTitleStyled,
  Root: ArticleCardRowRootStyled,
  Left: ArticleCardRowLeftStyled,
  Right: ArticleCardRowRightStyled,
};

const CardViewSwitcherRoot = styled(CardViewSwitcher.Root)`
  display: inline-flex;
  background-color: ${theme.vars.palette.primary.main};
  margin: ${theme.vars.spacing.s};
`;

const CardViewSwitcherItem = styled(CardViewSwitcher.Item)`
  all: unset;
  align-items: center;
  color: ${theme.vars.palette.grey[500]};
  display: flex;
  height: 30px;
  justify-content: center;
  margin-left: ${theme.vars.spacing.s};
  width: 30px;
  border-radius: 4px;
  cursor: pointer;
  border: solid 1px ${theme.vars.palette.primary.main};
  &:first-child {
    margin-left: 0;
  }

  &:hover {
    background-color: ${theme.vars.palette.secondary.main};
    border: solid 1px ${theme.vars.palette.secondary.main};
    color: ${theme.vars.palette.primary.contrastText};
  }
  &[data-state='on'] {
    background-color: ${theme.vars.palette.secondary.main};
    color: ${theme.vars.palette.primary.contrastText};
    border: solid 1px ${theme.vars.palette.secondary.main};
  }

  &:focus {
    position: relative;
    border: solid 1px ${theme.vars.palette.secondary.main};
  }
`;

export const CardViewSwitcherStyled = {
  Root: CardViewSwitcherRoot,
  Item: CardViewSwitcherItem,
};

export const RowStyled = styled.div`
  width: 100%;
  display: block;
`;

const selectTriggerStyle = `
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: ${theme.vars.spacing.xs};
  background-color: transparent;
  height: 40px;
  padding: ${theme.vars.spacing.xs} ${theme.vars.spacing.m};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
  color: ${theme.vars.palette.primary.contrastText};
  border-radius: 4px;
  border: 1px solid hsl(0, 0%, 80%);
 
  &:focus {
    outline: none;
  }
`;

const SortSelectTriggerStyled = styled(SortSelect.Trigger)`
  ${selectTriggerStyle}
`;

const GenericSelectTriggerStyled = styled(Select.Trigger)`
  margin-left: ${theme.vars.spacing.m};
  ${selectTriggerStyle}
`;

const contentSelectStyle = `
  background-color: ${theme.vars.palette.primary.main};
  overflow: hidden;
  color: ${theme.vars.palette.primary.contrastText};
  border-radius: 4px;
  border: 1px solid hsl(0, 0%, 80%);
  position: absolute;
  top: 40px;
  width: 100%;
  z-index: 5001;
`;

const SortSelectContentStyled = styled(SortSelect.Content)`
  ${contentSelectStyle}
`;

const GenericSelectContentStyled = styled(Select.SelectContent)`
  ${contentSelectStyle}
`;

const viewportSelectStyles = `
  padding: ${theme.vars.spacing.xs};
  z-index: 50000;
`;

const SortSelectViewportStyled = styled(SortSelect.Viewport)`
  ${viewportSelectStyles}
`;

const GenericSelectViewportStyled = styled(Select.Viewport)`
  ${viewportSelectStyles}
`;

const optionSelectStyles = `
  display: flex;
  align-items: center;
  line-height: 1;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  height: 40px;
  padding: 0 ${theme.vars.spacing.m};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
  color: ${theme.vars.palette.primary.contrastText};
  position: relative;
  outline: none;
  &[data-highlighted] {
    border-radius: 0;
    background-color: ${theme.vars.palette.primary.contrastText};
    color: ${theme.vars.palette.primary.main};
  }
  &[data-disabled] {
    color: ${theme.vars.palette.grey['800']};
    font-style: italic;
  }
`;

const SortSelectOptionStyled = styled(SortSelect.Option)`
  ${optionSelectStyles}
`;

const GenericSelectOptionStyled = styled(Select.SelectItem)`
  ${optionSelectStyles}
`;

const SortSelectValueStyled = styled(SortSelect.SelectValue)`
  color: ${theme.vars.palette.primary.contrastText};
`;

const GenericSelectValueStyled = styled(Select.SelectValue)`
  color: ${theme.vars.palette.primary.contrastText};
`;

const SortSelectIconStyled = styled(SortSelect.Icon)``;

const GenericSelectIconStyled = styled(Select.Icon)``;

const SortSelectRootStyled = styled(SortSelect.Root)``;
const GenericSelectRootStyled = styled(Select.Root)``;

const SortSelectOptionTextStyled = styled(SortSelect.OptionText)``;
const GenericSelectOptionTextStyled = styled(SortSelect.OptionText)``;

export const SortSelectStyled = {
  Trigger: SortSelectTriggerStyled,
  Content: SortSelectContentStyled,
  Viewport: SortSelectViewportStyled,
  Option: SortSelectOptionStyled,
  SelectValue: SortSelectValueStyled,
  Root: SortSelectRootStyled,
  OptionText: SortSelectOptionTextStyled,
  Icon: SortSelectIconStyled,
};

export const SelectStyled = {
  Root: GenericSelectRootStyled,
  Trigger: GenericSelectTriggerStyled,
  Icon: GenericSelectIconStyled,
  SelectValue: GenericSelectValueStyled,
  Content: GenericSelectContentStyled,
  Viewport: GenericSelectViewportStyled,
  Option: GenericSelectOptionStyled,
  OptionText: GenericSelectOptionTextStyled,
};

const ArticleRootStyled = styled(ArticleCard.Root)`
  border: solid 1px ${theme.vars.palette.grey['400']};
  cursor: pointer;
  display: inline-block;
  height: 350px;
  width: 100%;
  overflow: hidden;
  text-align: left;
  position: relative;
  &:focus-within {
    & img {
      transform: scale(1.25);
    }
  }
  &:hover {
    & img {
      transform: scale(1.25);
    }
  }
`;

const ArticleImageStyled = styled(ArticleCard.Image)`
  display: block;
  width: 100%;
  height: auto;
  max-height: 100%;
  transform-origin: 50% 50%;
  transition: transform 0.7s, visibility 0.7s ease-in;
`;

const ImageWrapperStyled = styled.div`
  margin: auto auto 10px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: normal;
  overflow: hidden;
  height: 150px;
`;

const ArticleTitleStyled = styled(ArticleCard.Title)`
  margin: 0 ${theme.vars.spacing.s} 0 ${theme.vars.spacing.s};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize4.fontSize};
  font-weight: ${theme.vars.typography.fontSize4.fontWeight};
  line-height: ${theme.vars.typography.fontSize4.lineHeight};
  text-align: left;
  height: 40px;
  overflow: hidden;
`;

const ArticleSubtitleStyled = styled(ArticleCard.Content)`
  margin: 0 ${theme.vars.spacing.xs} 0 ${theme.vars.spacing.xs};
  padding: 0 ${theme.vars.spacing.xs} 0 ${theme.vars.spacing.xs};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
  line-height: ${theme.vars.typography.lineHeight};
  color: ${theme.vars.palette.primary.contrastText};
  height: 100px;
  overflow: hidden;
`;

const ArticleTypeStyled = styled.div`
  margin: auto;
  margin-top: ${theme.vars.spacing.m};
  border-top: 1px solid ${theme.vars.palette.grey[400]};
  padding-top: ${theme.vars.spacing.s};
  width: 90%;
  font-family: ${theme.vars.typography.fontFamilySystem};
  color: ${theme.vars.palette.primary.contrastText};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
`;

const ArticleLinkStyled = styled(Link)`
  text-decoration: none;
  color: ${theme.vars.palette.primary.contrastText};
  font-size: ${theme.vars.typography.fontSize4.fontSize};
  &:hover {
    text-decoration: none;
  }
  &:focus {
    text-decoration: none;
  }
`;

export const ArticleCardStyled = {
  Link: ArticleLinkStyled,
  Type: ArticleTypeStyled,
  Subtitle: ArticleSubtitleStyled,
  ImageWrapper: ImageWrapperStyled,
  Image: ArticleImageStyled,
  Title: ArticleTitleStyled,
  Root: ArticleRootStyled,
};

const AccordionItemCheckboxStyled = styled(AccordionFacets.ItemCheckbox)`
  all: unset;
  background-color: white;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  &[data-state='checked'] {
    color: ${theme.vars.palette.primary.contrastText};
    background-color: ${theme.vars.palette.primary.main};
  }

  &:focus {
    border: solid 1px ${theme.vars.palette.grey['900']};
  }
`;

const AccordionItemToggleStyled = styled(AccordionFacets.ItemToggle)`
  all: unset;
  width: 40px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.vars.typography.fontSize1.fontSize};
  margin-right: ${theme.vars.spacing.s};

  &:focus {
    border: solid 1px ${theme.vars.palette.grey['900']};
  }

  &[data-state='on'] {
    background-color: ${theme.vars.palette.primary.main};
    color: ${theme.vars.palette.primary.contrastText};
  }
`;

const AccordionItemCheckboxIndicatorStyled = styled(AccordionFacets.ItemCheckboxIndicator)`
  color: ${theme.vars.palette.primary.contrastText};
  width: 15px;
  height: 15px;
`;

const AccordionValueListStyled = styled(AccordionFacets.ValueList)`
  list-style: none;
  li {
    padding: ${theme.vars.spacing.xs} 0;
    font-family: ${theme.vars.typography.fontFamilySystem};
    font-size: ${theme.vars.typography.fontSize1.fontSize};
  }

  &[data-orientation='horizontal'] {
    display: flex;
    flex-direction: row;
  }
`;

const AccordionItemCheckboxLabelStyled = styled(AccordionFacets.ItemLabel)`
  padding-left: ${theme.vars.spacing.xs};
  color: ${theme.vars.palette.primary.contrastText};
`;

const AccordionItemStyled = styled(FacetItem)`
  display: flex;
  align-items: center;
`;

const AccordionHeaderStyled = styled(AccordionFacets.Header)`
  display: flex;
  margin-top: ${theme.vars.spacing.s};
  margin-bottom: ${theme.vars.spacing.s};
  color: ${theme.vars.palette.primary.contrastText};
`;
const AccordionTriggerStyled = styled(AccordionFacets.Trigger)`
  align-items: center;
  display: flex;
  font-size: ${theme.vars.typography.fontSize2.fontSize};
  height: 45px;
  justify-content: space-between;
  line-height: 1;
  padding: 0 ${theme.vars.spacing.m};
  flex: 1 1 0;
  background: none;
  border: none;
  color: ${theme.vars.palette.primary.contrastText};
  &[data-state='open'] svg {
    transform: rotate(180deg);
  }
`;

const AccordionIconStyled = styled(ChevronDownIcon)`
  color: ${theme.vars.palette.primary.contrastText};
  transition: transform 300ms cubic-bezier(0.87, 0, 0.13, 1);
`;

const AccordionFacetsFacetStyled = styled(AccordionFacets.Facet)`
  border-bottom: solid 1px ${theme.vars.palette.grey['400']};
`;

const AccordionFacetsRootStyled = styled(SearchResultsAccordionFacets)``;

export const AccordionFacetsStyled = {
  Trigger: AccordionTriggerStyled,
  Header: AccordionHeaderStyled,
  Item: AccordionItemStyled,
  Icon: AccordionIconStyled,
  ItemCheckboxLabel: AccordionItemCheckboxLabelStyled,
  ValueList: AccordionValueListStyled,
  ItemCheckboxIndicator: AccordionItemCheckboxIndicatorStyled,
  ItemToggle: AccordionItemToggleStyled,
  ItemCheckbox: AccordionItemCheckboxStyled,
  Facet: AccordionFacetsFacetStyled,
  Root: AccordionFacetsRootStyled,
};

const paginationLinkStyle = `
  cursor: pointer;
  color: ${theme.vars.palette.primary.contrastText};
  padding: ${theme.vars.spacing.s};
  border-radius: 4px;
  &[data-current='true'] {
    color: ${theme.vars.palette.primary.main};
    background: ${theme.vars.palette.primary.contrastText};
    pointer-events: none;
    text-decoration-line: none;
  }
`;

const paginationNavigationLinkStyle = `
  ${paginationLinkStyle}
  &[data-current='true'] {
    display: none;
  }
`;

const PaginationRootStyled = styled(Pagination.Root)`
  color: ${theme.vars.palette.primary.main};
  font-family: ${theme.vars.typography.fontFamilySystem};
  margin-top: ${theme.vars.spacing.m};
`;
const PaginationPrevPageStyled = styled(Pagination.PrevPage)`
  display: inline;
  ${paginationNavigationLinkStyle}
`;
const PaginationNextPageStyled = styled(Pagination.NextPage)`
  display: inline;
  ${paginationNavigationLinkStyle}
`;
const PaginationFirstPageStyled = styled(Pagination.FirstPage)`
  font-size: ${theme.vars.typography.fontSize2.fontSize};
  ${paginationNavigationLinkStyle}
`;
const PaginationLastPageStyled = styled(Pagination.LastPage)`
  font-size: ${theme.vars.typography.fontSize2.fontSize};
  ${paginationLinkStyle}
`;
const PaginationPageStyled = styled(Pagination.Page)`
  cursor: pointer;
  ${paginationLinkStyle}
`;
const PaginationPagesStyled = styled(Pagination.Pages)`
  display: inline;
`;

export const PaginationStyled = {
  Root: PaginationRootStyled,
  PrevPage: PaginationPrevPageStyled,
  NextPage: PaginationNextPageStyled,
  FirstPage: PaginationFirstPageStyled,
  LastPage: PaginationLastPageStyled,
  Page: PaginationPageStyled,
  Pages: PaginationPagesStyled,
};

const MainArea = styled.div`
  display: flex;
  max-width: 100%;
  position: relative;
`;

const LeftArea = styled.section`
  position: relative;
  flex: 1 1;
  margin-right: ${theme.vars.spacing.l};
  text-align: left;
`;

const RightArea = styled.section`
  display: flex;
  flex-direction: column;
  flex: 4 1;
`;

const RightTopArea = styled.section`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.vars.spacing.s};
`;

export const GridStyled = styled.div`
  width: 100%;
  display: grid;
  grid-gap: ${theme.vars.spacing.m};
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-flow: row;
`;

const ClearFilters = styled.button`
  background: none;
  border: none;
  color: ${theme.vars.palette.primary.contrastText};
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const SelectedFiltersList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: ${theme.vars.spacing.s};
`;

const SelectedFiltersListItem = styled.li`
  display: flex;
  justify-content: space-between;
  color: ${theme.vars.palette.primary.contrastText};
  padding: ${theme.vars.spacing.xs} 0 ${theme.vars.spacing.xs} 0;
`;

const SelectedFiltersListItemText = styled.span`
  color: ${theme.vars.palette.primary.main};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
  color: ${theme.vars.palette.primary.contrastText};
`;

const SelectedFiltersListItemButton = styled.button`
  background: none;
  border: none;
  color: ${theme.vars.palette.primary.main};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
  color: ${theme.vars.palette.primary.contrastText};
  cursor: pointer;
`;

export const PageControlsStyled = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
  margin-top: ${theme.vars.spacing.m};

  label {
    color: ${theme.vars.palette.primary.contrastText};
  }
`;

export const QuerySummaryStyled = styled.div`
  color: ${theme.vars.palette.primary.contrastText};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
  font-weight: bold;
  margin: auto 0;
`;

export const LoaderContainer = styled.div`
  align-items: center;
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  height: 100%;
  background-color: ${theme.vars.palette.primary.main};
  opacity: 0.5;
  z-index: 100;
`;

const Rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoaderAnimation = styled.svg`
  animation: ${Rotate} 2s linear infinite;
  display: block;
  fill: ${theme.vars.palette.primary.main};
  height: 50px;
  margin: auto;
  width: 50px;
`;

export const FiltersStyled = {
  ClearFilters,
  SelectedFiltersList,
  SelectedFiltersListItem,
  SelectedFiltersListItemText,
  SelectedFiltersListItemButton,
};

const ToolbarStyled = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const SearchResultsLayout = {
  MainArea,
  LeftArea,
  RightArea,
  RightTopArea,
  Toolbar: ToolbarStyled,
};
