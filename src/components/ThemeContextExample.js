import { useContext } from 'react';
import { ThemeContext } from '../utils';

export const ThemeContextExample = () => {
  const themeContext = useContext(ThemeContext);

  return (
   <div className="controls-label">
     <h3 style={{ color: themeContext.theme1 }}>Цвет таблицы</h3>
     <h3 style={{ color: themeContext.theme2 }}>Цвет Заголовка</h3>
   </div>
  )
};