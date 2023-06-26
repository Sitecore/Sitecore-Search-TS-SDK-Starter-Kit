import React from 'react';

import PreviewSearch from '../../widgets/PreviewSearch';
import { HeaderInputWrapper } from './styled';

const HeaderInput = (): JSX.Element => {
  return <HeaderInputWrapper>{<PreviewSearch rfkId="rfkid_6"></PreviewSearch>}</HeaderInputWrapper>;
};

export default HeaderInput;
