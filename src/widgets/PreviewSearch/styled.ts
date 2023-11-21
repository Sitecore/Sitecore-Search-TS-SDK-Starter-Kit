import styled, { keyframes } from 'styled-components';

import { ArticleCard, PreviewSearch, theme } from '@sitecore-search/ui';

export const PreviewSearchInput = styled(PreviewSearch.Input)`
  box-sizing: border-box;
  background: none;
  border: none;
  padding: var(--sdc-spacing-xs);
  height: 40px;
  outline: none;
  font-size: 24px;
  color: var(--sdc-palette-primary-contrastText);
  width: 90%;
  font-family: var(--sdc-typography-fontFamilySystem);
  background: var(--sdc-palette-secondary-main);
  margin: auto;
`;

export const PreviewSearchContent = styled(PreviewSearch.Content)`
  animation-duration: 500ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  width: var(--radix-popover-trigger-width);
  max-height: var(--radix-popover-content-available-height);
  display: flex;
  justify-content: center;
  height: 400px;
  padding-top: 0;
  font-family: ${theme.vars.typography.fontFamilySystem};

  @keyframes slide-up-and-fade {
    from {
      opacity: 0;
      transform: translateY(2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slide-right-and-fade {
    from {
      opacity: 0;
      transform: translateX(-2px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slide-down-and-fade {
    from {
      opacity: 0;
      transform: translateY(-2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slide-left-and-fade {
    from {
      opacity: 0;
      transform: translateX(2px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &[data-state='open'][data-side='top'] {
    animation-name: slide-down-and-fade;
  }

  &[data-state='open'][data-side='right'] {
    animation-name: slide-left-and-fade;
  }

  &[data-state='open'][data-side='bottom'] {
    animation-name: slide-up-and-fade;
  }

  &[data-state='open'][data-side='left'] {
    animation-name: slide-right-and-fade;
  }
`;

const PreviewSearchSuggestions = styled(PreviewSearch.Suggestions)`
  display: block;
  box-sizing: border-box;
  list-style: none;
  width: 16rem;
  font-size: ${theme.vars.typography.fontSize1.fontSize};
  background: var(--sdc-palette-primary-suggestionsBackground);
  text-align: left;
`;

const PreviewSearchSuggestionItem = styled(PreviewSearch.SuggestionItem)`
  padding: ${theme.vars.spacing.s} ${theme.vars.spacing.s};

  &:focus,
  &:hover {
    outline: none;
    font-weight: bold;
    color: ${theme.vars.palette.primary.main};
    background: var(--sdc-palette-primary-main);
  }
`;

const PreviewSearchSuggestionTrigger = styled(PreviewSearch.SuggestionTrigger)`
  cursor: pointer;
  padding: ${theme.vars.spacing.s} ${theme.vars.spacing.s};
  color: ${theme.vars.palette.primary.contrastText};
  &[data-state='active'],
  &:focus,
  &:hover {
    outline: none;
    font-weight: bold;
    color: ${theme.vars.palette.primary.contrastText};
    background: ${theme.vars.palette.primary.main};
  }
`;

const PreviewSearchSuggestionsGroup = styled(PreviewSearch.SuggestionsGroup)`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PreviewSearchLink = styled.a`
  color: ${theme.vars.palette.primary.contrastText};
  display: inline;
  box-sizing: border-box;
  text-decoration: none;
  width: 100%;
`;

const PreviewSearchItems = styled(PreviewSearch.Items)`
  flex: 3;
  overflow-y: auto;
  display: flex;
  background: var(--sdc-palette-secondary-main);
  &[data-loading='false'] {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    list-style: none;
    margin: 0;
    padding: ${theme.vars.spacing.s};
    gap: ${theme.vars.spacing.m};
  }
`;

const PreviewSearchRoot = styled(PreviewSearch.Root)``;
const PreviewSearchItem = styled(PreviewSearch.Item)``;

export const PreviewSearchStyled = {
  Root: PreviewSearchRoot,
  Input: PreviewSearchInput,
  Content: PreviewSearchContent,
  Items: PreviewSearchItems,
  Item: PreviewSearchItem,
  Suggestions: PreviewSearchSuggestions,
  SuggestionsGroup: PreviewSearchSuggestionsGroup,
  SuggestionItem: PreviewSearchSuggestionItem,
  SuggestionTrigger: PreviewSearchSuggestionTrigger,
  Link: PreviewSearchLink,
};

const ArticleRootStyled = styled(ArticleCard.Root)`
  padding: ${theme.vars.spacing?.s};
  cursor: pointer;
  display: block;
  border: solid 1px transparent;
  text-align: center;
`;

const ArticleImageStyled = styled(ArticleCard.Image)`
  display: block;
  width: auto;
  max-width: 100%;
  height: auto;
  max-height: 100%;
`;

const ArticleImageWrapperStyled = styled.div`
  margin: auto auto 10px;
  position: relative;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ArticleNameStyled = styled(ArticleCard.Title)`
  max-height: 2rem;
  overflow: hidden;
  margin: 0 0 ${theme.vars.spacing?.m};
  font-family: ${theme.vars.typography?.fontFamilySystem};
  font-size: 0.8rem;
  font-weight: ${theme.vars.typography?.fontSize4?.fontWeight};
`;

const ArticleContentStyled = styled(ArticleCard.Content)`
  margin: 0;
  font-family: ${theme.vars.typography?.fontFamilySystem};
  font-size: ${theme.vars.typography?.fontSize1?.fontSize};
  font-weight: ${theme.vars.typography?.fontWeight};
  line-height: ${theme.vars.typography?.lineHeight};
  color: ${theme.vars.palette?.primary?.main};
`;

const ArticleLinkStyled = styled.a`
  text-decoration: none;
  color: ${theme.vars.palette?.primary?.main};
  font-size: ${theme.vars.typography?.fontSize4?.fontSize};

  &:hover {
    text-decoration: none;
  }

  &:focus {
    text-decoration: none;
  }
`;

export const ArticleCardStyled = {
  Root: ArticleRootStyled,
  Link: ArticleLinkStyled,
  Content: ArticleContentStyled,
  ImageWrapper: ArticleImageWrapperStyled,
  Image: ArticleImageStyled,
  Name: ArticleNameStyled,
};

// misc
export const LoaderContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
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

export const SearchGroupHeadingStyled = styled.h2`
  box-sizing: border-box;
  padding-left: ${theme.vars.spacing.s};
  color: ${theme.vars.palette.primary.contrastText};
`;
