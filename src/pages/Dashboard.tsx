import React from 'react';
import { Plus, Calendar, FileText, BarChart } from 'lucide-react';

const Dashboard = () => {
  const checklistItems = [
    "Click anywhere to start writing.",
    "Use / command to add headings, images, and other content blocks.",
    "Drag and drop blocks to easily reorganize content.",
    "Create a new page from the sidebar to organize your content.",
    "Link external resources and media files to your notes.",
    "Sync AceSpace with your calendar to keep track of events.",
  ];

  const quickStats = [
    { label: 'Active Tasks', value: '12', trend: '+2 this week' },
    { label: 'Notes Created', value: '45', trend: '+8 this month' },
    { label: 'Study Hours', value: '24', trend: '+5 this week' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome to AceSpace!</h1>
        <div className="flex space-x-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            New Note
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm mb-1">{stat.label}</h3>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-bold">{stat.value}</span>
              <span className="text-sm text-green-500">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Getting Started
          </h2>
          <ul className="space-y-3">
            {checklistItems.map((item, index) => (
              <li key={index} className="flex items-start">
                <input 
                  type="checkbox" 
                  className="mt-1 mr-3 h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Upcoming Tasks
          </h2>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between bg-blue-50 text-blue-600 p-3 rounded-md hover:bg-blue-100 transition duration-300">
              <span className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Task
              </span>
            </button>
            <button className="w-full flex items-center justify-between bg-purple-50 text-purple-600 p-3 rounded-md hover:bg-purple-100 transition duration-300">
              <span className="flex items-center">
                <BarChart className="w-5 h-5 mr-2" />
                Create Presentation
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;