import React from 'react';

const BackupSettings = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Backup and Sync Settings</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Auto Backup Frequency</h3>
          <select className="w-full p-2 border rounded">
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Manual Backups</h3>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Create Backup Now</button>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Cross-Platform Syncing</h3>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Sync with mobile devices
          </label>
          <label className="flex items-center mt-2">
            <input type="checkbox" className="mr-2" />
            Sync with desktop app
          </label>
        </div>
      </div>
    </div>
  );
};

export default BackupSettings;