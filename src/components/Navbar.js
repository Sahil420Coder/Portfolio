import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false); // Close sidebar on navigation
    }
  };

  return (
    <header className="fixed top-0 rounded-b-[5rem] left-0 w-full z-50 bg-gray-800 shadow-lg text-white">
      <div className="flex justify-between items-center p-5 px-8 md:px-16">
        <h1 className="text-2xl font-bold text-blue-400">Sahil</h1>

        {/* Toggle Button */}
        <button
          className="text-3xl md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Desktop Navbar */}
        <ul className="hidden md:flex gap-6 text-lg">
          {["home", "skills", "projects", "contact"].map((item) => (
            <li
              key={item}
              className="hover:text-blue-400 cursor-pointer"
              onClick={() => scrollToSection(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </li>
          ))}
        </ul>
      </div>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        <div className="flex justify-between items-center p-5">
          <h2 className="text-2xl font-bold text-blue-400">Sahil</h2>
          <button className="text-2xl" onClick={() => setIsOpen(false)}>
            <FiX />
          </button>
        </div>
        <ul className="flex flex-col gap-6 p-5">
          {["home", "skills", "projects", "contact"].map((item) => (
            <li
              key={item}
              className="hover:text-blue-400 cursor-pointer text-lg"
              onClick={() => scrollToSection(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
