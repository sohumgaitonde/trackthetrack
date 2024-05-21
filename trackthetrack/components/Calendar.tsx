"use client";

import React, { useState } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';

interface CalendarProps {
  initialDate?: Date;
}

const Calendar: React.FC<CalendarProps> = ({ initialDate = new Date() }) => {
  const [currentDate, setCurrentDate] = useState(dayjs(initialDate));

  const daysInMonth = currentDate.daysInMonth();
  const firstDayOfMonth = currentDate.startOf('month').day();
  const lastDayOfMonth = currentDate.endOf('month').day();

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const prevMonthDaysArray = Array.from(
    { length: firstDayOfMonth },
    (_, i) => dayjs(currentDate).startOf('month').subtract(firstDayOfMonth - i, 'day').date()
  );

  const nextMonthDaysArray = Array.from(
    { length: 6 - lastDayOfMonth },
    (_, i) => i + 1
  );

  const handlePreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePreviousMonth}>&lt;</button>
        <h2 className="text-lg font-semibold">
          {currentDate.format('MMMM YYYY')}
        </h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-semibold">
            {day}
          </div>
        ))}
        {prevMonthDaysArray.map((day, index) => (
          <div
            key={`prev-${index}`}
            className="text-center text-gray-400"
          >
            {day}
          </div>
        ))}
        {daysArray.map(day => (
          <div key={day} className="text-center">
            {day}
          </div>
        ))}
        {nextMonthDaysArray.map((day, index) => (
          <div
            key={`next-${index}`}
            className="text-center text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
