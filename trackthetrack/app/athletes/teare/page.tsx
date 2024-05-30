"use client";

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Link from 'next/link';
import logo from '../../assets/ttt1.png';
import Image from 'next/image';


const TearePage: React.FC = () => {
  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Image src={logo} alt="Logo" width={128} height={128} />
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold text-center text-blue-700 mb-4">
          <Link href="/">
            <button >
              Track the Track
            </button>
          </Link>
          
        </h1>
        <h2 className="text-3xl font-semibold text-center text-blue-500">
          Road to the Olympics
        </h2>
        <h3 className="text-3xl font-semibold text-center text-blue-500">
          Cooper Teare
        </h3>
      </header>
      <div className="flex flex-col items-center justify-center h-screen">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/OMNgKw566u8"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      
    
    </div>
  );
};

export default TearePage;