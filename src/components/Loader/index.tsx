import React from 'react';

import { Presence } from '@sitecore-search/ui';

import { LoaderAnimation, LoaderContainer } from './styled';

const Loader = ({ enabled = true }: { enabled?: boolean }): JSX.Element => (
  <LoaderContainer>
    <Presence present={enabled}>
      <LoaderAnimation
        aria-busy={enabled}
        aria-hidden={!enabled}
        focusable="false"
        role="progressbar"
        viewBox="0 0 20 20"
      >
        <path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" />
      </LoaderAnimation>
    </Presence>
  </LoaderContainer>
);

export default Loader;
