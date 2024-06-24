import Link from 'next/link';
import React, { useState, useEffect} from 'react';
import Search from './Search';
import logo from '../app/assets/ttt1.png';
import Image from 'next/image';


const athletes = [
  { name: 'Cooper Teare', path: '/athletes/teare' },
  { name: 'Yared Nuguse', path: '/athletes/nuguse' },
  { name: 'Hobbs Kessler', path: '/athletes/kessler' },
  { name: 'Colin Sahlman', path: '/athletes/sahlman' },
  { name: 'Nico Young', path: '/athletes/young' },
  { name: 'Nathan Green', path: '/athletes/green' },
  // Add more athletes here
];

const Header = () => {

  return (
    <>
    <head>
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <header className="bg-white dark:bg-zinc-800 p-4 shadow-md flex items-center justify-between">
  <div className="flex items-center space-x-4">
    <Image src={logo} alt="Logo" width={128} height={128}/>
    <span className="text-xl font-bold text-zinc-800 dark:text-white">Track The Track</span>
  </div>
  <nav className="flex space-x-4">
    <a href="/" className="text-zinc-800 dark:text-white hover:text-orange-500">Home</a>
    <a href="/rankings2" className="text-zinc-800 dark:text-white hover:text-orange-500">Rankings</a>
    <a href="/calendar2" className="text-zinc-800 dark:text-white hover:text-orange-500">Calendar</a>
    <a href="/about-us" className="text-zinc-800 dark:text-white hover:text-orange-500">About Us</a>
    <a href="#" className="text-zinc-800 dark:text-white hover:text-orange-500">Athletes</a>
    <a href="#" className="text-zinc-800 dark:text-white hover:text-orange-500">Teams</a>
  </nav>
  <div className="relative">
  <Search />
    
  </div>
</header>
  </body>
    </>
  );
};

export default Header;