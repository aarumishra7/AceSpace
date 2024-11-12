import React from 'react';

const IntegrationSettings = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Integration Settings</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Third-Party Tool Integration</h3>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Google Calendar
          </label>
          <label className="flex items-center mt-2">
            <input type="checkbox" className="mr-2" />
            Trello
          </label>
          <label className="flex items-center mt-2">
            <input type="checkbox" className="mr-2" />
            Slack
          </label>
          <label className="flex items-center mt-2">
            <input type="checkbox" className="mr-2" />
            Microsoft Teams
          </label>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Cloud Storage Integration</h3>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Google Drive
          </label>
          <label className="flex items-center mt-2">
            <input type="checkbox" className="mr-2" />
            Dropbox
          </label>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">API Access</h3>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Generate API Key</button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationSettings;