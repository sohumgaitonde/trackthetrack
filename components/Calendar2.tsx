import React, { useState } from 'react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);
import Link from 'next/link';
import eventtest from '../calendartest.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


interface Event {
  Date: string;
  Name: string;
  
  "Unnamed: 2": null;
    Venue: string;
    Country: string;
    "Cat.": string;
    Discipline: string;
    "Competition Group": string;
    "Unnamed: 8": null;
    "Unnamed: 7": null;

}
const eventShading = (input: string): string => {
  return category[input]
}
const category: { [key: string]: string } = {
  'OW': 'bg-red-500',
  'DF': 'bg-yellow-500',
  'GW': 'bg-purple-500',
  'A': 'bg-green-500',
  'B': 'bg-blue-500'
};
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

const daysInMonth = (month: number, year: number) => new Date(year, month, 0).getDate();

const areEventsEqual = (a: Event, b: Event): boolean => {
  return (
    a.Date === b.Date &&
    a.Name === b.Name
  );
};

const meets = eventtest.filter((record, index, self) => 
  index === self.findIndex((r) => areEventsEqual(r, record))
);

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
    return meets.filter(event => event.Date === date);
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="w-full h-16"></div>);
    }
    for (let day = 1; day <= daysInCurrentMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const events = meets.filter(event => event.Date === dateStr);
      const hasEvent = meets.some(event => event.Date === dateStr);
      const categoryClass = hasEvent ? eventShading(events[0]['Cat.']) : 'bg-white';
      days.push(
        <div>
            <div
          key={day}
          className={`w-full p-8 rounded-lg shadow-lg h-24 flex items-center justify-center border cursor-pointer ${categoryClass}`}
          onClick={() => handleClickDate(dateStr)}
        >
          <div>
          {hasEvent ? <FontAwesomeIcon icon={faStar} size="lg" /> : ""}
        </div>
          <div>
          {day}
          </div>
          <div>
          {hasEvent ? <FontAwesomeIcon icon={faStar} size="lg" /> : ""}
        </div>
        </div>
        

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
      <section className="p-2">
        <div className="flex grid grid-cols-5 ">
          <div className="bg-red-500 rounded-md m-1">
            Olympic Games
          </div>
          <div className="bg-yellow-500 rounded-md m-1">
            Diamond League Final
          </div>
          <div className="bg-purple-500 rounded-md m-1">
            Diamond League Meet
          </div>
          <div className="bg-green-500 rounded-md m-1">
            Continental Tour Meets
          </div>
          <div className="bg-blue-500 rounded-md m-1">
            National Championships
          </div>
        </div>
      </section>
      {selectedDate && (
        <div className="mt-4 p-4 border rounded bg-white">
          <h3 className="text-xl font-bold">Events on {dayjs(selectedDate).format('MMMM D, YYYY')}</h3>
          {getEventsForDate(selectedDate).map((event, index) => (
            <div key={index} className="mt-2">
              <h4 className="text-lg font-semibold">Meet Name: {event.Name}</h4>
              <p>Venue: {event.Venue}</p>
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