import { Globe } from 'lucide-react';
import React, { useContext } from 'react';

import { LanguageContext } from '@/contexts/languageContext';
import type { ILanguageContext } from '@/contexts/languageContext';
import locales from '@/data/languages';

const LocaleSelector = (): JSX.Element => {
  const { language, setLanguage } = useContext<ILanguageContext>(LanguageContext);
  const handleChange = (e: { target: { value: string } }): void => {
    setLanguage(e.target.value as Language);
  };
  return (
    <div className="flex items-center">
      <Globe className="text-gray-400 " />
      <select className="select cursor-pointer" onChange={handleChange} defaultValue={language}>
        {locales.map((locale) => (
          <option value={locale.value}>{locale.label}</option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSelector;
