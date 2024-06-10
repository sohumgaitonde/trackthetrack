"use client";

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Link from 'next/link';
import logo from '../../assets/ttt1.png';
import Image from 'next/image';
import athlete_picture from '../../assets/athletes/teare.jpeg';
import team_logo from '../../assets/teams/nike.png';
import instagram from '../../assets/instagram.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import youtube from "../../../youtube_results.json";
import spotify from "../../../spotify_search_results.json";
import results from "../../../cooper.json";


const TearePage: React.FC = () => {
  const athlete = 'Cooper Teare';
  const videos = youtube[athlete];
  const events = Object.keys(results);
  const result_columns = Object.keys(results[events[0]][0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 3, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 3, videos.length - 3));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold text-center text-blue-700 mb-4 w-20">
        
          <Link href="/">
            <button >
            <Image src={logo} alt="Logo"/>
            </button>
          </Link>
          
        </h1>
        <h3 className="text-5xl font-extrabold text-center text-blue-500">
          {athlete}
        </h3>
        <Image src={athlete_picture} alt="Logo" width={128} height={128} />
        <Image src={team_logo} alt="Logo" width={128} height={128} />
      </header>
      
      <div>
        {
          events.map((event, index) => (
            <div key={index} className="w-full max-w-md">
              <div className="bg-black text-white p-2 text-lg font-bold mt-4">{event}</div>
              <div>
              <table className="w-full text-left">
              <thead className="bg-purple-400 text-white">
              <tr>
              {result_columns.map((column, index) => (
                <th className="p-2">{column}</th>
              ))}
              </tr>
              </thead>

              <tbody>
              <tr className="bg-white">
                
              {
                results[event].map((result, index) => (
                  <>
                    {result_columns.map((col, index) => (
                    <>
                      <td className="p-2">{result[col]}</td>
                    </>
                  ))}
                  </>
                  
              ))
              }
              </tr>
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
    <div>
      <button>
      <Link href='https://www.instagram.com/cooperteare/'>
        <Image src={instagram} alt="instagram" width={128} height={128} />
      </Link>
      </button>
    </div>
      <div>
        {spotify[athlete].episodes.map((episode, index) => (
          <div key={index} className="w-full max-w-md">
            <div className="aspect-w-16 aspect-h-9">
              <Link href={`https://open.spotify.com/episode/${episode.id}`} target="_blank" rel="noopener noreferrer">
                {episode.name}
                <img src={episode.images[0].url}>
                </img>
                
              </Link>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TearePage;