"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Calendar from '../../components/Calendar2';
import logo from '../assets/ttt1.png';
import Search from '../../components/Search';
import Header from '../../components/Header'

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
      
    
      <Header />
    
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
