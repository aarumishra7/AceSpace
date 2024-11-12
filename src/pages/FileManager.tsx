import React, { useState, useEffect } from 'react';
import { useFileStore } from '../store/fileStore';
import { 
  Search, Plus, SortAsc, SortDesc, FileText, 
  Image as ImageIcon, File, Clock, Edit2, Trash2, 
  FolderPlus, Settings, ChevronDown 
} from 'lucide-react';
import FileList from '../components/file-manager/FileList';
import FileDropzone from '../components/file-manager/FileDropzone';
import FolderTabs from '../components/file-manager/FolderTabs';
import SortMenu from '../components/file-manager/SortMenu';
import { formatBytes } from '../utils/formatters';

const FileManager = () => {
  const { 
    files, 
    folders,
    currentFolder,
    setCurrentFolder,
    addFolder,
    searchFiles,
    sortFiles,
    loading 
  } = useFileStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState('name-asc');
  const [showSortMenu, setShowSortMenu] = useState(false);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchFiles(query, currentFolder);
  };

  const handleSort = (type) => {
    setSortType(type);
    sortFiles(type);
    setShowSortMenu(false);
  };

  const handleNewFolder = () => {
    const name = prompt('Enter folder name:');
    if (name) {
      addFolder(name);
    }
  };

  const filteredFiles = files.filter(file => 
    currentFolder ? file.folderId === currentFolder.id : true
  );

  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">File Manager</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleNewFolder}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <FolderPlus className="w-5 h-5 mr-2" />
              New Folder
            </button>
            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
              >
                <Settings className="w-5 h-5 mr-2" />
                Sort
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
              {showSortMenu && (
                <SortMenu
                  currentSort={sortType}
                  onSort={handleSort}
                  onClose={() => setShowSortMenu(false)}
                />
              )}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${currentFolder ? 'in ' + currentFolder.name : 'all files'}...`}
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <FolderTabs 
          folders={folders}
          currentFolder={currentFolder}
          onFolderChange={setCurrentFolder}
          onRename={(id, name) => console.log('Rename folder:', id, name)}
          onDelete={(id) => console.log('Delete folder:', id)}
        />

        <div className="bg-white rounded-lg shadow">
          <FileDropzone currentFolder={currentFolder} />
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            </div>
          ) : (
            <FileList
              files={filteredFiles}
              sortType={sortType}
              onSort={handleSort}
            />
          )}
        </div>

        <div className="mt-4 text-sm text-gray-500">
          {filteredFiles.length} items · Total size: {formatBytes(
            filteredFiles.reduce((acc, file) => acc + file.size, 0)
          )}
        </div>
      </div>
    </div>
  );
};

export default FileManager;