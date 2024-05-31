"use client";

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Link from 'next/link';
import logo from '../../assets/ttt1.png';
import Image from 'next/image';
import teare from '../../assets/athletes/teare.jpeg';
import nike from '../../assets/teams/nike.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';


const TearePage: React.FC = () => {
  const urls = ['https://www.youtube.com/embed/OMNgKw566u8', 'https://www.youtube.com/embed/eVoQjQ5wR2A', 'https://www.youtube.com/embed/qQvI1f3GqTE', 'https://www.youtube.com/embed/hSM5zbqU7e8', 'https://www.youtube.com/embed/6_lTXHvTvIA', 'https://www.youtube.com/embed/dO41zkMOCGw']
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 3, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 3, urls.length - 3));
  };

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
          <Image src={nike} alt="Logo" width={128} height={128} />
        </h1>
        <h2 className="text-3xl font-semibold text-center text-blue-500">
          Road to the Olympics
        </h2>
        <h3 className="text-3xl font-semibold text-center text-blue-500">
          Cooper Teare
        </h3>
        <Image src={teare} alt="Logo" width={128} height={128} />
      </header>
      <div className="flex flex-col items-center">

      <div className="flex space-x-4 mb-4">
      <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 h-1/2 my-14"
        >
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
        </button>
        {urls.slice(currentIndex, currentIndex + 3).map((url, index) => (
          <div key={index} className="w-full max-w-md">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-full"
                src={url}
                title={`YouTube video player ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
        <button
          onClick={handleNext}
          disabled={currentIndex >= urls.length - 3}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 h-1/2 my-14"
        >
          <FontAwesomeIcon icon={faArrowRight} size="lg" />
        </button>
      </div>
    </div>
    </div>
  );
};

export default TearePage;