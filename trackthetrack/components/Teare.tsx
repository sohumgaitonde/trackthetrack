"use client";

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';


const TearePage: React.FC = () => {

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold text-center text-blue-700 mb-4">
          Track the Track
        </h1>
        <h2 className="text-3xl font-semibold text-center text-blue-500">
          Road to the Olympics
        </h2>
      </header>
    </div>
  );
};

export default TearePage;