"use client";
import Link from 'next/link';

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Image from 'next/image';
import athletes800 from '../../800m.json';
import athletes1500 from '../../1500m.json';
import athletes5000 from '../../5000m.json';
import athletes10000 from '../../10000m.json';
import Header from '../../components/Header'
import { flags } from "../assets/flags/flags";
import norway from '../assets/flags/NOR.png';

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
];
const competitorsData: Record<string, {Athlete: string[], Mark: string, Venue: string, Date: string, Nationality: string}[]> = {
  "800m": athletes800,
  "1500m": athletes1500,
  "5000m": athletes5000,
  "10000m": athletes10000,
}
type Record = {
  Athlete: string[],
  Mark: string,
  Venue: string, 
  Date: string, 
  Nationality: string
};
const areRecordsEqual = (a: Record, b: Record): boolean => {
  return (
    a.Athlete.join(',') === b.Athlete.join(',')
  );
};
const all_athletes: Record[] = [...athletes800, ...athletes1500, ...athletes5000, ...athletes10000];

const unique_list = all_athletes.filter((record, index, self) => 
  index === self.findIndex((r) => areRecordsEqual(r, record))
);

const sortedList = unique_list.sort((a, b) => {
  if (a.Athlete[0].split(" ")[1] < b.Athlete[0].split(" ")[1]) return -1;
  if (a.Athlete[0].split(" ")[1] > b.Athlete[0].split(" ")[1]) return 1;
  return 0;
});


const AthletesPage: React.FC = () => {
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
        might add a search bar or filter, gonna be a bit of work to implement prolly
        <div className="max-w-sm mx-auto w-60">
          <label htmlFor="event-selector" className="block text-lg font-medium text-blue-600 mb-3">
            Select an Country:
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
          {sortedList.map((athlete, index) => (
            
            <Link href={`/athletes/${encodeURIComponent(athlete.Athlete[0].split(" ")[1].toLowerCase())}`}>
              <button key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow h-40 min-w-full">
              <h2 className="text-2xl font-semibold text-blue-700">{athlete.Athlete[0]}</h2>
              
              <Image src={`/flags/${athlete.Nationality}.png`} alt="Team" className='w-8' width={8} height={8}/>
              
            </button>
            </Link>
          ))}
        </div>
      </section>
    </div>
    </div>
  );
};

export default AthletesPage;