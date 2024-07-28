"use client";

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

interface AthleteProps {
  athlete: {
    Athlete: string[];
    Mark: string;
    Venue: string;
    Date: string;
    Nationality: string;
  };
}

const Athlete: React.FC<AthleteProps> = ({ athlete }) => {
  return (
    <div className="border p-4 mb-4">
      <a href={athlete.Athlete[1]} className="text-blue-500 font-bold">
        {athlete.Athlete[0]}
      </a>
      <p>Mark: {athlete.Mark}</p>
      <p>Nationality: {athlete.Nationality}</p>
    </div>
  );
};

export default Athlete;