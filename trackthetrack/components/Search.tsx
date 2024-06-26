import Link from 'next/link';
import React, { useState, useEffect} from 'react';
import athletes1500 from '../1500m.json';

const getUniqueAthleteNames = (data: { Athlete: string[]; Mark: string; Venue: string; Date: string; Nationality: string;  }[]): string[] => {
  const names = data.map(record => record.Athlete[0]);
  return Array.from(new Set(names));
};

const athletes1 = [
  { name: 'Cooper Teare', path: '/athletes/teare' },
  { name: 'Yared Nuguse', path: '/athletes/nuguse' },
  { name: 'Hobbs Kessler', path: '/athletes/kessler' },
  { name: 'Colin Sahlman', path: '/athletes/sahlman' },
  { name: 'Nico Young', path: '/athletes/young' },
  { name: 'Nathan Green', path: '/athletes/green' },
  // Add more athletes here
];

const Search = () => {
  const [query, setQuery] = useState('');
  const [filteredAthletes, setFilteredAthletes] = useState<string[]>([]);
  const athletes = getUniqueAthleteNames(athletes1500);
  useEffect(() => {
    if (query) {
      const filtered = athletes.filter(athlete =>
        athlete.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredAthletes(filtered);
    } else {
      setFilteredAthletes(athletes);
    }
  }, [query]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && filteredAthletes.length > 0) {
      const firstAthlete = filteredAthletes[0];
      const firstName = firstAthlete.split(" ")[1].toLowerCase();
      window.location.href = `/athletes/${encodeURIComponent(firstName)}`;
    }
  };

  
  

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        placeholder="Search for an athlete"
        className="w-full p-2 border border-gray-300 rounded"
      />
      {query && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-y-auto">
          {filteredAthletes.map((athlete, index) => (
            <li key={athlete} className="p-2 cursor-pointer hover:bg-gray-200">
              <Link href={`/athletes/${encodeURIComponent(athlete.split(" ")[1].toLowerCase())}`}>
                <button>
                {athlete}
                </button>
              </Link>
            </li>
          ))}
          {filteredAthletes.length === 0 && (
            <li className="p-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;