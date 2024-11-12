import React, { useState } from 'react';
import { Edit2, Trash2, X } from 'lucide-react';

interface FolderTabsProps {
  folders: Array<{
    id: string;
    name: string;
    color?: string;
  }>;
  currentFolder: any;
  onFolderChange: (folder: any) => void;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}

const FolderTabs: React.FC<FolderTabsProps> = ({
  folders,
  currentFolder,
  onFolderChange,
  onRename,
  onDelete,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleRename = (id: string) => {
    if (editName.trim()) {
      onRename(id, editName.trim());
      setEditingId(null);
      setEditName('');
    }
  };

  const startEdit = (folder: any) => {
    setEditingId(folder.id);
    setEditName(folder.name);
  };

  return (
    <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2">
      <button
        onClick={() => onFolderChange(null)}
        className={`px-4 py-2 rounded-lg whitespace-nowrap ${
          !currentFolder
            ? 'bg-blue-500 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        All Files
      </button>
      
      {folders.map((folder) => (
        <div
          key={folder.id}
          className={`relative group flex items-center px-4 py-2 rounded-lg cursor-pointer ${
            currentFolder?.id === folder.id
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          style={folder.color ? { backgroundColor: folder.color } : {}}
        >
          {editingId === folder.id ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={() => handleRename(folder.id)}
              onKeyPress={(e) => e.key === 'Enter' && handleRename(folder.id)}
              className="bg-transparent border-none focus:outline-none"
              autoFocus
            />
          ) : (
            <>
              <span onClick={() => onFolderChange(folder)}>{folder.name}</span>
              <div className="hidden group-hover:flex items-center ml-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startEdit(folder);
                  }}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(folder.id);
                  }}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default FolderTabs;