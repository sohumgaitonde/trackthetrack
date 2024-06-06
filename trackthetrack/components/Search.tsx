import Link from 'next/link';
import React, { useState, useEffect } from 'react';


const athletes = [
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
  const [filteredAthletes, setFilteredAthletes] = useState([{}]);

  useEffect(() => {
    if (query) {
      const filtered = athletes.filter(athlete =>
        athlete.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredAthletes(filtered);
     } else {
      setFilteredAthletes(athletes);
    }
  }, [query]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className="relative w-full max-w-md mx-auto mt-4">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for an athlete"
        className="w-full p-2 border border-gray-300 rounded"
      />
      {query && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-y-auto">
          {filteredAthletes.map(athlete => (
            <li key={athlete.name} className="p-2 cursor-pointer hover:bg-gray-200">
              <Link href={`/athletes/${encodeURIComponent(athlete.name.split(" ")[1].toLowerCase())}`}>
                <button>
                {athlete.name}
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