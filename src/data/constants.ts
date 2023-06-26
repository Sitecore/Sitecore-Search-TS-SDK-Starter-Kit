import type { HighlightTag } from './types';

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
