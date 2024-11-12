import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useProfileStore } from '../store/profileStore';
import {
  Home,
  FileText,
  FolderOpen,
  BarChart,
  Users,
  ChevronLeft,
  ChevronRight,
  Settings,
  CheckSquare,
  History,
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useAuthStore();
  const { displayName, photoURL } = useProfileStore();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="relative bg-gray-900 text-white h-screen flex flex-col justify-between transition-all duration-300">
      <div className={`flex flex-col h-full ${isCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="flex items-center p-4">
          {photoURL ? (
            <img
              src={photoURL}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
              {displayName?.charAt(0) || 'U'}
            </div>
          )}
          {!isCollapsed && (
            <div className="ml-3">
              <div className="font-medium">{displayName || 'Welcome'}</div>
            </div>
          )}
        </div>

        <nav className="flex-grow mt-6">
          <NavItem to="/" icon={<Home size={20} />} label="Dashboard" isCollapsed={isCollapsed} />
          <NavItem to="/tasks" icon={<CheckSquare size={20} />} label="Tasks" isCollapsed={isCollapsed} />
          <NavItem to="/notes" icon={<FileText size={20} />} label="Notes" isCollapsed={isCollapsed} />
          <NavItem to="/file-manager" icon={<FolderOpen size={20} />} label="Files" isCollapsed={isCollapsed} />
          <NavItem to="/presentations" icon={<BarChart size={20} />} label="Presentations" isCollapsed={isCollapsed} />
          <NavItem to="/meetings" icon={<Users size={20} />} label="Meetings" isCollapsed={isCollapsed} />
          <NavItem to="/version-history" icon={<History size={20} />} label="History" isCollapsed={isCollapsed} />
        </nav>
      </div>

      <div className="p-4">
        <Link to="/settings" className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-200" title="Settings">
          <Settings size={20} />
        </Link>
      </div>

      <button
        onClick={toggleSidebar}
        className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-gray-700 rounded-full p-1 shadow-md"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </div>
  );
};

const NavItem = ({ to, icon, label, isCollapsed }) => (
  <Link
    to={to}
    className={`flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md ${
      isCollapsed ? 'justify-center' : ''
    }`}
    title={label}
  >
    {icon}
    {!isCollapsed && <span className="text-sm">{label}</span>}
  </Link>
);

export default Sidebar;