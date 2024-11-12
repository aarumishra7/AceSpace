import React, { useState } from 'react';
import { MessageSquare, FileText, Zap, Lightbulb, Code, Map, BarChart, List, Network } from 'lucide-react';

const AIAssistant = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const aiOptions = [
    { icon: <MessageSquare size={24} />, label: "Ask a question", color: "blue" },
    { icon: <FileText size={24} />, label: "Draft content", color: "green" },
    { icon: <Lightbulb size={24} />, label: "Brainstorm ideas", color: "yellow" },
    { icon: <Zap size={24} />, label: "Summarize documents", color: "purple" },
    { icon: <Code size={24} />, label: "Get help with coding", color: "pink" },
    { icon: <Map size={24} />, label: "Generate Roadmap", color: "indigo" },
    { icon: <BarChart size={24} />, label: "PowerPoint and Document Creation", color: "red" },
    { icon: <List size={24} />, label: "Topic Prioritization", color: "teal" },
    { icon: <Network size={24} />, label: "Make MindMaps", color: "orange" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Hi there! How can AceAI assist you today?</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiOptions.map((option, index) => (
          <button
            key={index}
            className={`bg-${option.color}-50 p-6 rounded-lg shadow hover:shadow-md transition duration-300 flex flex-col items-center justify-center space-y-4`}
            onClick={() => setSelectedOption(option.label)}
          >
            <div className={`text-${option.color}-500`}>{option.icon}</div>
            <span className={`text-${option.color}-700 font-medium text-center`}>{option.label}</span>
          </button>
        ))}
      </div>
      {selectedOption && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">You selected: {selectedOption}</h2>
          <textarea
            className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Start typing your ${selectedOption.toLowerCase()} request here...`}
          ></textarea>
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
            Submit to AceAI
          </button>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;