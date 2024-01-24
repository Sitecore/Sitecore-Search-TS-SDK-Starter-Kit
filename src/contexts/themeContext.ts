import { createContext } from 'react';

export interface IThemeContext {
  theme: Theme | '';
  setTheme: (t: Theme) => void;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: '',
  setTheme: (theme: Theme) => {
    console.info(
      `[src/contexts/themeContext.ts]: setTheme() was called with ${theme} as a parameter but is not yet implemented.`,
    );
  },
});
