type Theme = 'light' | 'dark';
type Language = 'da' | 'ja' | 'fr' | 'en' | 'es' | 'de' | 'it';
type HighlightTag = 'b' | 'pre' | 'i';

// Sitecore Search environment types
type SearchEnvironment = 'apse2' | 'prodEu' | 'prod';

interface SearchConfig {
  /** Environment where data should be gathered: apse2 (Asia/Oceania), prodEu (Europe), or prod (US) */
  env: SearchEnvironment;
  /** Sitecore Search customer key from CEC */
  customerKey: string;
  /** API key provided in CEC */
  apiKey: string;
}
