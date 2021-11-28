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
  const [ monthCounter, setMonthCounter ] = useState(0);
  const [ years, setYears ] = useState([]); // Формируем год
  const [ month, setMonth ] = useState(null); // Формируем в году месяцы
  const date = new Date(); // Получаем текущую дату

  useEffect(() => {
    if (monthCounter > 11) return;

    // Предыдущий месяц
    const left = new Date(date.getFullYear() - 1, 11, 31);
    const countWeekForMount = Math.ceil((date.getDate() + monthCounter) / 7); // Количество недель в месяце
    // ----------------
    const monthDays = 33 - new Date(date.getFullYear(), monthCounter, 33).getDate(); // Количество дней в месяце
    const dontActiveDays = 42 - monthDays; // Количество всех неактивных дней в месяце

    setMonth({
      month: MonthRU[monthCounter],
      monthDays,
      days: Array.from({ length: monthDays }, (v, k) => k + 1)
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
                    {item?.days ? item?.days.map((day, dayIndex) => (
                      <div className="day" key={dayIndex}>{day}</div>
                    )) : null}
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
