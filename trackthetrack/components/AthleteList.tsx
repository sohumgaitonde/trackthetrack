"use client";

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Link from 'next/link';
import Image from 'next/image';

import Athlete from './Athlete';

interface AthleteListProps {
  athletes: {
    Athlete: string[];
    Mark: string;
    Venue: string;
    Date: string;
    Nationality: string;
  }[];
}

const AthleteList: React.FC<AthleteListProps> = ({ athletes }) => {
  const [filter, setFilter] = useState('');

  const filteredAthletes = athletes.filter((athlete) =>
    athlete.Athlete[0].toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by name"
        className="border p-2 mb-4 w-full"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAthletes.map((athlete, index) => (
            
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
  );
};

export default AthleteList;