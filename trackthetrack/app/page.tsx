"use client";
import React, { useState, useEffect } from 'react';
import Calendar from "./calendar/page";
import Ranking from "./rankings/page";
import 'tailwindcss/tailwind.css';
import Image from 'next/image';
import logo from './assets/ttt1.png';
import nike from './assets/teams/nike.png';
import uw from './assets/teams/uw.png';
import on from './assets/teams/on.png';
import nau from './assets/teams/nau.png';
import adidas from './assets/teams/adidas.png';
import none from './assets/teams/none.png';
import Search from '../components/Search';


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
      <Image src={logo} alt="Logo" width={128} height={128} />
      
      <header className="mb-12">
      <h1 className="text-8xl font- text-center text-blue-700 mb-4">
      Track the Track </h1>
      <h2 className="text-4xl font-mono text-center text-blue-500">
        Road to the Olympics ꈨ
      </h2>
      </header>
      <section className="flex items-center justify-center bg-gray-100 min-h-20">
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
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Search for an Athlete</h1>
      <Search />
    </div>
    </div>
  );
};

export default HomePage;
