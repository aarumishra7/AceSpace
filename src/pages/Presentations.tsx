import React, { useState } from 'react';
import { BarChart, Plus, Edit, Trash } from 'lucide-react';

const Presentations = () => {
  const [presentations, setPresentations] = useState([
    { id: 1, title: 'Introduction to Calculus', slides: 15 },
    { id: 2, title: 'Quantum Physics Overview', slides: 20 },
  ]);

  const [newPresentation, setNewPresentation] = useState({ title: '', topic: '' });

  const addPresentation = () => {
    if (newPresentation.title && newPresentation.topic) {
      setPresentations([...presentations, { id: Date.now(), title: newPresentation.title, slides: 0 }]);
      setNewPresentation({ title: '', topic: '' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AI-Assisted Presentations</h1>
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Create New Presentation</h2>
        <input
          type="text"
          placeholder="Presentation Title"
          value={newPresentation.title}
          onChange={(e) => setNewPresentation({ ...newPresentation, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <input
          type="text"
          placeholder="Presentation Topic"
          value={newPresentation.topic}
          onChange={(e) => setNewPresentation({ ...newPresentation, topic: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          onClick={addPresentation}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          <Plus className="h-5 w-5 inline-block mr-1" /> Generate Presentation
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Your Presentations</h2>
        <ul className="space-y-4">
          {presentations.map((presentation) => (
            <li key={presentation.id} className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center">
                <BarChart className="h-5 w-5 text-blue-500 mr-2" />
                <span className="font-medium">{presentation.title}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-4">{presentation.slides} slides</span>
                <button className="p-1 text-blue-500 hover:text-blue-600 transition duration-300">
                  <Edit className="h-5 w-5" />
                </button>
                <button className="p-1 text-red-500 hover:text-red-600 transition duration-300">
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Presentations;