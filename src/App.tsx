import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { SEOWidget, WidgetsProvider } from '@sitecore-search/react';
import { createTheme } from '@sitecore-search/ui';

import Footer from './components/Footer';
import Header from './components/Header';
import { LanguageContext } from './contexts/languageContext';
import { ThemeContext } from './contexts/themeContext';
import useLanguage from './hooks/useLanguage';
import useTheme from './hooks/useTheme';
import ArticleDetail from './pages/ArticleDetail';
import Home from './pages/Home';
import Search from './pages/Search';
import { GlobalStyle } from './styled';
import darkTheme from './themes/dark.json';
import lightTheme from './themes/light.json';

function getTheme(theme: string): typeof lightTheme | typeof darkTheme {
  if (theme === 'light') {
    return lightTheme;
  }
  return darkTheme;
}

/**
 * Configuration object for search settings.
 * It uses Vite environment variables.
 * @see https://vitejs.dev/guide/env-and-mode.html
 */
const SEARCH_CONFIG = {
  env: import.meta.env.VITE_SEARCH_ENV,
  customerKey: import.meta.env.VITE_SEARCH_CUSTOMER_KEY,
  apiKey: import.meta.env.VITE_SEARCH_API_KEY,
};

function App(): JSX.Element {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { style } = createTheme(getTheme(theme as string));

  return (
    <>
      <GlobalStyle />
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <LanguageContext.Provider value={{ language, setLanguage }}>
          <BrowserRouter basename={import.meta.env.VITE_SEARCH_PATH}>
            <div className="App" style={style}>
              <WidgetsProvider
                env={SEARCH_CONFIG.env}
                customerKey={SEARCH_CONFIG.customerKey}
                apiKey={SEARCH_CONFIG.apiKey}
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
