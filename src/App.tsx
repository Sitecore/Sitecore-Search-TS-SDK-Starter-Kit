import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { LanguageContext } from '@/contexts/languageContext';
import useLanguage from '@/hooks/useLanguage';
import '@/index.css';
import ArticleDetail from '@/pages/ArticleDetail';
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import { SEOWidget, WidgetsProvider } from '@sitecore-search/react';

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
  return (
    <>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <BrowserRouter>
          <div className="bg-white dark:bg-gray-700">
            <WidgetsProvider
              env={SEARCH_CONFIG.env}
              customerKey={SEARCH_CONFIG.customerKey}
              apiKey={SEARCH_CONFIG.apiKey}
              publicSuffix={true}
            >
              <SEOWidget rfkId={'demo_search_seo'} />
              <Header />
              <main className="w-full m-auto pt-[100px] min-h-[700px] bg-white dark:bg-gray-700">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/detail/:id" element={<ArticleDetail />}></Route>
                </Routes>
              </main>
              <Footer />
            </WidgetsProvider>
          </div>
        </BrowserRouter>
      </LanguageContext.Provider>
    </>
  );
}

export default App;
