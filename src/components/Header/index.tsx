import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

import { ThemeContext } from '../../contexts/themeContext';
import type { IThemeContext } from '../../contexts/themeContext';
import HeaderInput from '../HeaderInput';
import Logo from '../Icons/Logo';
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
            <Logo />
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
