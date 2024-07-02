"use client";
import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Image from 'next/image';
import logo from '../assets/ttt1.png';
import sohum from '../assets/sohum.jpeg';
import grant from '../assets/grant.jpeg';
import elijah from '../assets/elijah.jpeg'
import Search from '../../components/Search';
import linkedin from '../assets/linkedin.png';
import instagram from '../assets/instagram.png';
import Header from '../../components/Header';


const HomePage: React.FC = () => {

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <>
        <Header/>
      </>
    

    <header className="text-center my-8">
        <h1 className="text-4xl font-bold text-blue-600">About Us</h1>
        <p className="text-lg text-gray-700 mt-2">Meet the main developers behind our project</p>
    </header>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Image src={sohum} alt="Sohum Gaitonde" className="w-32 h-32 rounded-full mx-auto mb-4"/>
            <h2 className="text-2xl font-semibold text-blue-700">Sohum Gaitonde</h2>
            <p className="text-gray-600 mt-2">Senior Developer</p>
            <p className="text-gray-600 mt-2">Sohum is dedicated to creating beautiful and user-friendly interfaces that enhance user experience.</p>
            <div className="flex justify-center mt-4 space-x-4">
                    <a href="https://www.instagram.com/sohum.gaitonde" target="_blank" rel="noopener noreferrer">
                        <Image src={instagram} alt="Instagram" className="w-8 h-8"/>
                    </a>
                    <a href="https://www.linkedin.com/in/sohum-gaitonde/" target="_blank" rel="noopener noreferrer">
                        <Image src={linkedin} alt="LinkedIn" className="w-8 h-8"/>
                    </a>
                </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Image src={elijah} alt="Elijah McCauley" className="w-32 h-32 rounded-full mx-auto mb-4"/>
            <h2 className="text-2xl font-semibold text-blue-700">Elijah McCauley</h2>
            <p className="text-gray-600 mt-2">Frontend Developer</p>
            <p className="text-gray-600 mt-2">Elijah is passionate about developing innovative solutions and leading the development team.</p>
            <div className="flex justify-center mt-4 space-x-4">
                    <a href="https://www.instagram.com/chasingau" target="_blank" rel="noopener noreferrer">
                        <Image src={instagram} alt="Instagram" className="w-8 h-8"/>
                    </a>
                    <a href="https://www.linkedin.com/in/elijahmccauley/" target="_blank" rel="noopener noreferrer">
                        <Image src={linkedin} alt="LinkedIn" className="w-8 h-8"/>
                    </a>
                </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Image src={grant} alt="Grant Gaffney" className="w-32 h-32 rounded-full mx-auto mb-4"/>
            <h2 className="text-2xl font-semibold text-blue-700">Grant Gaffney</h2>
            <p className="text-gray-600 mt-2">Backend Developer</p>
            <p className="text-gray-600 mt-2">Grant specializes in backend development and database management, ensuring our applications run smoothly.</p>
            <div className="flex justify-center mt-4 space-x-4">
                    <a href="https://www.instagram.com/grant.gaffney" target="_blank" rel="noopener noreferrer">
                        <Image src={instagram} alt="Instagram" className="w-8 h-8"/>
                    </a>
                    <a href="https://www.linkedin.com/in/grant-gaffney/" target="_blank" rel="noopener noreferrer">
                        <Image src={linkedin} alt="LinkedIn" className="w-8 h-8"/>
                    </a>
                </div>
        </div>
        
    </div>



      
      
    
    </div>
  );
};

export default HomePage;
