import { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";
import "./App.css";

function App() {
  const today = new Date();

  const [chosenDate, setChosenDate] = useState(today);
  const [selectedDay, setSelectedDay] = useState(format(today, "dd"));
  const [displayMonth, setDisplayMonth] = useState(today);
  const [showCalendar, setShowCalendar] = useState(false);

  // array of date objects, 1 per day
  const monthDays = eachDayOfInterval({
    start: startOfMonth(displayMonth),
    end: endOfMonth(displayMonth),
  });

  // to make Monday start at 0
  const jsStartDay = startOfMonth(displayMonth).getDay();
  const startDay = (jsStartDay + 6) % 7;

  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    num: String(i + 1).padStart(2, "0"),
    name: format(new Date(2024, i, 1), "MMMM"),
  }));

  const yearOptions = Array.from({ length: 21 }, (_, i) => 2020 + i);

  function handleChangeDate(day) {
    const newDate = new Date(
      displayMonth.getFullYear(), // display month is just the month (and related year) on display in the open calendar
      displayMonth.getMonth(),
      Number(day)
    );
    setSelectedDay(day);
    setChosenDate(newDate);
  }

  function handleShowCalendar() {
    setShowCalendar((prev) => !prev);
  }

  function nextMonth() {
    setDisplayMonth((prev) => addMonths(prev, 1));
  }

  function prevMonth() {
    setDisplayMonth((prev) => subMonths(prev, 1));
  }

  function handleMonthChange(e) {
    const newMonth = Number(e.target.value) - 1;
    setDisplayMonth(
      (prev) => new Date(prev.getFullYear(), newMonth, prev.getDate())
    );
  }

  function handleYearChange(e) {
    const newYear = Number(e.target.value);
    setDisplayMonth(
      (prev) => new Date(newYear, prev.getMonth(), prev.getDate())
    );
  }

  return (
    <div className="container">
      <div className="calendar-container">
        <div className="calendar-top-bar">
          <span className="calendar-input-text">
            {format(chosenDate, "dd/MM/yyyy")}
          </span>

          <div className="calendar-input-icon" onClick={handleShowCalendar}>
            &#128197;
          </div>
        </div>

        <div
          className={`calendar-open-container ${showCalendar ? "" : "hidden"}`}
        >
          <div className="calendar-open-container-top">
            <div className="calendar-buttons-container">
              <button onClick={prevMonth}>&larr;</button>

              <div className="calendar-select-wrapper">
                <select
                  className="calendar-select"
                  value={format(displayMonth, "MM")}
                  onChange={(e) => handleMonthChange(e)}
                >
                  {monthOptions.map((m) => (
                    <option key={m.num} value={m.num}>
                      {m.name}
                    </option>
                  ))}
                </select>

                <select
                  className="calendar-select"
                  value={format(displayMonth, "yyyy")}
                  onChange={(e) => handleYearChange(e)}
                >
                  {yearOptions.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <button onClick={nextMonth}>&rarr;</button>
            </div>

            <div className="week-name-grid">
              <p>M</p>
              <p>T</p>
              <p>W</p>
              <p>T</p>
              <p>F</p>
              <p>S</p>
              <p>S</p>
            </div>
          </div>

          <div className="calendar-grid">
            {monthDays.map((day, index) => {
              const dayLabel = format(day, "dd");
              return (
                <div
                  key={day.toISOString()}
                  className={`day ${
                    dayLabel === selectedDay &&
                    format(day, "MM") === format(chosenDate, "MM") &&
                    format(day, "yyyy") === format(chosenDate, "yyyy")
                      ? "selected"
                      : ""
                  }`}
                  style={index === 0 ? { gridColumnStart: startDay + 1 } : {}}
                  onClick={() => handleChangeDate(dayLabel)}
                >
                  {dayLabel}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
