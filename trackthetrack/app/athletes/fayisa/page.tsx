"use client";

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Link from 'next/link';
import logo from '../../assets/ttt1.png';
import Image from 'next/image';
import athlete_picture from '../../assets/athletes/fayisa.jpg';
import team_logo from '../../assets/teams/nike.png';
import instagram from '../../assets/instagram.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import youtube from "../../../youtube_results.json";
import spotify from "../../../spotify_search_results.json";
import results from "../../../cooper.json";
import Spotify from 'react-spotify-embed';
import Search from '../../../components/Search';
import athlete_info from '../../../athlete_info.json'
import Header from '../../../components/Header'


const FayisaPage: React.FC = () => {
  const athlete = 'Abdisa Fayisa';
  const videos = youtube[athlete];
  const events = Object.keys(results);
  const result_columns = Object.keys(results[events[0]][0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const even = (index: any) => {
    return index % 2 === 0;
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 3, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 3, videos.length - 3));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <head>
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
  <>
      <Header />
    </>
  </body>
      <div className="container mx-auto p-4">
      
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
            <Image src={athlete_picture} alt="Athlete Photo" className="w-48 h-48 rounded-full mb-4"/>

            <div className="text-center mb-4">
                <p className="text-xl">Age: {athlete_info['age']}</p>
                <p className="text-xl">Nationality: {athlete_info['nationality']}</p>
            </div>
            <a href='https://www.instagram.com/cooperteare/' target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Follow on Instagram
            </a>
        </div>
      </div>

      <header className="mb-12">
        <h1 className="text-5xl font-extrabold text-center text-blue-700 mb-4 w-20">
        
          <Link href="/">
            <button >
            <Image src={logo} alt="Logo" className="shadow-lg hover:shadow-xl transition-shadow"/>
            </button>
          </Link>
          
        </h1>
        <h3 className="text-5xl font-extrabold text-center text-blue-500">
          {athlete}
        </h3>
        <Image src={athlete_picture} alt="Logo" width={128} height={128} />
        <Image src={team_logo} alt="Logo" width={128} height={128} />
        
      <button>
      <Link href='https://www.instagram.com/cooperteare/'>
        <Image src={instagram} alt="instagram" width={128} height={128} />
      </Link>
      </button>
   
      </header>

    <div className="bg-blue-500 p-8">
  <h2 className="text-3xl font-bold mb-6">Honours Summary</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <div className="bg-blue-200 p-4 rounded-lg">
      <div className="bg-blue-400 h-1 mb-4"></div>
      <div className="text-4xl font-bold text-blue-600">1x</div>
      <p className="text-lg font-semibold">Pan American U20 Championships \n Bronze medallist</p>
    </div>
    <div className="bg-blue-200 p-4 rounded-lg">
      <div className="bg-blue-400 h-1 mb-4"></div>
      <div className="text-4xl font-bold text-blue-600">1x</div>
      <p className="text-lg font-semibold">NCAA champion</p>
    </div>
    <div className="bg-blue-200 p-4 rounded-lg">
      <div className="bg-blue-400 h-1 mb-4"></div>
      <div className="text-4xl font-bold text-blue-600">1x</div>
      <p className="text-lg font-semibold">NCAA Indoor champion</p>
    </div>
    <div className="bg-blue-200 p-4 rounded-lg">
      <div className="bg-blue-400 h-1 mb-4"></div>
      <div className="text-4xl font-bold text-blue-600">1x</div>
      <p className="text-lg font-semibold">National champion</p>
    </div>
  </div>
</div>


      <div>
        {
          events.map((event, index) => (
            <div key={index} className="w-full min-w-lg">
              <div className="bg-black text-white p-2 text-lg font-bold mt-4 min-w-full">{event}</div>
              <div>
              <table className="w-full text-left">
              <thead className="w-full bg-blue-400 text-white">
              <tr>
              {result_columns.map((column, index) => (
                <th className="p-2">{column}</th>
              ))}
              </tr>
              </thead>

              <tbody>
              
                
              {
                results[event].map((result, index) => (
                  <tr className={`${even(index) ? 'bg-white' : 'bg-gray-200'}`}>
                    {result_columns.map((col, index) => (
                    <>
                      <td className="p-2">{result[col]}</td>
                    </>
                  ))}
                  </tr>
                  
              ))
              }
              
              </tbody>
              </table>
              </div>
              

              
            </div>

          ))
        }
      </div>
      
      <div className="flex flex-col items-center">

      <div className="flex space-x-4 mb-4">
      <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 h-1/2 my-14"
        >
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
        </button>
        {videos.slice(currentIndex, currentIndex + 3).map((video, index) => (
          <div key={index} className="w-full max-w-md">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${video['videoId']}`}
                title={`YouTube video player ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              {video['title']}
            </div>
          </div>
        ))}
        <button
          onClick={handleNext}
          disabled={currentIndex >= videos.length - 3}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 h-1/2 my-14"
        >
          <FontAwesomeIcon icon={faArrowRight} size="lg" />
        </button>
      </div>
    </div>
    <div className="container mx-auto p-4">
  <div className="flex flex-wrap -mx-2">
        {spotify[athlete].episodes.slice(0, 3).map((episode, index) => (
          <div key = {index} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
              <iframe key={index} className="w-full mb-0 ma-0" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              src={`https://open.spotify.com/embed/episode/${episode.id}?utm_source=generator`}>
              </iframe>
          </div>
        ))}
        </div>
      </div>
        

    </div>
  );
};

export default FayisaPage;