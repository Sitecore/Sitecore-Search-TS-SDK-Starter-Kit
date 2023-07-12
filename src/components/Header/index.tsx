import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

import { ThemeContext } from '../../contexts/theme-context';
import type { IThemeContext } from '../../contexts/theme-context';
import HeaderInput from '../HeaderInput';
import LocaleSelector from '../LocaleSelector';
import { HeaderContent, HeaderContentWrapper, HeaderWrapper } from './styled';

const Header = (): JSX.Element => {
  const navigate = useNavigate();
  const { theme, setTheme } = useContext<IThemeContext>(ThemeContext);
  const toggleDarkMode = (checked: boolean): void => {
    if (checked) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  return (
    <HeaderWrapper>
      <HeaderContentWrapper>
        <HeaderContent>
          <a href="#" onClick={() => navigate(``)} tabIndex={1}>
            <img src="https://doc.sitecore.com/img/logo.svg" tabIndex={-1} alt="Sitecore Logo" />
          </a>
          <HeaderInput />
          <DarkModeSwitch checked={theme === 'dark'} onChange={toggleDarkMode} />
          <LocaleSelector />
        </HeaderContent>
      </HeaderContentWrapper>
    </HeaderWrapper>
  );
};

export default Header;
