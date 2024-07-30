import Link from 'next/link';
import React, { useState, useEffect} from 'react';
import Search from './Search';
import logo from '../app/assets/ttt1.png';
import Image from 'next/image';
import Head from 'next/head';
import Script from 'next/script';

const Header = () => {

  return (
    <>
    <Head>
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <Script src="https://cdn.tailwindcss.com" strategy='afterInteractive'></Script>
  </Head>
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
    <a href="/athlete-page" className="text-zinc-800 dark:text-white hover:text-orange-500">Athletes</a>
    <a href="#" className="text-zinc-800 dark:text-white hover:text-orange-500">Teams</a>
    <a href="/olympics" className="text-zinc-800 dark:text-white hover:text-orange-500">Olympians</a>
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