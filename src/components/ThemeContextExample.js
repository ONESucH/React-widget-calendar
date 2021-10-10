import { useContext } from 'react';
import { ThemeContext } from '../utils';

export const ThemeContextExample = () => {
  const themeContext = useContext(ThemeContext);

  return (
   <div className="controls-label">
     <h3 style={{color: themeContext.theme1}}>Тема таблицы</h3>
     <h3 style={{color: themeContext.theme2}}>Тема текста</h3>
   </div>
  )
};