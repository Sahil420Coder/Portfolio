import React from "react";
import { FaGithub } from "react-icons/fa";

const Projects = () => {
  const projects = [
    {
      title: "Analysis on Diabetes, stroke, Iris, Credit Score Datasets",
      description: [
        "Implemented Logistic Regression and KNN algorithms with different k values to predict scores across multiple datasets.",
        "Performed comprehensive data analysis and visualization to derive meaningful insights from healthcare and financial data.",
        "Achieved high accuracy in classification tasks through careful model selection and parameter tuning."
      ],
      tech: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
      github: "https://github.com/Sahil420Coder/Analysis-on-Diabetes-stroke-Iris-Credit-Score-Datasets",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1000"
    },
    {
      title: "SMS Spam Classifier",
      description: [
        "Developed a machine learning model to classify SMS messages as spam or legitimate.",
        "Implemented text preprocessing and feature extraction techniques for optimal model performance.",
        "Created a user-friendly interface for real-time message classification."
      ],
      tech: ["Python", "Natural Language Processing", "Machine Learning", "Flask"],
      github: "https://github.com/Sahil420Coder/SMS-Spam-Classifier",
      image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1000"
    },
    {
      title: "Car Price Predictor",
      description: [
        "Built a regression model to predict car prices based on various features and specifications.",
        "Implemented data preprocessing and feature engineering to improve model accuracy.",
        "Created a web interface for users to input car details and receive price predictions."
      ],
      tech: ["Python", "Machine Learning", "HTML", "Regression Analysis"],
      github: "https://github.com/Sahil420Coder/Car-Price-Predictor",
      image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1000"
    },
  ];

  return (
    <div id="projects" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-blue-400 font-semibold mb-2">My Work</p>
          <h2 className="text-4xl font-bold text-white">Featured Projects</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-10`}
            >
              {/* Project Image */}
              <div className="lg:w-1/2 overflow-hidden rounded-xl shadow-2xl group relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 z-10"></div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Project Info */}
              <div className="lg:w-1/2 space-y-4">
                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                  <ul className="space-y-2 text-gray-300 mb-4">
                    {project.description.map((desc, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-blue-400 mr-2">▹</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-medium bg-gray-800 text-blue-300 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center"
                  >
                    <FaGithub className="mr-2" /> GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-20">
          <p className="text-gray-400 mb-6">
            Want to see more of my projects? Check out my GitHub.
          </p>
          <a
            href="https://github.com/Sahil420Coder"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-300 inline-flex items-center"
          >
            <FaGithub className="mr-2" /> View GitHub Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;
