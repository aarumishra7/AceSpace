import React from 'react';

const StudySettings = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Study and Productivity Preferences</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Study Time Allocation</h3>
          <input type="number" placeholder="Hours per day" className="w-full p-2 border rounded" />
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Topic Prioritization</h3>
          {/* Add drag-and-drop interface for topic prioritization */}
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Task Reminder Preferences</h3>
          <select className="w-full p-2 border rounded">
            <option>Daily</option>
            <option>Weekly</option>
            <option>Custom</option>
          </select>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Break and Focus Timer</h3>
          <input type="number" placeholder="Focus duration (minutes)" className="w-full p-2 border rounded" />
          <input type="number" placeholder="Break duration (minutes)" className="w-full p-2 border rounded mt-2" />
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Task Priority Defaults</h3>
          <select className="w-full p-2 border rounded">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default StudySettings;