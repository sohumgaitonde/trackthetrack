"use client";
import Link from 'next/link';

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Image from 'next/image';
import athletes from '../../1500m.json';

const nike = require('../assets/teams/nike.png');
const on = require('../assets/teams/on.png');
const adidas = require('../assets/teams/adidas.png');
const nau = require('../assets/teams/nau.png');
const uw = require('../assets/teams/uw.png');
const none = require('../assets/teams/none.png');

const events = [
  
  "800m",
  "1500m",
  "5000m",
  "10000m",
  "Marathon",
  "110m Hurdles",
  "400m Hurdles",
  "3000m Steeplechase",
  
];

const competitorsData: Record<string, { name: string; info: string, team: string }[]> = {
  
  "800m": [
    { name: "Daniel Anderson", info: "Best Performance: 1:45.20", team: none },
    { name: "Lauren Thomas", info: "Best Performance: 1:45.50", team: none },
    { name: "Ryan Jackson", info: "Best Performance: 1:45.70", team: none },
    // ...more competitors
  ],
  "1500m": [
    { name: "Cooper Teare", info: "Best Performance: 3:32.16", team: nike },
    { name: "Yared Nuguse", info: "Best Performance: 3:33.43", team: on },
    { name: "Hobbs Kessler", info: "Best Performance: 3:33.66", team: adidas },
    { name: "Colin Sahlman", info: "Best Performance: 3:33.96", team: nau },
    { name: "Nico Young", info: "Best Performance: 3:34.56", team: nau },
    { name: "Nathan Green", info: "Best Performance: 3:34.79", team: uw },
    // ...more competitors
  ],
  "5000m": [
    { name: "Matthew Rodriguez", info: "Best Performance: 13:10.50", team: none },
    { name: "Elizabeth Lewis", info: "Best Performance: 13:11.00", team: none },
    { name: "Anthony Lee", info: "Best Performance: 13:12.20", team: none },
    // ...more competitors
  ],
  "10000m": [
    { name: "Andrew Walker", info: "Best Performance: 27:30.50", team: none },
    { name: "Olivia Young", info: "Best Performance: 27:31.00", team: none },
    { name: "Joshua Hall", info: "Best Performance: 27:32.50", team: none },
    // ...more competitors
  ],
  "Marathon": [
    { name: "Benjamin King", info: "Best Performance: 2:10:30", team: none },
    { name: "Grace Wright", info: "Best Performance: 2:11:00", team: none },
    { name: "Tyler Scott", info: "Best Performance: 2:12:15", team: none },
    // ...more competitors
  ],
  "110m Hurdles": [
    { name: "Austin Adams", info: "Best Performance: 13.25s", team: none },
    { name: "Brittany Carter", info: "Best Performance: 13.30s", team: none },
    { name: "Zachary Rivera", info: "Best Performance: 13.35s", team: none },
    // ...more competitors
  ],
  "400m Hurdles": [
    { name: "Caleb Mitchell", info: "Best Performance: 48.75s", team: none },
    { name: "Natalie Perez", info: "Best Performance: 48.85s", team: none },
    { name: "Ethan Roberts", info: "Best Performance: 48.90s", team: none },
    // ...more competitors
  ],
  "3000m Steeplechase": [
    { name: "Liam Turner", info: "Best Performance: 8:30.50", team: none },
    { name: "Chloe Parker", info: "Best Performance: 8:31.00", team: none },
    { name: "Lucas Edwards", info: "Best Performance: 8:32.20", team: none },
    // ...more competitors
  ],
};
const RankingPage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [competitors, setCompetitors] = useState(competitorsData[events[0]]);
  const [myBool, setmyBool] = useState(true);
  function calendar() {
    setmyBool(false)
  }
  var competitor = competitors[0];
  var link = `athletes/${competitor.name.split(" ")[1]}`;

  useEffect(() => {
    setCompetitors(competitorsData[selectedEvent]);
  }, [selectedEvent]);

  return (
    <div className="min-h-40 bg-gray-100 flex items-center justify-center">
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
          {competitors.map((competitor, index) => (
            
            <Link key={index} href={`/athletes/${encodeURIComponent(competitor.name.split(" ")[1].toLowerCase())}`}>
              <button key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow h-40">
              <h2 className="text-2xl font-semibold text-blue-700">{competitor.name}</h2>
              <p className="text-gray-600 mt-2">{competitor.info}</p>
              
              <Image src={competitor.team} alt="Team" className='w-8' />
            </button>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RankingPage;