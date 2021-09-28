import { createContext } from 'react';

const colors = {
  theme1: null,
  theme2: null,
}

export const ThemeContext = createContext(colors);