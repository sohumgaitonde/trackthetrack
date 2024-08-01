"use client";
import Link from 'next/link';

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Image from 'next/image';
import olympic800 from '../../olympic_800.json';
import olympic1500 from '../../olympic_1500.json';
import olympic5000 from '../../olympic_5000.json';
import olympic10000 from '../../olympic_10000.json';
import Header from '../../components/Header';
import olympics from '../../olympic_athletes.json';

const nike = require('../assets/teams/nike.png');

const events = [
  "800m",
  "1500m",
  "5000m",
  "10000m",
];
const competitorsData: Record<string, {Athlete: string, Nationality: string}> = {
  "800m": olympic800,
  "1500m": olympic1500,
  "5000m": olympic5000,
  "10000m": olympic10000,
}

const OlympicsPage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [competitors, setCompetitors] = useState(competitorsData[events[0]]);
  const [myBool, setmyBool] = useState(true);
  function calendar() {
    setmyBool(false)
  }
  var competitor = competitors[0];
  var link = `athletes/${competitor.Athlete[0].split(" ")[1]}`;

  useEffect(() => {
    setCompetitors(competitorsData[selectedEvent]);
  }, [selectedEvent]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <>
        <Header/>
      </>

    <div className="min-h-40 bg-gray-100 items-center justify-center">
      <section className="mb-12">
        <div className="max-w-sm mx-auto w-60">
          <label htmlFor="event-selector" className="block text-lg font-medium text-blue-600 mb-3">
            Select an Event:
          </label>
          <select
            id="event-selector"
            className="block w-48 p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 shadow-lg hover:shadow-xl transition-shadow"
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
          >
            {events.map((event) => (
              <option key={event} value={event}>
                {event}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitors.map((athlete, index) => (
            
            <Link key={index} href={`/athletes/${encodeURIComponent(athlete.Athlete.split(" ")[1].toLowerCase())}`}>
              <button key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow h-40 min-w-full">
              <h2 className="text-2xl font-semibold text-blue-700">{athlete.Athlete}</h2>
              
              <Image src={`/flags/${athlete.Nationality.substring(0,3).toUpperCase()}.png`} alt="Team" className='w-8' width={8} height={8}/>
              
            </button>
            </Link>
          ))}
        </div>
      </section>
    </div>
    </div>
  );
};

export default OlympicsPage;