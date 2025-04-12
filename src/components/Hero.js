import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaDownload } from "react-icons/fa";

const Hero = () => {
  return (
    <div
      className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden"
      id="home"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-blue-500 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-500 to-transparent"></div>
        <div className="grid grid-cols-10 h-full w-full">
          {[...Array(100)].map((_, i) => (
            <div key={i} className="border-[0.5px] border-white/5"></div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Text Content */}
          <div className="md:w-3/5 text-center md:text-left mb-10 md:mb-0">
            <p className="text-blue-400 text-lg font-medium mb-4">Hello, my name is</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-white">Sahil</span>
              <span className="text-blue-400">.</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-6">
              Machine Learning Engineer & Data Scientist
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mb-8">
              A passionate developer focused on building scalable machine learning solutions
              and data-driven applications. Currently studying Electrical Engineering at
              IIT Ropar and exploring AI technologies.
            </p>
            
            <div className="flex space-x-4 mb-8 justify-center md:justify-start">
              <a
                href="https://www.linkedin.com/in/sahil-yadav-782363278/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-blue-600 p-3 rounded-full transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/Sahil420Coder"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-blue-600 p-3 rounded-full transition-colors duration-300"
                aria-label="GitHub"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href="mailto:sahilyadav291103@gmail.com"
                className="bg-gray-800 hover:bg-blue-600 p-3 rounded-full transition-colors duration-300"
                aria-label="Email"
              >
                <FaEnvelope className="h-5 w-5" />
              </a>
            </div>
            
            <div className="flex justify-center md:justify-start">
              <a
                href="/sde_sahil.pdf"
                download
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 flex items-center"
              >
                <FaDownload className="mr-2" /> Download Resume
              </a>
            </div>
          </div>
          
          {/* Profile Image */}
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-500 p-1 bg-gray-800 shadow-xl">
              <img
                src="/sahil_profile.jpg"
                alt="Sahil"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500 rounded-lg opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: "1s" }}></div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <p className="text-gray-400 text-sm mb-2">Scroll Down</p>
        <div className="w-5 h-10 border-2 border-gray-400 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
