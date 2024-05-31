"use client";
import Link from 'next/link';

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Image from 'next/image';

const nike = require('../assets/teams/nike.png');
const on = require('../assets/teams/on.png');
const adidas = require('../assets/teams/adidas.png');
const nau = require('../assets/teams/nau.png');
const uw = require('../assets/teams/uw.png');
const none = require('../assets/teams/none.png');

const events = [
  "100m",
  "200m",
  "400m",
  "800m",
  "1500m",
  "5000m",
  "10000m",
  "Marathon",
  "110m Hurdles",
  "400m Hurdles",
  "3000m Steeplechase",
  "4x100m Relay",
  "4x400m Relay",
  "Long Jump",
  "Triple Jump",
  "High Jump",
  "Pole Vault",
  "Shot Put",
  "Discus Throw",
  "Hammer Throw",
  "Javelin Throw",
  "Decathlon",
];

const competitorsData: Record<string, { name: string; info: string, team: string }[]> = {
  "100m": [
    { name: "John Doe", info: "Best Performance: 10.25s", team: none },
    { name: "Jane Smith", info: "Best Performance: 10.32s", team: none },
    { name: "Alex Johnson", info: "Best Performance: 10.35s", team: none },
    // ...more competitors
  ],
  "200m": [
    { name: "Chris Lee", info: "Best Performance: 20.55s", team: none },
    { name: "Emily Davis", info: "Best Performance: 20.62s", team: none },
    { name: "Michael Brown", info: "Best Performance: 20.70s", team: none },
    // ...more competitors
  ],
  "400m": [
    { name: "Sarah Wilson", info: "Best Performance: 45.85s", team: none },
    { name: "David Martinez", info: "Best Performance: 45.90s", team: none },
    { name: "Katie Taylor", info: "Best Performance: 46.05s", team: none },
    // ...more competitors
  ],
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
  "4x100m Relay": [
    { name: "Team Alpha", info: "Best Performance: 40.10s", team: none },
    { name: "Team Bravo", info: "Best Performance: 40.20s", team: none },
    { name: "Team Charlie", info: "Best Performance: 40.30s", team: none },
    // ...more competitors
  ],
  "4x400m Relay": [
    { name: "Team Delta", info: "Best Performance: 3:00.50", team: none },
    { name: "Team Echo", info: "Best Performance: 3:01.00", team: none },
    { name: "Team Foxtrot", info: "Best Performance: 3:01.50", team: none },
    // ...more competitors
  ],
  "Long Jump": [
    { name: "Aiden Green", info: "Best Performance: 8.30m", team: none },
    { name: "Sophia Hall", info: "Best Performance: 8.32m", team: none },
    { name: "Jackson Allen", info: "Best Performance: 8.35m", team: none },
    // ...more competitors
  ],
  "Triple Jump": [
    { name: "Isaac Young", info: "Best Performance: 17.30m", team: none },
    { name: "Amelia Hernandez", info: "Best Performance: 17.32m", team: none },
    { name: "William King", info: "Best Performance: 17.35m", team: none },
    // ...more competitors
  ],
  "High Jump": [
    { name: "Mason Scott", info: "Best Performance: 2.30m", team: none },
    { name: "Abigail Wright", info: "Best Performance: 2.32m", team: none },
    { name: "Logan Perez", info: "Best Performance: 2.35m", team: none },
    // ...more competitors
  ],
  "Pole Vault": [
    { name: "Henry Adams", info: "Best Performance: 5.80m", team: none },
    { name: "Ella Clark", info: "Best Performance: 5.85m", team: none },
    { name: "Jack Mitchell", info: "Best Performance: 5.90m", team: none },
    // ...more competitors
  ],
  "Shot Put": [
    { name: "Alexander Lewis", info: "Best Performance: 21.30m", team: none },
    { name: "Victoria Roberts", info: "Best Performance: 21.32m", team: none },
    { name: "Sebastian Rivera", info: "Best Performance: 21.35m", team: none },
    // ...more competitors
  ],
  "Discus Throw": [
    { name: "Gabriel Walker", info: "Best Performance: 68.30m", team: none },
    { name: "Samantha Edwards", info: "Best Performance: 68.32m", team: none },
    { name: "Owen Parker", info: "Best Performance: 68.35m", team: none },
    // ...more competitors
  ],
  "Hammer Throw": [
    { name: "Carter Martinez", info: "Best Performance: 75.30m", team: none },
    { name: "Hannah Jackson", info: "Best Performance: 75.32m", team: none },
    { name: "Jayden Rodriguez", info: "Best Performance: 75.35m", team: none },
    // ...more competitors
  ],
  "Javelin Throw": [
    { name: "Julian Thompson", info: "Best Performance: 80.30m", team: none },
    { name: "Ella Taylor", info: "Best Performance: 80.32m", team: none },
    { name: "Levi Garcia", info: "Best Performance: 80.35m", team: none },
    // ...more competitors
  ],
  "Decathlon": [
    { name: "Dylan White", info: "Best Performance: 8500 points", team: none },
    { name: "Lily Harris", info: "Best Performance: 8505 points", team: none },
    { name: "Grayson Lewis", info: "Best Performance: 8510 points", team: none },
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
            className="block w-48 p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 focus:ring-blue-500 focus:border-blue-500"
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
            
            <Link href={`/athletes/${encodeURIComponent(competitor.name.split(" ")[1].toLowerCase())}`}>
              <button key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-semibold text-blue-700">{competitor.name}</h2>
              <p className="text-gray-600 mt-2">{competitor.info}</p>
              
              <Image src={competitor.team} alt="Team" width={128} height={128} />
            </button>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RankingPage;