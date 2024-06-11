"use client";
import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Image from 'next/image';
import logo from '../assets/ttt1.png';
import sohum from '../assets/sohum.jpeg';
import grant from '../assets/grant.jpeg';
import elijah from '../assets/elijah.jpeg'
import Search from '../../components/Search';


const HomePage: React.FC = () => {

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
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
    <a href="/rankings" className="text-zinc-800 dark:text-white hover:text-orange-500">Rankings</a>
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




    

    <header className="text-center my-8">
        <h1 className="text-4xl font-bold text-blue-600">About Us</h1>
        <p className="text-lg text-gray-700 mt-2">Meet the main developers behind our project</p>
    </header>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Image src={sohum} alt="Sohum Gaitonde" className="w-32 h-32 rounded-full mx-auto mb-4"/>
            <h2 className="text-2xl font-semibold text-blue-700">Sohum Gaitonde</h2>
            <p className="text-gray-600 mt-2">Senior Developer</p>
            <p className="text-gray-600 mt-2">Sohum is dedicated to creating beautiful and user-friendly interfaces that enhance user experience.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Image src={elijah} alt="Elijah McCauley" className="w-32 h-32 rounded-full mx-auto mb-4"/>
            <h2 className="text-2xl font-semibold text-blue-700">Elijah McCauley</h2>
            <p className="text-gray-600 mt-2">Frontend Developer</p>
            <p className="text-gray-600 mt-2">Elijah is passionate about developing innovative solutions and leading the development team.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Image src={grant} alt="Grant Gaffney" className="w-32 h-32 rounded-full mx-auto mb-4"/>
            <h2 className="text-2xl font-semibold text-blue-700">Grant Gaffney</h2>
            <p className="text-gray-600 mt-2">Backend Developer</p>
            <p className="text-gray-600 mt-2">Grant specializes in backend development and database management, ensuring our applications run smoothly.</p>
        </div>
        
    </div>



      
      
    
    </div>
  );
};

export default HomePage;
