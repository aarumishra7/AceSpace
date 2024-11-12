import React from 'react';

const AccountSettings = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Account Preferences</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Language</h3>
          <select className="w-full p-2 border rounded">
            <option>English</option>
            <option>Hindi</option>
            <option>Kannada</option>
          </select>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Time Zone</h3>
          <select className="w-full p-2 border rounded">
            <option>UTC</option>
            <option>IST</option>
            {/* Add more time zones */}
          </select>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Date and Time Format</h3>
          <select className="w-full p-2 border rounded">
            <option>DD/MM/YYYY</option>
            <option>MM/DD/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Session Timeout</h3>
          <input type="number" placeholder="Minutes" className="w-full p-2 border rounded" />
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;