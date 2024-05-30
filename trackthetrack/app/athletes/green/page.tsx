"use client";

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Link from 'next/link';


const GreenPage: React.FC = () => {

  return (
    <div className="min-h-screen bg-gray-100 p-6">
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
          Nathan Green
        </h3>
      </header>
    </div>
  );
};

export default GreenPage;