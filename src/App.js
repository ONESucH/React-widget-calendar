import { useState, useEffect } from 'react';
import { ThemeContext } from './utils';
import { ThemeContextExample } from './components';
import './App.css';

// Месяцы
const MonthRU = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Окрябрь',
  'Ноябрь',
  'Декабрь',
];

// Недели
const WeeksRu = [
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
    theme2: 'blue',
  });
  const [ monthCounter, setMonthCounter ] = useState(0); // Количество месяцев в году
  const [ years, setYears ] = useState([]); // Формируем год
  const [ month, setMonth ] = useState(null); // Формируем в году месяцы

  const getLeftPosition = (monthDays) => Array.from(
    { length: new Date(new Date().getFullYear(), monthCounter, 0).getDay() },
    (v, k) => monthDays - k).reverse();

  useEffect(() => {
    if (monthCounter > 11) return;

    const monthDays = new Date(new Date().getFullYear(), monthCounter + 1, 0).getDate(); // Количество дней в месяце

    setMonth({
      indexMount: monthCounter,
      month: MonthRU[monthCounter],
      monthDays,
      days: Array.from({ length: monthDays }, (v, k) => k + 1),
      leftPosition: getLeftPosition(monthDays)
    });

    setMonthCounter(monthCounter + 1);
  }, [ monthCounter ]);

  useEffect(() => {
    if (!month) return;

    setYears([
      ...years,
      month
    ]);
  }, [ month ]);

  return (
    <ThemeContext.Provider value={colors}>

      <div className="controls">
        <div className="controls-btn">
          <input type="color" value={colors.theme1} onChange={e => setColors({
            ...colors,
            theme1: e.target.value
          })}/>

          <input type="color" value={colors.theme2} onChange={e => setColors({
            ...colors,
            theme2: e.target.value
          })}/>
        </div>

        <ThemeContextExample />
      </div>

      <div className="widgets">
        <div className="widget-calendar">
          <div className="years">
            {years?.length ? (
              years.map((item, monthIndex) => (
                <div className="month" key={monthIndex}>
                  <div className="month-title">{item?.month}</div>
                  <div className="weeks">
                    {WeeksRu.map((item, weeksIndex) => <div className="week" key={weeksIndex + item}>{item}</div>)}
                  </div>
                  <div className="days">
                    {item?.leftPosition.map(day => (
                      <div key={day} className="day no-active">
                        {day}
                      </div>
                    ))}
                    {item?.days.map(day => (
                      <div
                        key={day}
                        className={`day ${(new Date().getMonth() === item.indexMount) && (day === new Date().getDate()) ? 'now-date' : null}`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : null}
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
