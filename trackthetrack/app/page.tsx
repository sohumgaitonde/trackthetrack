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
import rankings1500 from '../1500m.json';
import rankings800 from '../800m.json';
import rankings5000 from '../5000m.json';
import rankings10000 from '../10000m.json';
import Link from 'next/link';
import wanyonyi from './assets/athletes/wanyonyi.jpeg';
import ingebrigtsen from './assets/athletes/ingebrigtsen.jpeg';
import fisher from './assets/athletes/fisher.jpg';
import sedjati from './assets/athletes/sedjati.jpg';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);
import calendarPreview from '../calendartest.json';



const HomePage: React.FC = () => {
  const [myBool, setmyBool] = useState(true);
  function calendar() {
    setmyBool(false)
  }
  function ranking() {
    setmyBool(true)
  }
  const component = myBool ? <Ranking/> : <Calendar/>

  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    // Get today's date
    const today = dayjs();

    // Filter and sort events by date
    const filteredEvents = calendarPreview
      .filter(event => dayjs(event.Date).isAfter(today))
      .sort((a, b) => dayjs(a.Date).diff(dayjs(b.Date)));

    // Get the next two upcoming events
    setUpcomingEvents(filteredEvents.slice(0, 2));
  }, []);
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
    <>
    <Header />
    </>
      <header className="mb-12">
      <h1 className="text-8xl font- text-center text-blue-700 mb-4">
      <p>{`Track the Track `}</p>
      </h1>
      <h2 className="text-4xl font-mono text-center text-blue-500">
        <p>{`Road to the Olympics ꈨ`}</p>
      </h2>
      </header>
      <section>
        <div className='text-center'>
          <p>{`Welcome to Track the Track!!`}</p>
        </div>
        <div className='text-center'>
          <p>{`Our goal is to help bridge the gap between the average track fan and the professional sport by providing engaging athlete profiles and an in-depth calendar.`}</p>
        </div>
        <div className='text-center'>
          <p>{`Currently, we have athlete pages for each of the top 20 men across the globe in each of the key distance events. We will be adding women's pages in the near future!`}</p>
        </div>

      </section>

      <section className="flex bg-gray-100">
        <div className="w-3/4">
          <div className='h-76 border p-2'>
            <div className='text-center text-2xl font-bold mb-1'> 
            <p>{`Popular Athletes`}</p>
            </div>
          
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          
            
            <Link href={`/athletes/${encodeURIComponent(rankings1500[0].Athlete[0].split(" ")[1].toLowerCase())}`}>
              <button className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow h-64 min-w-full">
                <Image alt='ingebrigtsen' src={ingebrigtsen} className="min-w-full h-40 rounded-lg"/>
              <h2 className="text-2xl font-semibold text-blue-700">{rankings1500[0].Athlete[0]}</h2>
              
              <Image src={`/flags/${rankings1500[0].Nationality}.png`} alt="Team" className='w-8' width={8} height={8}/>
            </button>
            </Link>

            <Link href={`/athletes/${encodeURIComponent(rankings5000[9].Athlete[0].split(" ")[1].toLowerCase())}`}>
              <button className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow h-64 min-w-full">
              <Image alt='fisher' src={fisher} className="min-w-full h-40 rounded-lg"/>
              <h2 className="text-2xl font-semibold text-blue-700">{rankings5000[9].Athlete[0]}</h2>
              
              <Image src={`/flags/${rankings5000[9].Nationality}.png`} alt="Team" className='w-8' width={8} height={8}/>
            </button>
            </Link>
            <Link href={`/athletes/${encodeURIComponent(rankings800[0].Athlete[0].split(" ")[1].toLowerCase())}`}>
              <button className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow h-64 min-w-full">
              <Image alt='sedjati' src={sedjati} className="min-w-full h-40 rounded-lg"/>
              <h2 className="text-2xl font-semibold text-blue-700">{rankings800[0].Athlete[0]}</h2>
              
              <Image src={`/flags/${rankings800[0].Nationality}.png`} alt="Team" className='w-8' width={8} height={8}/>
            </button>
            </Link>
          
        </div>
          </div>


          <div className='items-center justify-center border'>
          <h2 className='text-center font-bold'>Upcoming Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center text-center">
          {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event, index) => (
          <div key={index} className="event bg-white rounded-lg">
            <h3 className="font-bold">{event['Name']}</h3>
            <p>{dayjs(event['Date']).format('MMMM D, YYYY')}</p>
            <p>Venue: {event['Venue']}</p>
            <p>Competition Group: {event['Competition Group']}</p>
          </div>
          ))
          ) : (
          <p>No upcoming events.</p>
          )}
          </div>
          
          </div>


        </div>

        <div className="w-1/4 border">
          <div className='text-2xl font-bold text-center grow'>
          1500m Rankings
          </div>
          
          <div>
          {rankings1500.slice(0, 3).map((athlete, index) => (
            
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
    
    </div>
  );
};

export default HomePage;
