import { Presence } from '@sitecore-search/ui';

import { LoaderAnimation, LoaderContainer } from '../styled';

export interface SearchSortType {
  isLoading: boolean;
}

export const Loader = ({ isLoading }: SearchSortType) => {
  return (
    <>
      <LoaderContainer>
        <Presence present={isLoading}>
          <LoaderAnimation
            aria-busy={isLoading}
            aria-hidden={!isLoading}
            focusable="false"
            role="progressbar"
            viewBox="0 0 20 20"
          >
            <path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" />
          </LoaderAnimation>
        </Presence>
      </LoaderContainer>
    </>
  );
};

export default Loader;
