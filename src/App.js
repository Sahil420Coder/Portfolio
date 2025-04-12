import React from "react";
import Navbar from "./components/Navbar.js";
import Hero from "./components/Hero";
import Skills from "./components/Skills.js";
import Contact from "./components/Contact";
import Chatbot from "./components/Chatbot";
import Projects from "./components/Project.js";

const App = () => {
  return (
    <div className="bg-gray-900 text-white">
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
      <Chatbot />
    </div>
  );
};

export default App;
