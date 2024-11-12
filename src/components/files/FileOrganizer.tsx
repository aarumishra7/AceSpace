import React, { useState } from 'react';
import { useFileStore } from '../../store/fileStore';
import { Folder, File, Image, FileText, Video, MoreVertical, Plus } from 'lucide-react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import FileUploader from './FileUploader';

const FileOrganizer: React.FC = () => {
  const { files, reorderFiles } = useFileStore();
  const [selectedFolder, setSelectedFolder] = useState('all');

  const folders = [
    { id: 'all', name: 'All Files', icon: <File size={18} /> },
    { id: 'images', name: 'Images', icon: <Image size={18} /> },
    { id: 'documents', name: 'Documents', icon: <FileText size={18} /> },
    { id: 'videos', name: 'Videos', icon: <Video size={18} /> },
  ];

  const filteredFiles = files.filter(file => {
    if (selectedFolder === 'images') return file.type.startsWith('image/');
    if (selectedFolder === 'documents') return file.type.includes('pdf') || file.type.includes('doc');
    if (selectedFolder === 'videos') return file.type.startsWith('video/');
    return true;
  });

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = files.findIndex(file => file.id === active.id);
      const newIndex = files.findIndex(file => file.id === over.id);
      reorderFiles(oldIndex, newIndex);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-4">
        <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mb-6">
          <Plus size={20} className="mr-2" />
          Upload Files
        </button>

        <nav className="space-y-1">
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => setSelectedFolder(folder.id)}
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                selectedFolder === folder.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {folder.icon}
              <span className="ml-3">{folder.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Files</h2>
          
          <FileUploader />

          <div className="mt-6">
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={filteredFiles.map(f => f.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-2">
                  {filteredFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
                    >
                      <div className="flex items-center">
                        <div className="p-2 bg-gray-100 rounded-lg mr-3">
                          {file.type.startsWith('image/') ? <Image size={20} /> :
                           file.type.startsWith('video/') ? <Video size={20} /> :
                           <FileText size={20} />}
                        </div>
                        <div>
                          <h3 className="font-medium">{file.name}</h3>
                          <p className="text-sm text-gray-500">
                            {(file.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-full">
                        <MoreVertical size={20} className="text-gray-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileOrganizer;