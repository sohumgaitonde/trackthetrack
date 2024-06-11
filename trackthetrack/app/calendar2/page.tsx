"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Calendar from '../../components/Calendar2';
import logo from '../assets/ttt1.png';
import Search from '../../components/Search';

const CalendarPage = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <Calendar />
//     </div>
//   );
// };

// export default CalendarPage;

  const [meetName, setMeetName] = useState('');

  const handleMeetNameChange = (event) => {
    setMeetName(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Meet name:', meetName);
    setMeetName('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <head>
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <header className="bg-white dark:bg-zinc-800 p-4 shadow-md flex items-center justify-between">
  <div className="flex items-center space-x-4">
    <Image src={logo} alt="Logo" width={128} height={128}/>
    <span className="text-xl font-bold text-zinc-800 dark:text-white">Track The Track</span>
  </div>
  <nav className="flex space-x-4">
    <a href="/" className="text-zinc-800 dark:text-white hover:text-orange-500">Home</a>
    <a href="#" className="text-zinc-800 dark:text-white hover:text-orange-500">Rankings</a>
    <a href="/calendar2" className="text-zinc-800 dark:text-white hover:text-orange-500">Calendar</a>
    <a href="/about-us" className="text-zinc-800 dark:text-white hover:text-orange-500">About Us</a>
    <a href="#" className="text-zinc-800 dark:text-white hover:text-orange-500">Athletes</a>
    <a href="#" className="text-zinc-800 dark:text-white hover:text-orange-500">Teams</a>
  </nav>
  <div className="relative">
  <Search />
  </div>
</header>
  </body>
      <Calendar />
      <h1 className="text-black font-mono"> Did we miss a meet? Submit the meet name here and we'll be sure to add it!</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Enter meet name"
          value={meetName}
          onChange={handleMeetNameChange}
          className="p-2 border rounded-lg shadow-sm mr-2"
          required
        />

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
          Add Meet
        </button>
      </form>
    </div>
  );
};

export default CalendarPage;
