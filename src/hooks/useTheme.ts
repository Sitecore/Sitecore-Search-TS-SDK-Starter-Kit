import { useEffect } from 'react';

import useStorage from './useStorage';

/**
 * Custom hook for managing the theme state.
 * This hook synchronizes the theme state with the local storage.
 * @returns An object containing the current theme and a function to update the theme.
 */
function useTheme() {
  const [theme, setTheme] = useStorage<'light' | 'dark'>('theme', 'light');
  useEffect(() => {
    console.info('[src/hooks/useTheme.ts]: Syncing theme with local storage...');
    setTheme(theme);
  }, [theme]);
  return { theme, setTheme } as const;
}

export default useTheme;
