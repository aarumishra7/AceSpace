import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Lock, Book, Bell, Cpu, Trophy, Link, Shield, Database, Globe, History } from 'lucide-react';

import ProfileSettings from './settings/ProfileSettings';
import StudySettings from './settings/StudySettings';
import CollaborationSettings from './settings/CollaborationSettings';
import NotificationSettings from './settings/NotificationSettings';
import AISettings from './settings/AISettings';
import GamificationSettings from './settings/GamificationSettings';
import IntegrationSettings from './settings/IntegrationSettings';
import PrivacySettings from './settings/PrivacySettings';
import BackupSettings from './settings/BackupSettings';
import AccountSettings from './settings/AccountSettings';
import VersionControlSettings from './settings/VersionControlSettings';

const SettingsTab = ({ icon, label, active, onClick }) => (
  <button
    className={`flex items-center w-full p-2 rounded-md ${
      active ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
    }`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-2 text-sm">{label}</span>
  </button>
);

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderSettingsContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'study':
        return <StudySettings />;
      case 'collaboration':
        return <CollaborationSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'ai':
        return <AISettings />;
      case 'gamification':
        return <GamificationSettings />;
      case 'integrations':
        return <IntegrationSettings />;
      case 'privacy':
        return <PrivacySettings />;
      case 'backup':
        return <BackupSettings />;
      case 'language':
        return <AccountSettings />;
      case 'version':
        return <VersionControlSettings />;
      default:
        return <div>Select a settings category</div>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <SettingsIcon className="mr-2" /> Settings
      </h1>
      <div className="bg-white p-6 rounded-lg shadow flex">
        <div className="w-1/4 pr-4 border-r">
          <SettingsTab icon={<User size={16} />} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
          <SettingsTab icon={<Book size={16} />} label="Study Preferences" active={activeTab === 'study'} onClick={() => setActiveTab('study')} />
          <SettingsTab icon={<Lock size={16} />} label="Collaboration" active={activeTab === 'collaboration'} onClick={() => setActiveTab('collaboration')} />
          <SettingsTab icon={<Bell size={16} />} label="Notifications" active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} />
          <SettingsTab icon={<Cpu size={16} />} label="AI & Automation" active={activeTab === 'ai'} onClick={() => setActiveTab('ai')} />
          <SettingsTab icon={<Trophy size={16} />} label="Gamification" active={activeTab === 'gamification'} onClick={() => setActiveTab('gamification')} />
          <SettingsTab icon={<Link size={16} />} label="Integrations" active={activeTab === 'integrations'} onClick={() => setActiveTab('integrations')} />
          <SettingsTab icon={<Shield size={16} />} label="Privacy & Security" active={activeTab === 'privacy'} onClick={() => setActiveTab('privacy')} />
          <SettingsTab icon={<Database size={16} />} label="Backup & Sync" active={activeTab === 'backup'} onClick={() => setActiveTab('backup')} />
          <SettingsTab icon={<Globe size={16} />} label="Account Preferences" active={activeTab === 'language'} onClick={() => setActiveTab('language')} />
          <SettingsTab icon={<History size={16} />} label="Version Control" active={activeTab === 'version'} onClick={() => setActiveTab('version')} />
        </div>
        <div className="w-3/4 pl-4">
          {renderSettingsContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;