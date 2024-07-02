"use client";

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Link from 'next/link';
import logo from '../../assets/ttt1.png';
import Image from 'next/image';
import adidas from '../../assets/teams/adidas.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';


const NikePage: React.FC = () => {
  
  const [currentIndex, setCurrentIndex] = useState(0);


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold text-center text-blue-700 mb-4">
        <Image src={logo} alt="Logo" width={128} height={128} />
          <Link href="/">
            <button >
              Track the Track
            </button>
          </Link>
          <Image src={adidas} alt="Logo" width={128} height={128} />
        </h1>
        <h2 className="text-3xl font-mono text-center text-blue-500">
          Road to the Olympics
        </h2>
        <h3 className="text-3xl font-mono text-center text-blue-500">
          Adidas
        </h3>
      </header>
      <div className="flex flex-col items-center">

      <div className="flex space-x-4 mb-4">
      
      </div>
    </div>
    </div>
  );
};

export default NikePage;