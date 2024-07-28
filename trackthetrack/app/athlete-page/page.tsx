"use client";
import Link from 'next/link';

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Image from 'next/image';
import athletes800 from '../../800m.json';
import athletes1500 from '../../1500m.json';
import athletes5000 from '../../5000m.json';
import athletes10000 from '../../10000m.json';
import Header from '../../components/Header'
import { flags } from "../assets/flags/flags";
import norway from '../assets/flags/NOR.png';
import AthleteList from '../../components/AthleteList';

const nike = require('../assets/teams/nike.png');
const on = require('../assets/teams/on.png');
const adidas = require('../assets/teams/adidas.png');
const nau = require('../assets/teams/nau.png');
const uw = require('../assets/teams/uw.png');
const none = require('../assets/teams/none.png');

const events = [
  "800m",
  "1500m",
  "5000m",
  "10000m",
];
const competitorsData: Record<string, {Athlete: string[], Mark: string, Venue: string, Date: string, Nationality: string}[]> = {
  "800m": athletes800,
  "1500m": athletes1500,
  "5000m": athletes5000,
  "10000m": athletes10000,
}
type Record = {
  Athlete: string[],
  Mark: string,
  Venue: string, 
  Date: string, 
  Nationality: string
};
const areRecordsEqual = (a: Record, b: Record): boolean => {
  return (
    a.Athlete.join(',') === b.Athlete.join(',')
  );
};
const all_athletes: Record[] = [...athletes800, ...athletes1500, ...athletes5000, ...athletes10000];

const unique_list = all_athletes.filter((record, index, self) => 
  index === self.findIndex((r) => areRecordsEqual(r, record))
);

const sortedList = unique_list.sort((a, b) => {
  if (a.Athlete[0].split(" ")[1] < b.Athlete[0].split(" ")[1]) return -1;
  if (a.Athlete[0].split(" ")[1] > b.Athlete[0].split(" ")[1]) return 1;
  return 0;
});


const AthletesPage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [competitors, setCompetitors] = useState(competitorsData[events[0]]);
  const [myBool, setmyBool] = useState(true);
  function calendar() {
    setmyBool(false)
  }
  var competitor = competitors[0];
  var link = `athletes/${competitor.Athlete[0].split(" ")[1]}`;

  useEffect(() => {
    setCompetitors(competitorsData[selectedEvent]);
  }, [selectedEvent]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <>
        <Header/>
      </>
      <>
      <AthleteList athletes={sortedList} />
      </>
    </div>
  );
};

export default AthletesPage;