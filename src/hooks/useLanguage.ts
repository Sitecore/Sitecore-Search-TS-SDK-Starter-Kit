import { useEffect } from 'react';

import locales from '@/data/locales';
import useStorage from '@/hooks/useStorage';
import { PageController } from '@sitecore-search/react';

/**
 * Custom hook for managing the language state.
 * This hook synchronizes the language state with the local storage and updates the language settings in the PageController context.
 * @returns An object containing the current language and a function to update the language.
 */
function useLanguage() {
  const [language, setLanguage] = useStorage<Language>('lang', 'en');
  useEffect(() => {
    console.info('[src/hooks/useLanguage.ts]: Syncing language with local storage...');
    setLanguage(language);
    PageController.getContext().setLocaleLanguage(language);
    PageController.getContext().setLocaleCountry(locales[language].country);
  }, [language]);
  return { language, setLanguage } as const;
}

export default useLanguage;
