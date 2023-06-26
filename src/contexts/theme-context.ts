import { createContext } from 'react';

export const ThemeContext = createContext({
  theme: '',
  setTheme: (theme: string) => {},
});

export interface IThemeContext {
  theme: string;
  setTheme: (t: string) => void;
}
