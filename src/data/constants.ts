export const DEFAULT_IMAGE =
  'https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/global/temp/doc.svg?md=20201209T175156Z';

export const HIGHLIGHT_DATA: {
  pre: string;
  post: string;
  highlightTag: HighlightTag;
} = {
  pre: '<b>',
  post: '</b>',
  highlightTag: 'b',
};

export const BASE_PATH = import.meta.env.VITE_SEARCH_PATH || '';
export const PAGE_EVENTS_DEFAULT = 'page';
export const PAGE_EVENTS_HOME = 'home';
export const PAGE_EVENTS_PDP = 'pdp';
export const PAGE_EVENTS_SEARCH = 'search';
export const ENTITY_CONTENT = 'content';
