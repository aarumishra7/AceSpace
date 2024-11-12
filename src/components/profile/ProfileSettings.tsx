import React, { useEffect, useState } from 'react';
import { useProfileStore } from '../../store/profileStore';
import { useThemeStore } from '../../store/themeStore';
import { User, Moon, Sun, Upload } from 'lucide-react';

const ProfileSettings = () => {
  const { displayName, photoURL, loading, error, updateProfile, uploadProfilePicture, fetchProfile } = useProfileStore();
  const { isDarkMode, toggleDarkMode, setPrimaryColor } = useThemeStore();
  const [newDisplayName, setNewDisplayName] = useState(displayName);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleProfilePicture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadProfilePicture(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({ displayName: newDisplayName });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <User className="mr-2" />
        Profile Settings
      </h2>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={photoURL || 'https://via.placeholder.com/100'}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer">
              <Upload className="w-4 h-4 text-white" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleProfilePicture}
                disabled={loading}
              />
            </label>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{displayName || 'User'}</h3>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Display Name</label>
          <input
            type="text"
            value={newDisplayName}
            onChange={(e) => setNewDisplayName(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Theme</label>
          <button
            type="button"
            onClick={toggleDarkMode}
            className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Accent Color</label>
          <input
            type="color"
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="w-full h-10 p-1 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;