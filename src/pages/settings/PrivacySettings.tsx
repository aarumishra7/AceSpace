import React from 'react';

const PrivacySettings = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Privacy and Security Settings</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Two-Factor Authentication (2FA)</h3>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Enable 2FA
          </label>
          <select className="w-full p-2 border rounded mt-2">
            <option>Email</option>
            <option>Authenticator App</option>
          </select>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Data Privacy Options</h3>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Share usage data for product improvement
          </label>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Document Sharing Privacy</h3>
          <select className="w-full p-2 border rounded">
            <option>Public</option>
            <option>Private</option>
            <option>Limited Access</option>
          </select>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Session Management</h3>
          <button className="bg-red-500 text-white px-4 py-2 rounded">Terminate All Sessions</button>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;