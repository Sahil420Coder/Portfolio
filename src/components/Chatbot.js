import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaRobot, FaUser, FaPaperPlane, FaTimes } from "react-icons/fa";
import './Chatbot.css';

// Safely use environment variables instead of hardcoded keys
const API_KEYS = {
  GEMINI: process.env.REACT_APP_GEMINI_API_KEY || "",
  HUGGING_FACE: process.env.REACT_APP_HUGGING_FACE_TOKEN || "",
  GROQ: process.env.REACT_APP_GROQ_API_KEY || ""
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you?", isUser: false },
  ]);
  const [input, setInput] = useState("");
  const [resumeContent, setResumeContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Fetch Resume Data
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get("/resume.json");
        setResumeContent(res.data);
      } catch (error) {
        console.error("Failed to load resume:", error);
      }
    };
    fetchResume();
  }, []);

  // Toggle chat window
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Focus on input field when chat opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Scroll to bottom when new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Local fallback responses
  const getLocalResponse = (inputText) => {
    const inputLower = inputText.toLowerCase();
    const fallbackResponses = {
      "who are you": "I'm Sahil's AI assistant, here to help you learn more about his work, projects, and experience!",
      "what are your skills": `Sahil's key technical skills include: ${resumeContent?.skills?.technologies_and_frameworks?.join(', ')}`,
      "projects": `Sahil has worked on several projects including: ${resumeContent?.projects?.map(p => p.name).join(', ')}. Ask about any specific one for more details!`,
      "contact": `You can contact Sahil via email at ${resumeContent?.basic_information?.email} or phone at ${resumeContent?.basic_information?.phone}`,
      "hello": "Hello! How can I help you learn more about Sahil?",
      "about": `Sahil is a skilled developer with expertise in ${resumeContent?.skills?.programming_languages?.join(', ')} and interests in ${resumeContent?.skills?.areas_of_interest?.join(', ')}.`
    };
    
    for (const [key, response] of Object.entries(fallbackResponses)) {
      if (inputLower.includes(key)) {
        return response;
      }
    }
    
    return null; // No match found
  };

  // Call Gemini API
  const callGeminiAPI = async (inputText) => {
    try {
      const actualApiKey = process.env.REACT_APP_GEMINI_API_KEY || API_KEYS.GEMINI;
      
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${actualApiKey}`;

      const response = await axios.post(
        apiUrl,
        {
          contents: [{
            parts: [{
              text: `You are a helpful assistant for Sahil's portfolio website. You should act as Sahil's personal AI assistant.
              
Here is Sahil's resume data for reference:
${JSON.stringify(resumeContent, null, 2)}

When someone asks who you are, respond with: "I'm Sahil's AI assistant, here to help you learn more about his work, projects, and experience!"

For any questions about contact information, include all available contact methods from the resume.

For project-related questions, provide specific details about the relevant projects.

For skills-related questions, group the skills by category and provide a comprehensive overview.

Current question: ${inputText}

Please provide a friendly and informative response based on the above context.`
            }]
          }]
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data.candidates && response.data.candidates[0]?.content?.parts[0]?.text) {
        return response.data.candidates[0].content.parts[0].text;
      }
      throw new Error("Invalid response format");
    } catch (error) {
      console.error("Gemini API error:", error);
      throw error;
    }
  };

  // Call Groq API
  const callGroqAPI = async (inputText) => {
    try {
      const token = process.env.REACT_APP_GROQ_API_KEY || API_KEYS.GROQ;
      
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: `You are a helpful assistant for Sahil's portfolio website.
              
Here is Sahil's resume data:
${JSON.stringify(resumeContent, null, 2)}

Respond helpfully to user questions about Sahil, his skills, and his projects.`
            },
            { role: "user", content: inputText }
          ]
        },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data.choices && response.data.choices.length > 0) {
        return response.data.choices[0].message.content;
      }
      throw new Error("Invalid Groq response format");
    } catch (error) {
      console.error("Groq API error:", error);
      throw error;
    }
  };

  // Call Hugging Face API
  const callHuggingFaceAPI = async (inputText) => {
    try {
      const token = process.env.REACT_APP_HUGGING_FACE_TOKEN || API_KEYS.HUGGING_FACE;
      
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf",
        {
          inputs: `
<s>[INST] You are Sahil's AI assistant for his portfolio website.

Here's information about Sahil:
${JSON.stringify(resumeContent, null, 2)}

Answer the following question in a helpful, friendly way based on the above context.
Question: ${inputText} [/INST]
          `
        },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data && response.data[0] && response.data[0].generated_text) {
        // Extract the assistant's response after the instruction part
        const fullText = response.data[0].generated_text;
        const assistantResponse = fullText.split('[/INST]').pop().trim();
        return assistantResponse;
      }
      throw new Error("Invalid Hugging Face response format");
    } catch (error) {
      console.error("Hugging Face API error:", error);
      throw error;
    }
  };

  // Format message to add line breaks and convert URLs to clickable links
  const formatMessage = (message) => {
    // URL regex pattern
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    
    // First split by newlines
    return message.split("\n").map((line, i) => {
      // For each line, check for URLs and convert them to links
      const parts = line.split(urlRegex);
      
      const formattedLine = parts.map((part, j) => {
        // Check if this part matches a URL
        if (part.match(urlRegex)) {
          return (
            <a 
              key={j}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline hover:text-blue-300 break-all"
            >
              {part}
            </a>
          );
        }
        return <span className="break-words">{part}</span>;
      });
      
      return (
        <React.Fragment key={i}>
          {formattedLine}
          {i < message.split("\n").length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  // Send message
  const sendMessage = async () => {
    if (input.trim() && resumeContent) {
      const newMessages = [...messages, { text: input, isUser: true }];
      setMessages(newMessages);
      setInput("");
      setIsLoading(true);

      // Try all APIs in sequence with fallback
      try {
        let response = null;

        // Try local response first
        const localResponse = getLocalResponse(input);
        
        if (!localResponse) {
          // Try Gemini API
          try {
            response = await callGeminiAPI(input);
            console.log("Using Gemini API");
          } catch (geminiError) {
            console.log("Gemini API failed, trying Groq");
            
            // Try Groq API
            try {
              response = await callGroqAPI(input);
              console.log("Using Groq API");
            } catch (groqError) {
              console.log("Groq API failed, trying Hugging Face");
              
              // Try Hugging Face API as final fallback
              try {
                response = await callHuggingFaceAPI(input);
                console.log("Using Hugging Face API");
              } catch (hfError) {
                // All APIs failed, generate a generic response
                response = "I apologize, but I'm having trouble connecting to my knowledge base. Please try asking a simpler question or contact Sahil directly at sahilyadav291103@gmail.com";
                console.log("All APIs failed");
              }
            }
          }
        } else {
          response = localResponse;
          console.log("Using local response");
        }

        setMessages([...newMessages, { 
          text: response || localResponse || "I'm sorry, I couldn't understand your question. Could you rephrase it?", 
          isUser: false 
        }]);
      } catch (error) {
        console.error("All methods failed:", error);
        setMessages([
          ...newMessages,
          { 
            text: "I apologize, but I'm having trouble connecting right now. Please try again later or contact Sahil directly at sahilyadav291103@gmail.com", 
            isUser: false 
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Suggested queries
  const suggestedQueries = [
    "Who is Sahil?",
    "What are Sahil's skills?",
    "Tell me about Sahil's projects",
    "How can I contact Sahil?"
  ];

  // Handle suggested query click
  const handleSuggestedQuery = (query) => {
    setInput(query);
    setTimeout(() => {
      sendMessage();
    }, 100);
  };

  return (
    <div className="chatbot-container">
      {/* Chatbot Button */}
      <button
        className="chatbot-button"
        onClick={toggleChat}
        aria-label="Toggle chat assistant"
      >
        <FaRobot className="robot-icon" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatRef}
          className="chat-window"
        >
          <div className="chat-header">
            <div className="chat-title">Portfolio Assistant</div>
            <button
              className="close-button"
              onClick={toggleChat}
              aria-label="Close chat"
            >
              <FaTimes />
            </button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.isUser ? "user" : "bot"
                }`}
              >
                {!msg.isUser && (
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                    <FaRobot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-lg shadow-md max-w-[75%] ${
                    msg.isUser
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-700 text-white rounded-bl-none"
                  }`}
                >
                  <div className="text-sm whitespace-pre-line break-words">
                    {formatMessage(msg.text)}
                  </div>
                </div>
                {msg.isUser && (
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center ml-2">
                    <FaUser className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="message bot">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Queries */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 bg-gray-850 border-t border-gray-700">
              <p className="text-xs text-gray-400 mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQueries.map((query, index) => (
                  <button
                    key={index}
                    className="text-xs bg-gray-700 hover:bg-blue-600 text-white px-2 py-1 rounded-full transition-colors"
                    onClick={() => handleSuggestedQuery(query)}
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="chat-input">
            <input
              ref={inputRef}
              type="text"
              className="w-full p-3 bg-gray-700 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
            />
            <button
              className={`p-3 rounded-r-lg ${
                isLoading 
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } flex items-center justify-center transition-colors`}
              onClick={sendMessage}
              disabled={isLoading}
              aria-label="Send message"
            >
              <FaPaperPlane className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;