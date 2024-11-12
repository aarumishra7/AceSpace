import React from 'react';

const ProfileSettings = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Profile Settings</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Edit Profile Information</h3>
          <input type="text" placeholder="Name" className="w-full p-2 border rounded" />
          <input type="email" placeholder="Email" className="w-full p-2 border rounded mt-2" />
          <input type="file" accept="image/*" className="mt-2" />
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Account Management</h3>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded">Deactivate Account</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded ml-2">Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;