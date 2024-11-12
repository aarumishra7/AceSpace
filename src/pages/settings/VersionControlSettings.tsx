import React from 'react';

const VersionControlSettings = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Version Control Settings</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Document Version History</h3>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Enable version history
          </label>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Autosave Intervals</h3>
          <select className="w-full p-2 border rounded">
            <option>Every 5 minutes</option>
            <option>Every 10 minutes</option>
            <option>Every 15 minutes</option>
            <option>Every 30 minutes</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default VersionControlSettings;