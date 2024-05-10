import type { NavigateFunction } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

type HighlightModel = {
  description?: Array<string>;
  subtitle?: Array<string>;
  title?: Array<string>;
};

export type ArticleModel = {
  id: string;
  type?: string;
  title: string;
  subtitle?: string;
  url?: string;
  description?: string;
  image_url?: string;
  image?: string;
  source_id?: string;
  highlight?: HighlightModel;
};

export const getDescription = (article: ArticleModel, key: 'description' | 'subtitle' | 'title'): string => {
  if (article?.highlight && article?.highlight[key] && (article.highlight[key] || []).length > 0) {
    return (article.highlight[key] || []).join(' ');
  }
  return article[key] || '';
};

export const HighlightComponent = ({
  text,
  preSeparator,
  postSeparator,
  highlightElement,
}: {
  text: string;
  preSeparator: string;
  postSeparator: string;
  highlightElement: HighlightTag;
}) => {
  const elements = text.split(preSeparator);
  const Highlight = highlightElement;
  if (elements.length > 1) {
    return (
      <div>
        {elements.map((e, index: number) => {
          if (e.includes(postSeparator)) {
            const parts = e.split(postSeparator);
            return (
              <span key={index}>
                <Highlight key={`${index}-${index}`}>{parts[0]}</Highlight> {parts[1]}
              </span>
            );
          } else {
            return <span key={index}>{e}</span>;
          }
        })}
      </div>
    );
  }
  return <>{text}</>; // means that separator is not in the text
};

export const generateQueryString = (baseUrl: string, params: { [key: string]: string }): string => {
  const urlObj = new URL(baseUrl, 'http://dummybase'); // Using a dummy base to handle relative URLs
  const existingParams = new URLSearchParams(urlObj.search);
  // Update existing parameters and add new parameters
  for (const [key, value] of Object.entries(params)) {
    if (!existingParams.has(key)) {
      // Add new parameter
      if (!value) {
        existingParams.delete(key);
      } else {
        existingParams.append(key, value);
      }
    } else {
      // Update existing parameter
      if (!value) {
        existingParams.delete(key);
      } else {
        existingParams.set(key, value);
      }
    }
  }

  // Set the updated search parameters
  urlObj.search = existingParams.toString();

  // Remove the dummy base and return the relative URL
  return urlObj.pathname + urlObj.search + urlObj.hash;
};

export const getQueryParam = (queryString: string, key: string): string | null => {
  const queryParams = new URLSearchParams(queryString.replace('/', ''));
  return queryParams.get(key);
};

export const paramsToObject = (entries: IterableIterator<[string, string]>) => {
  const result = {} as any;
  for (const [key, value] of entries) {
    // each 'entry' is a [key, value] tupple
    result[key] = value;
  }
  return result;
};

export const urlParamsUpdateOnLocaleChange = (router: NavigateFunction, lang: string) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchParamsObject = paramsToObject(queryParams.entries()) as any;
  searchParamsObject.lang = lang;
  // eslint-disable-next-line eqeqeq
  if (searchParamsObject.page != undefined) {
    searchParamsObject.page = '1';
  }
  const updatedRelativeUrl = generateQueryString('/', searchParamsObject);
  router(updatedRelativeUrl);
};

export const urlParamsUpdateOnInputChange = (router: NavigateFunction, text: string) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchParamsObject = paramsToObject(queryParams.entries()) as any;
  searchParamsObject.q = text;
  // eslint-disable-next-line eqeqeq
  if (searchParamsObject.page != undefined) {
    searchParamsObject.page = '1';
  }
  const updatedRelativeUrl = generateQueryString('/', searchParamsObject);
  router(updatedRelativeUrl);
};

export const removeDuplicates = (arr: string[]) => {
  const unique: string[] = [];
  arr.forEach((element: string) => {
    if (!unique.includes(element)) {
      unique.push(element);
    }
  });
  return unique;
};
