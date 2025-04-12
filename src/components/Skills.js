import React from "react";
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaNode,
  FaPython
} from "react-icons/fa";
import {
  FaGitAlt,
  FaCuttlefish,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiTailwindcss,
  SiCplusplus,
} from "react-icons/si";

const Skills = () => {
  const skills = [
    {
      category: "Frontend",
      items: [
        { name: "ReactJS", icon: <FaReact className="text-blue-400" /> },
        { name: "NextJS", icon: <SiNextdotjs className="text-white" /> },
        {
          name: "Tailwind CSS",
          icon: <SiTailwindcss className="text-teal-400" />,
        },
      ],
    },
    {
      category: "Backend",
      items: [
        { name: "Node.js", icon: <FaNodeJs className="text-green-400" /> },
        { name: "Express", icon: <SiExpress className="text-gray-400" /> },
      ],
    },
    {
      category: "Databases",
      items: [
        {
          name: "PostgreSQL",
          icon: <SiPostgresql className="text-blue-500" />,
        },
        { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
      ],
    },
    {
      category: "Version Control",
      items: [
        { name: "Git/GitHub", icon: <FaGitAlt className="text-orange-500" /> },
      ],
    },
    {
      category: "Programming Languages",
      items: [
        { name: "C", icon: <FaCuttlefish className="text-blue-500" /> },
        { name: "C++", icon: <SiCplusplus className="text-purple-400" /> },
        { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
        { name: "Python", icon: <FaPython className="text-blue-400" /> },
      ],
    },
    {
      category: "Other Skills",
      items: [
        { name: "Data Structures and Algorithms", icon: "⚙️" },
        { name: "Data Analysis", icon: "📊" },
        { name: "Web Development", icon: "💻" },
        { name: "Machine Learning", icon: "🤖" },
      ],
    },
  ];

  return (
    <div
      className="bg-gray-800 pt-24 rounded-lg mx-8 text-white p-8 shadow-lg"
      id="skills"
    >
      <h2 className="text-4xl font-bold mb-6 text-center">Skills</h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, index) => (
          <div key={index} className="bg-gray-700 rounded-lg p-6 shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-4">
              {group.items.map((skill, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-950 rounded-lg shadow-sm"
                >
                  {typeof skill.icon === "string" ? (
                    <span className="text-xl">{skill.icon}</span>
                  ) : (
                    skill.icon
                  )}
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
