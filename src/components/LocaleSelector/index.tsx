import React, { useContext } from 'react';
import Select from 'react-select';
import type { GroupBase, OptionsOrGroups, PropsValue, StylesConfig } from 'react-select';

import { theme } from '@sitecore-search/ui';

import { LanguageContext } from '../../contexts/languageContext';
import type { ILanguageContext } from '../../contexts/languageContext';
import locales from '../../data/languages';
import { LocaleSelectorIcon, LocaleSelectorWrapper } from './styled';

const colourStyles: StylesConfig = {
  control: (styles) => ({ ...styles, background: 'transparent' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
    };
  },
  input: (styles) => ({ ...styles, color: `${theme.vars.palette.primary.contrastText}` }),
  placeholder: (styles) => ({ ...styles, color: `${theme.vars.palette.primary.contrastText}` }),
  singleValue: (styles) => ({ ...styles, color: `${theme.vars.palette.primary.contrastText}` }),
  menu: (styles) => ({ ...styles, color: `${theme.vars.palette.primary.dark}` }),
};

const LocaleSelector = (): JSX.Element => {
  const { language, setLanguage } = useContext<ILanguageContext>(LanguageContext);
  const handleChange = (item: any): void => {
    setLanguage(item.value);
  };
  const selectedIndex = locales.findIndex(({ value }) => value === language) || 0;
  return (
    <LocaleSelectorWrapper>
      <LocaleSelectorIcon
        src="https://sitecoredemojp.sitecoresandbox.cloud/api/public/content/66478b7042fd4107bdf35fc45b5331d1?v=40fea270"
        alt="Locale Selector"
      />
      <Select onChange={handleChange} options={locales} defaultValue={locales[selectedIndex]} styles={colourStyles} />
    </LocaleSelectorWrapper>
  );
};

export default LocaleSelector;
