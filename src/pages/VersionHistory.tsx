import React, { useState } from 'react';
import { History, AlertCircle } from 'lucide-react';

const VersionHistory = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [versions, setVersions] = useState([]);

  const toggleVersionControl = () => {
    setIsEnabled(!isEnabled);
    if (!isEnabled) {
      // Mock data for demonstration
      setVersions([
        { id: 1, timestamp: '2024-03-15 14:30:00', type: 'Auto-save', changes: 'Document automatically saved' },
        { id: 2, timestamp: '2024-03-15 14:15:00', type: 'Auto-save', changes: 'Document automatically saved' },
      ]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <History className="mr-2" /> Version History
        </h1>
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={isEnabled}
              onChange={toggleVersionControl}
            />
            <div className={`block w-14 h-8 rounded-full ${isEnabled ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${isEnabled ? 'translate-x-6' : ''}`}></div>
          </div>
          <span className="ml-3 text-sm font-medium">
            {isEnabled ? 'Version Control Enabled' : 'Version Control Disabled'}
          </span>
        </label>
      </div>

      {!isEnabled ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Version Control is Disabled</h2>
          <p className="text-gray-600 mb-4">
            Enable version control to track changes and maintain a history of your documents.
          </p>
          <button
            onClick={toggleVersionControl}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Enable Version Control
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="space-y-4">
            {versions.map((version) => (
              <div key={version.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div>
                  <p className="font-medium">{version.type}</p>
                  <p className="text-sm text-gray-500">{version.changes}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{version.timestamp}</p>
                  <button className="text-blue-500 text-sm hover:underline mt-1">Restore</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VersionHistory;