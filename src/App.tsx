import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthGuard from './components/auth/AuthGuard';
import LoginPage from './components/auth/LoginPage';
import Sidebar from './components/Sidebar';
import ThemeProvider from './components/theme/ThemeProvider';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Notes from './pages/Notes';
import NotePage from './pages/NotePage';
import FileManager from './pages/FileManager';
import Presentations from './pages/Presentations';
import Meetings from './pages/Meetings';
import Settings from './pages/Settings';
import VersionHistory from './pages/VersionHistory';
import ExamRoadmap from './pages/ExamRoadmap';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <AuthGuard>
                <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                  <Sidebar />
                  <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-800">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/tasks" element={<Tasks />} />
                      <Route path="/notes" element={<Notes />} />
                      <Route path="/note/:id" element={<NotePage />} />
                      <Route path="/file-manager" element={<FileManager />} />
                      <Route path="/presentations" element={<Presentations />} />
                      <Route path="/meetings" element={<Meetings />} />
                      <Route path="/version-history" element={<VersionHistory />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/exam-roadmap" element={<ExamRoadmap />} />
                    </Routes>
                  </main>
                </div>
              </AuthGuard>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;