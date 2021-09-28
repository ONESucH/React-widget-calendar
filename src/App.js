import { useState, useEffect } from 'react';
import { ThemeContext } from './utils';
import { ThemeContextExample } from './components';
import './App.css';

const weeks = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];

const App = () => {
  const [ colors, setColors ] = useState({
    theme1: 'red',
    theme2: 'yellow',
  });
  const [ activeWeek, setActiveWeek ] = useState(null);
  const [ counter, setCounter ] = useState(null);
  const [ days, setDays ] = useState([]);
  const date = new Date();
  const monthDays = 33 - new Date(date.getFullYear(), date.getMonth(), 33).getDate();

  useEffect(() => {
    if (counter <= monthDays) {

      if (+counter) setDays([ ...days, counter ]);

      setCounter(counter + 1);
    }
  }, [ counter ]);

  useEffect(() => {
    console.log('activeWeek', activeWeek);
  }, [ activeWeek ]);

  return (
    <ThemeContext.Provider value={colors}>

      <div className="controls">
        <div className="controls-btn">
          <input type="color" value={colors.theme1} onChange={(e) => setColors({
            ...colors,
            theme1: e.target.value
          })}/>

          <input type="color" value={colors.theme2} onChange={(e) => setColors({
            ...colors,
            theme2: e.target.value
          })}/>
        </div>

        <ThemeContextExample />
      </div>

      <div className="widgets">
        <div className="widget-calendar">
          <div className="weeks">
            {weeks.map((item, i) => <div className="week" key={i} onClick={() => setActiveWeek(item)}>{item}</div>)}
          </div>
          <div className="days">
            {days.map((item, i) => <div className="day" key={i}>{item}</div>)}
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
