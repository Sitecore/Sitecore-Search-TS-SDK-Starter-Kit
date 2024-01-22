import ReactDOM from 'react-dom/client';

import { Logger } from '@sitecore-search/react';

import App from './App';

Logger.setLogLevel('debug');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
