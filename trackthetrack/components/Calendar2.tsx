import React, { useState } from 'react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);
import Link from 'next/link';
import eventtest from '../calendar.json';


interface Event {
  date: string;
  title: string;
  description: string;
  link: string;
}
const convertDateString = (input: string): string => {
  const months: { [key: string]: string } = {
    'JAN': '01',
    'FEB': '02',
    'MAR': '03',
    'APR': '04',
    'MAY': '05',
    'JUN': '06',
    'JUL': '07',
    'AUG': '08',
    'SEP': '09',
    'OCT': '10',
    'NOV': '11',
    'DEC': '12',
  };
  const [day, month, year] = input.split(' ');
  const monthNumber = months[month.toUpperCase()];

  // Ensure day is two digits
  const dayNumber = day.padStart(2, '0');

  return `${year}-${monthNumber}-${dayNumber}`;
};

const events: Event[] = [
  { date: '2024-06-09', title: 'NY GP', description: 'new york grand prix', link: "https://results.usatf.org/NYCGrandPrix24/"},
  { date: '2024-06-09', title: 'test', description: 'testing multiple events', link: "https://results.usatf.org/NYCGrandPrix24/"}
  // Add more events here
];

const daysInMonth = (month: number, year: number) => new Date(year, month, 0).getDate();

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const today = dayjs();
  const [currentMonth, setCurrentMonth] = useState(today.month() + 1);
  const [currentYear, setCurrentYear] = useState(today.year());

  const firstDayOfMonth = dayjs(`${currentYear}-${currentMonth}-01`).day();
  const daysInCurrentMonth = daysInMonth(currentMonth, currentYear);

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleClickDate = (date: string) => {
    setSelectedDate(date);
  };

  const getEventsForDate = (date: string) => {
    return eventtest.filter(event => convertDateString(event.Date) === date);
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="w-full h-16"></div>);
    }
    for (let day = 1; day <= daysInCurrentMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasEvent = eventtest.some(event => convertDateString(event.Date) === dateStr);
      days.push(
        <div
          key={day}
          className={`w-full h-16 flex items-center justify-center border cursor-pointer ${hasEvent ? 'bg-blue-100' : ''}`}
          onClick={() => handleClickDate(dateStr)}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="bg-blue-500 text-white px-4 py-2 rounded">Previous</button>
        <h2 className="text-xl font-bold">{dayjs(`${currentYear}-${currentMonth}-01`).format('MMMM YYYY')}</h2>
        <button onClick={handleNextMonth} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div key={index} className="text-center font-bold">{day}</div>
        ))}
        {renderDays()}
      </div>
      {selectedDate && (
        <div className="mt-4 p-4 border rounded">
          <h3 className="text-xl font-bold">Events on {dayjs(selectedDate).format('MMMM D, YYYY')}</h3>
          {getEventsForDate(selectedDate).map((event, index) => (
            <div key={index} className="mt-2">
              <h4 className="text-lg font-semibold">{event.Name}</h4>
              <p>{event.Venue}</p>
              <Link href={event.Discipline} className="text-blue-700 underline">
                Meet Info
              </Link>
            </div>
          ))}
          {getEventsForDate(selectedDate).length === 0 && <p>No events for this date.</p>}
        </div>
      )}
    </div>
  );
};

export default Calendar;