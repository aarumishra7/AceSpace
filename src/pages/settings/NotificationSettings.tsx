import React from 'react';

const NotificationSettings = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Notification Settings</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">In-App Notifications</h3>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Study roadmap updates
          </label>
          <label className="flex items-center mt-2">
            <input type="checkbox" className="mr-2" />
            Task reminders
          </label>
          <label className="flex items-center mt-2">
            <input type="checkbox" className="mr-2" />
            Collaboration invitations
          </label>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Email Notifications</h3>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Daily progress summary
          </label>
          <label className="flex items-center mt-2">
            <input type="checkbox" className="mr-2" />
            Task due dates
          </label>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Push Notifications (Mobile)</h3>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Enable push notifications
          </label>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;