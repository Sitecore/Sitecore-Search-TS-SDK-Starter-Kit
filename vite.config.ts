import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    define: {
      VITE_SEARCH_CUSTOMER_KEY: `"${process.env.VITE_SEARCH_CUSTOMER_KEY}"`,
      VITE_SEARCH_API_KEY: `"${process.env.VITE_SEARCH_API_KEY}"`,
      VITE_SEARCH_ENV: `"${process.env.VITE_SEARCH_ENV}"`,
    },
  };
});
