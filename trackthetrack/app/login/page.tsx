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
import SignUp from '../../components/SignUp';
import Login from '../../components/Login';

const LoginPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <>
        <Header/>
      </>

      <div className="container mx-auto p-4">
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setIsSignUp(true)}
          className={`mr-2 p-2 ${isSignUp ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
        >
          Sign Up
        </button>
        <button
          onClick={() => setIsSignUp(false)}
          className={`p-2 ${!isSignUp ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
        >
          Login
        </button>
      </div>
      {isSignUp ? <SignUp /> : <Login />}
    </div>
    </div>
  );
};

export default LoginPage;