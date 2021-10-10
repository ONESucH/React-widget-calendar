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
  const [ month, setMonth ] = useState([]);
  const [ firstDayYears, setFirstDayYears ] = useState(null); // Отступы первого дня
  const [ fullDays, setFullDays ] = useState([]);
  const [ firstDayIndents, setFirstDayIndents ] = useState([]);

  useEffect(() => {
    const date = new Date(new Date().getFullYear(), 0, 0);

    setFirstDayYears(date.getDay());

    if (month.length) setMonth([]);

    const years = []; // Формируем в году месяцы

    for(let counter = 0; 12; counter++) {
      const date = new Date();
      const monthDays = 33 - new Date(date.getFullYear(), counter, 33).getDate(); // Количество дней в месяце
      const monthAllWeeks = Math.ceil(monthDays / 7); // Количество недель в месяце

      const leftMargin = new Date(date.getFullYear(), counter, 0) - new Date(date.getFullYear(), counter, 7);
      const rightMargin = new Date(date.getFullYear(), counter, monthDays - 7) - new Date(date.getFullYear(), counter, monthDays);

      console.log('leftMargin', leftMargin);
      console.log('rightMargin', rightMargin);

      const daysLeftMargin = leftMargin / (1000 * 60 * 60 * 24);
      const daysRightMargin = rightMargin / (1000 * 60 * 60 * 24);

      console.log('daysLeftMargin', daysLeftMargin);
      console.log('daysRightMargin', daysRightMargin);

      years.push({
        month: MonthRU[counter],
        monthDays,
        leftMargin: monthDays - (monthAllWeeks * 7),
        rightMargin: monthDays - (monthAllWeeks * 7)
      });

      if (years.length === 12) {
        setMonth([
          ...month,
          ...years
        ])
      }

      if (counter >= 11) return;
    }
  }, []);

  useEffect(() => {
    let resultMonth = month.map((el) => {
      let days = [];

      for(let counter = 1; el.monthDays; counter++) {
        days.push(counter);

        if (counter === el.monthDays) {
          el.days = days;

          return el;
        }
      }
    });

    setFullDays([
      ...resultMonth,
      ...fullDays
    ]);
  }, [ month ]);

  useEffect(() => {
    const indents = []; // Отступ первого дня

    for(let counter = 1; firstDayYears; counter++) {
      indents.push(counter);

      if (counter === firstDayYears) {
        setFirstDayIndents([
          ...indents,
          ...firstDayIndents
        ]);
      } else if (counter >= firstDayYears) return;
    }
  }, [ firstDayYears ]);

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
          <div className="years">
            {month.length ? (
              month.map((item, monthIndex) => (
                <div className="month" key={monthIndex}>
                  <div className="month-title">{item.month}</div>
                  <div className="weeks">
                    {WeeksRu.map((item, weeksIndex) => <div className="week" key={weeksIndex + item}>{item}</div>)}
                  </div>
                  <div className="days">
                    {firstDayIndents.length && monthIndex === 0 ? firstDayIndents.map((el) => (
                      <div className="day no-active" key={el}>{el}</div>
                    )) : null}

                    {item.days ? item.days.map((day, dayIndex) => (
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
