import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PageController, SEOWidget, WidgetsProvider } from '@sitecore-search/react';
import { createTheme } from '@sitecore-search/ui';

import Footer from './components/Footer';
import Header from './components/Header';
import { LanguageContext } from './contexts/languageContext';
import { ThemeContext } from './contexts/theme-context';
import locales from './data/locales';
import type { Language } from './data/types';
import useStorage from './hooks/useStorage';
import ArticleDetail from './pages/ArticleDetail';
import Home from './pages/Home';
import Search from './pages/Search';
import { GlobalStyle } from './styled';
import darkTheme from './themes/dark.json';
import lightTheme from './themes/light.json';

function getTheme(theme: string): any {
  if (theme === 'light') {
    return lightTheme;
  }
  return darkTheme;
}

function App(): JSX.Element {
  const [storageTheme, setStorageTheme] = useStorage('theme', 'light');
  const [storageLanguage, setStorageLanguage] = useStorage('lang', 'en');
  const [theme, setTheme] = useState<string>(storageTheme);
  const [language, setLanguage] = useState<Language>(storageLanguage);
  const { style } = createTheme(getTheme(theme as string));
  const DISCOVER_CONFIG = {
    env: import.meta.env.VITE_SEARCH_ENV,
    customerKey: import.meta.env.VITE_SEARCH_CUSTOMER_KEY,
    apiKey: import.meta.env.VITE_SEARCH_API_KEY,
  };

  PageController.getContext().setLocaleLanguage(language);
  PageController.getContext().setLocaleCountry(locales[language].country);

  useEffect(() => {
    PageController.getContext().setLocaleLanguage(language);
    PageController.getContext().setLocaleCountry(locales[language].country);
    setStorageLanguage(language);
  }, [language]);
  useEffect(() => {
    setStorageTheme(theme);
  }, [theme]);

  return (
    <>
      <GlobalStyle />
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <LanguageContext.Provider value={{ language, setLanguage }}>
          <BrowserRouter basename={import.meta.env.VITE_SEARCH_PATH}>
            <div className="App" style={style}>
              <WidgetsProvider
                env={DISCOVER_CONFIG.env}
                customerKey={DISCOVER_CONFIG.customerKey}
                apiKey={DISCOVER_CONFIG.apiKey}
                useToken
                publicSuffix={true}
              >
                <SEOWidget rfkId={'demo_search_seo'} />
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/detail/:id" element={<ArticleDetail />}></Route>
                </Routes>
                <Footer />
              </WidgetsProvider>
            </div>
          </BrowserRouter>
        </LanguageContext.Provider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
