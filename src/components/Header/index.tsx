import React from 'react';
import { Link } from 'react-router-dom';

import { DarkmodeSwitch } from '@/components/DarkModeSwitcher';
import LocaleSelector from '@/components/LocaleSelector';
import Logo from '@/components/Logo';
import PreviewSearch from '@/widgets/PreviewSearch';

const Header = (): JSX.Element => {
  return (
    <div className="header-outer">
      <div className="header-inner">
        <div className="flex items-center justify-between">
          <Link to="/" tabIndex={1}>
            <Logo />
          </Link>
          <PreviewSearch rfkId="rfkid_6" />
          <DarkmodeSwitch />
          <LocaleSelector />
        </div>
      </div>
    </div>
  );
};

export default Header;
