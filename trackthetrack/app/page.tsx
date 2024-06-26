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
import Header from '../components/Header';
import rankings from '../1500m.json';
import Link from 'next/link';


const HomePage: React.FC = () => {
  const [myBool, setmyBool] = useState(true);
  function calendar() {
    setmyBool(false)
  }
  function ranking() {
    setmyBool(true)
  }
  const component = myBool ? <Ranking/> : <Calendar/>
  const rankingsPreview = rankings[0];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
    <>
    <Header />
    </>
      <header className="mb-12">
      <h1 className="text-8xl font- text-center text-blue-700 mb-4">
      Track the Track </h1>
      <h2 className="text-4xl font-mono text-center text-blue-500">
        Road to the Olympics ꈨ
      </h2>
      </header>
      <section>
        <div className='text-center'>
          Description of the website
        </div>
        <div className='text-center'>
          Goals
        </div>
        <div className='text-center'>
          How it works
        </div>

      </section>

      <section className="flex items-center justify-center bg-gray-100 min-h-20">
        <div className="w-3/4">
          <div className='h-24 border'>
            Popular athletes
          </div>
          <div className='h-24 border'>
            Upcoming events
          </div>
        </div>

        <div className="w-1/4 h-60 items-center justify-center">
          <div className='text-2xl font-bold text-center'>
          1500m Rankings
          </div>
          
          <div>
          {rankings.slice(0, 3).map((athlete, index) => (
            
            <Link href={`/athletes/${encodeURIComponent(athlete.Athlete[0].split(" ")[1].toLowerCase())}`}>
              <button key={index} className="bg-white p-2 m-1 rounded-lg shadow-lg hover:shadow-xl transition-shadow h-20 min-w-full">
              <h2 className="text-xl font-semibold text-blue-700">{athlete.Athlete[0]}</h2>
              <p className="text-gray-600 mt-2">{athlete.Mark}</p>
            </button>
            </Link>
          ))}
          </div>
          <div className='text-center items-center justify-center text-white'>
          <Link href='/rankings2' className='bg-blue-600 rounded-lg shadow-lg hover:shadow-xl transition-shadow w-28 p-1'>
            See Full Rankings
          </Link>
          </div>
          
        </div>

      </section>




      <section className="flex items-center justify-center bg-gray-100 min-h-20">
        <div className="flex space-x-4">
          
          <button className='block p-2 border rounded-lg bg-white shadow-sm text-gray-700 focus:ring-blue-500 focus:border-blue-500 shadow-lg hover:shadow-xl transition-shadow' id="Calendar" onClick={calendar}>
            Calendar
          </button>
          <button className='block p-2 border rounded-lg bg-white shadow-sm text-gray-700 focus:ring-blue-500 focus:border-blue-500 shadow-lg hover:shadow-xl transition-shadow' id="Rankings" onClick={ranking}>
            Rankings
          </button>
        </div>
        
      </section>
      <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4 h-8">Search for an Athlete</h1>
      <Search />
      </div>
      <div>
        {component}
      </div>
    
    </div>
  );
};

export default HomePage;
