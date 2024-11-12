import React from 'react';

const GamificationSettings = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Gamification Settings</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Progress Tracking</h3>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Enable note-taking tracking
          </label>
          <label className="flex items-center mt-2">
            <input type="checkbox" className="mr-2" />
            Enable task completion tracking
          </label>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Badge Visibility</h3>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Display badges on profile
          </label>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Achievement Milestones</h3>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Enable milestone notifications
          </label>
        </div>
      </div>
    </div>
  );
};

export default GamificationSettings;