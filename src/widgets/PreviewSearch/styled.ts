import styled, { keyframes } from 'styled-components';

import { ArticleCard, NavMenu, theme } from '@sitecore-search/ui';

const NavMenuRootStyled = styled(NavMenu.Root)`
  width: 90%;
  font-family: ${theme.vars.typography?.fontFamilySystem};
  background: var(--sdc-palette-secondary-main);
  margin: auto;
`;

const NavMenuMainListStyled = styled(NavMenu.List)`
  all: unset;
  list-style: none;
  display: flex;
  height: 100%;
  text-align: left;
  &[data-orientation='vertical'] {
    flex-direction: column;
    width: 32%;
    overflow-y: auto;
  }
`;

const NavMenuMainListItemStyled = styled(NavMenu.Item)`
  width: 100%;
`;

const NavMenuGroupListStyled = styled(NavMenuMainListStyled)`
  width: 100%;
`;

const NavMenuMainContentStyled = styled(NavMenu.Content)`
  background: ${theme.vars.palette?.secondary?.main};
  box-shadow: 5px 5px 5px 0 ${theme.vars.palette?.grey?.['400']};
  display: inline-block;
  justify-content: center;
  left: 0;
  height: 450px;
  padding-top: 0;
  position: absolute;
  top: 40px;
  width: 100%;

  @keyframe enterFromLeft {
    from {
      transform: translate3d(-200px, 0, 0);
      opacity: 0;
    }
    to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
  @keyframe enterFromRight {
    from {
      transform: translate3d(200px, 0, 0);
      opacity: 0;
    }
    to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
  @keyframe exitToLeft {
    from {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    to {
      transform: translate3d(-200px, 0, 0);
      opacity: 0;
    }
  }

  @keyframe exitToRight {
    from {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    to {
      transform: translate3d(200px, 0, 0);
      opacity: 0;
    }
  }

  &[data-motion='from-start'] {
    animation: enterFromLeft 250ms ease;
  }
  &[data-motion='from-end'] {
    animation: enterFromRight 250ms ease;
  }

  &[data-motion='to-start'] {
    animation: exitToLeft 250ms ease;
  }
  &[data-motion='to-end'] {
    animation: exitToRight 250ms ease;
  }
`;

const NavMenuSubContentStyled = styled(NavMenu.SubContent)`
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;

  &[data-orientation='vertical'] {
  }
  &[data-orientation='horizontal'] {
    justify-items: center;
    margin-top: -${theme.vars.spacing?.s};
  }

  & > div {
    height: 100%;
  }
`;

const NavMenuTriggerStyled = styled(NavMenu.Trigger)`
  background: none;
  border: 0;
  display: inline-block;
  font-size: ${theme.vars.typography?.fontSize1?.fontSize};
  border-radius: 0;
  padding: ${theme.vars.spacing?.s} ${theme.vars.spacing?.s};
  position: relative;
  width: 100%;
  color: ${theme.vars.palette?.primary?.contrastText};
  text-align: left;
  &[data-state='open'] {
    color: ${theme.vars.palette?.primary?.contrastText};
    background: ${theme.vars.palette?.primary?.main};
  }
  &:focus {
    outline: none;
    font-weight: bold;
    color: ${theme.vars.palette?.primary?.contrastText};
    background: ${theme.vars.palette?.primary?.main};
  }
  &:hover {
    cursor: pointer;
    outline: none;
    font-weight: bold;
    color: ${theme.vars.palette?.primary?.contrastText};
    background: ${theme.vars.palette?.primary?.main};
  }
`;

const NavMenuDefaultTriggerStyled = styled(NavMenu.Trigger)`
  visibility: hidden;
`;

const NavMenuGridStyled = styled(NavMenu.Content)`
  display: inline-block;
  left: 32%;
  width: 68%;
  position: absolute;
  top: 0;
  background: ${theme.vars.palette.primary.main};
  height: 100%;
  overflow-y: auto;
`;

const NavMenuSubListStyled = styled(NavMenu.List)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  list-style: none;
  margin: 0;
  padding: ${theme.vars.spacing?.s};
  gap: ${theme.vars.spacing?.m};
`;

const NavMenuGroupStyled = styled(NavMenu.Item)``;
const NavMenuDefaultGroupStyled = styled(NavMenu.Item)`
  background: none;
  border: 0;
  height: 0;
  overflow: hidden;

  &:focus {
    outline: 1px solid ${theme.vars.palette?.grey?.['400']};
  }
`;

const NavMenuSubItemStyled = styled(NavMenu.Item)`
  display: inline;
`;

const NavMenuInputTriggerStyled = styled(NavMenu.InputTrigger)`
  box-sizing: border-box;
  background: none;
  border: none;
  width: 100%;
  padding: ${theme.vars.spacing?.xs};
  height: 40px;
  outline: none;
  font-size: 24px;
  color: ${theme.vars.palette.primary.contrastText};
`;

const NavMenuLinkStyled = styled(NavMenu.Link)`
  color: ${theme.vars.palette?.primary?.main};
  display: inline-block;
  box-sizing: border-box;
  text-decoration: none;
  width: 100%;
  &:focus {
    border-radius: 8px;
    border: 1px solid ${theme.vars.palette?.grey?.['400']};
  }
`;

export const NavMenuStyled = {
  Root: NavMenuRootStyled,
  MainList: NavMenuMainListStyled,
  MainListItem: NavMenuMainListItemStyled,
  GroupList: NavMenuGroupListStyled,
  MainContent: NavMenuMainContentStyled,
  SubContent: NavMenuSubContentStyled,
  Trigger: NavMenuTriggerStyled,
  DefaultTrigger: NavMenuDefaultTriggerStyled,
  Grid: NavMenuGridStyled,
  SubList: NavMenuSubListStyled,
  SubItem: NavMenuSubItemStyled,
  InputTrigger: NavMenuInputTriggerStyled,
  Group: NavMenuGroupStyled,
  DefaultGroup: NavMenuDefaultGroupStyled,
  Link: NavMenuLinkStyled,
};

export const SearchGroupHeadingStyled = styled.h2`
  box-sizing: border-box;
  padding-left: ${theme.vars.spacing?.s};
  color: ${theme.vars.palette.primary.contrastText};
`;

const ArticleRootStyled = styled(ArticleCard.Root)`
  padding: ${theme.vars.spacing?.m};
  cursor: pointer;
  display: block;
  border: solid 1px transparent;
  text-align: center;
  height: 140px;
  &:focus-within {
    border: 1px solid ${theme.vars.palette?.primary?.main};
  }
  &:hover {
    border: 1px solid ${theme.vars.palette?.primary?.main};
  }
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
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ArticleNameStyled = styled(ArticleCard.Title)`
  max-height: 40px;
  overflow: hidden;
  margin: 0 0 ${theme.vars.spacing?.m};
  color: ${theme.vars.palette?.primary?.contrastText};
  font-family: ${theme.vars.typography?.fontFamilySystem};
  font-size: 13px;
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

export const LoaderContainer = styled.div`
  align-items: center;
  display: flex;
  min-height: 50vh;
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
  fill: ${theme.vars.palette?.primary?.main};
  height: 50px;
  margin: auto;
  width: 50px;
`;
