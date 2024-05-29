"use client";

import React, { useState, useEffect } from 'react';
import Calendar from "./calendar/page";
import Ranking from "./rankings/page";
import Teare from "./athletes/teare/page";
import 'tailwindcss/tailwind.css';


const HomePage: React.FC = () => {
  const [myBool, setmyBool] = useState(true);
  function calendar() {
    setmyBool(false)
  }
  function ranking() {
    setmyBool(true)
  }
  const component = myBool ? <Ranking/> : <Calendar/>

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold text-center text-blue-700 mb-4">
          Track the Track
        </h1>
        <h2 className="text-3xl font-semibold text-center text-blue-500">
          Road to the Olympics
        </h2>
      </header>
      <section className="flex items-center justify-center bg-gray-100">
        <div className="flex space-x-4">
          
          <button className='block p-2 border rounded-lg bg-white shadow-sm text-gray-700 focus:ring-blue-500 focus:border-blue-500' id="Calendar" onClick={calendar}>
            Calendar
          </button>
          <button className='block p-2 border rounded-lg bg-white shadow-sm text-gray-700 focus:ring-blue-500 focus:border-blue-500' id="Rankings" onClick={ranking}>
            Rankings
          </button>
        </div>
        
      </section>
      <div>
        {component}
      </div>
      
    </div>
  );
};

export default HomePage;
