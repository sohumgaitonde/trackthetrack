"use client";
import Link from 'next/link';

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Image from 'next/image';

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

const competitorsData: Record<string, { name: string; info: string }[]> = {
  "100m": [
    { name: "John Doe", info: "Best Performance: 10.25s" },
    { name: "Jane Smith", info: "Best Performance: 10.32s" },
    { name: "Alex Johnson", info: "Best Performance: 10.35s" },
    // ...more competitors
  ],
  "200m": [
    { name: "Chris Lee", info: "Best Performance: 20.55s" },
    { name: "Emily Davis", info: "Best Performance: 20.62s" },
    { name: "Michael Brown", info: "Best Performance: 20.70s" },
    // ...more competitors
  ],
  "400m": [
    { name: "Sarah Wilson", info: "Best Performance: 45.85s" },
    { name: "David Martinez", info: "Best Performance: 45.90s" },
    { name: "Katie Taylor", info: "Best Performance: 46.05s" },
    // ...more competitors
  ],
  "800m": [
    { name: "Daniel Anderson", info: "Best Performance: 1:45.20" },
    { name: "Lauren Thomas", info: "Best Performance: 1:45.50" },
    { name: "Ryan Jackson", info: "Best Performance: 1:45.70" },
    // ...more competitors
  ],
  "1500m": [
    { name: "Cooper Teare", info: "Best Performance: 3:32.16" },
    { name: "Yared Nuguse", info: "Best Performance: 3:33.43" },
    { name: "Hobbs Kessler", info: "Best Performance: 3:33.66" },
    { name: "Colin Sahlman", info: "Best Performance: 3:33.96" },
    { name: "Nico Young", info: "Best Performance: 3:34.56" },
    { name: "Nathan Green", info: "Best Performance: 3:34.79" },
    // ...more competitors
  ],
  "5000m": [
    { name: "Matthew Rodriguez", info: "Best Performance: 13:10.50" },
    { name: "Elizabeth Lewis", info: "Best Performance: 13:11.00" },
    { name: "Anthony Lee", info: "Best Performance: 13:12.20" },
    // ...more competitors
  ],
  "10000m": [
    { name: "Andrew Walker", info: "Best Performance: 27:30.50" },
    { name: "Olivia Young", info: "Best Performance: 27:31.00" },
    { name: "Joshua Hall", info: "Best Performance: 27:32.50" },
    // ...more competitors
  ],
  "Marathon": [
    { name: "Benjamin King", info: "Best Performance: 2:10:30" },
    { name: "Grace Wright", info: "Best Performance: 2:11:00" },
    { name: "Tyler Scott", info: "Best Performance: 2:12:15" },
    // ...more competitors
  ],
  "110m Hurdles": [
    { name: "Austin Adams", info: "Best Performance: 13.25s" },
    { name: "Brittany Carter", info: "Best Performance: 13.30s" },
    { name: "Zachary Rivera", info: "Best Performance: 13.35s" },
    // ...more competitors
  ],
  "400m Hurdles": [
    { name: "Caleb Mitchell", info: "Best Performance: 48.75s" },
    { name: "Natalie Perez", info: "Best Performance: 48.85s" },
    { name: "Ethan Roberts", info: "Best Performance: 48.90s" },
    // ...more competitors
  ],
  "3000m Steeplechase": [
    { name: "Liam Turner", info: "Best Performance: 8:30.50" },
    { name: "Chloe Parker", info: "Best Performance: 8:31.00" },
    { name: "Lucas Edwards", info: "Best Performance: 8:32.20" },
    // ...more competitors
  ],
  "4x100m Relay": [
    { name: "Team Alpha", info: "Best Performance: 40.10s" },
    { name: "Team Bravo", info: "Best Performance: 40.20s" },
    { name: "Team Charlie", info: "Best Performance: 40.30s" },
    // ...more competitors
  ],
  "4x400m Relay": [
    { name: "Team Delta", info: "Best Performance: 3:00.50" },
    { name: "Team Echo", info: "Best Performance: 3:01.00" },
    { name: "Team Foxtrot", info: "Best Performance: 3:01.50" },
    // ...more competitors
  ],
  "Long Jump": [
    { name: "Aiden Green", info: "Best Performance: 8.30m" },
    { name: "Sophia Hall", info: "Best Performance: 8.32m" },
    { name: "Jackson Allen", info: "Best Performance: 8.35m" },
    // ...more competitors
  ],
  "Triple Jump": [
    { name: "Isaac Young", info: "Best Performance: 17.30m" },
    { name: "Amelia Hernandez", info: "Best Performance: 17.32m" },
    { name: "William King", info: "Best Performance: 17.35m" },
    // ...more competitors
  ],
  "High Jump": [
    { name: "Mason Scott", info: "Best Performance: 2.30m" },
    { name: "Abigail Wright", info: "Best Performance: 2.32m" },
    { name: "Logan Perez", info: "Best Performance: 2.35m" },
    // ...more competitors
  ],
  "Pole Vault": [
    { name: "Henry Adams", info: "Best Performance: 5.80m" },
    { name: "Ella Clark", info: "Best Performance: 5.85m" },
    { name: "Jack Mitchell", info: "Best Performance: 5.90m" },
    // ...more competitors
  ],
  "Shot Put": [
    { name: "Alexander Lewis", info: "Best Performance: 21.30m" },
    { name: "Victoria Roberts", info: "Best Performance: 21.32m" },
    { name: "Sebastian Rivera", info: "Best Performance: 21.35m" },
    // ...more competitors
  ],
  "Discus Throw": [
    { name: "Gabriel Walker", info: "Best Performance: 68.30m" },
    { name: "Samantha Edwards", info: "Best Performance: 68.32m" },
    { name: "Owen Parker", info: "Best Performance: 68.35m" },
    // ...more competitors
  ],
  "Hammer Throw": [
    { name: "Carter Martinez", info: "Best Performance: 75.30m" },
    { name: "Hannah Jackson", info: "Best Performance: 75.32m" },
    { name: "Jayden Rodriguez", info: "Best Performance: 75.35m" },
    // ...more competitors
  ],
  "Javelin Throw": [
    { name: "Julian Thompson", info: "Best Performance: 80.30m" },
    { name: "Ella Taylor", info: "Best Performance: 80.32m" },
    { name: "Levi Garcia", info: "Best Performance: 80.35m" },
    // ...more competitors
  ],
  "Decathlon": [
    { name: "Dylan White", info: "Best Performance: 8500 points" },
    { name: "Lily Harris", info: "Best Performance: 8505 points" },
    { name: "Grayson Lewis", info: "Best Performance: 8510 points" },
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
        <div className="max-w-lg mx-auto">
          <label htmlFor="event-selector" className="block text-lg font-medium text-blue-600 mb-3">
            Select an Event:
          </label>
          <select
            id="event-selector"
            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 focus:ring-blue-500 focus:border-blue-500"
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
            </button>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RankingPage;