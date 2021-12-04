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
  'Октябрь',
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
    theme1: 'silver',
    theme2: 'black',
  });
  const [ monthCounter, setMonthCounter ] = useState(0); // Количество месяцев в году
  const [ years, setYears ] = useState([]); // Формируем год
  const [ month, setMonth ] = useState(null); // Формируем в году месяцы
  const [ date, setDate ] = useState(new Date());

  const getLeftPosition = (monthDays) => Array.from(
    { length: new Date(date.getFullYear(), monthCounter, 0).getDay() },
    (v, k) => monthDays - k).reverse();

  const getRightPosition = (monthDays) => Array.from(
    { length: (6 * 7) - getLeftPosition(monthDays).length - monthDays  },
    (v, k) => k + 1);

  useEffect(() => {
    setMonthCounter(0);
    setYears([]);
  }, [ date ]);

  useEffect(() => {
    if (monthCounter > 11) return;

    const monthDays = new Date(date.getFullYear(), monthCounter + 1, 0).getDate(); // Количество дней в месяце

    setMonth({
      indexMount: monthCounter,
      month: MonthRU[monthCounter],
      monthDays,
      days: Array.from({ length: monthDays }, (v, k) => k + 1),
      leftPosition: getLeftPosition(monthDays),
      rightPosition: getRightPosition(monthDays)
    });

    setMonthCounter(monthCounter + 1);
  }, [ monthCounter, date ]);

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

        <div className="calendar-controls">
          <div className="calendar-data">
            <span>{date.getDate()} {MonthRU[date.getMonth()]}</span>
            <div
              className="calendar-btn fas fa-chevron-left"
              onClick={() => setDate(new Date(date.getFullYear() - 1, date.getMonth(), date.getDate()))}
              title="Назад"
            />
            <span>{date.getFullYear()}</span>
          </div>
          <div
            className="calendar-btn fas fa-chevron-right"
            onClick={() => setDate(new Date(date.getFullYear() + 1, date.getMonth(), date.getDate()))}
            title="Вперед"
          />
        </div>
      </div>

      <div className="widgets">
        <div className="widget-calendar">
          <div className="years">
            {years?.length ? (
              years.map((item, monthIndex) => (
                <div className="month" key={monthIndex}>
                  <div className="month-title" style={{color: colors.theme2}}>{item?.month}</div>
                  <div className="weeks">
                    {WeeksRu.map((item, weeksIndex) => (
                      <div className="week" style={{borderColor: colors.theme1}} key={weeksIndex + item}>{item}</div>
                    ))}
                  </div>
                  <div className="days">
                    {item?.leftPosition.map(day => (
                      <div key={day} className="day no-active" style={{borderColor: colors.theme1}}>{day}</div>
                    ))}
                    {item?.days.map(day => (
                      <div
                        key={day}
                        style={{borderColor: colors.theme1}}
                        className={`day ${(date.getMonth() === item.indexMount) && (day === date.getDate() && date.getFullYear() === new Date().getFullYear()) ? 'now-date' : ''}`}
                      >
                        {day}
                      </div>
                    ))}
                    {item?.rightPosition.map(day => (
                      <div key={day} className="day no-active" style={{borderColor: colors.theme1}}>{day}</div>
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
