import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { File, Image, Video, FileText, Trash2, Download } from 'lucide-react';

interface FileItemProps {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  onDelete: (id: string) => void;
}

const FileItem: React.FC<FileItemProps> = ({ id, name, type, size, url, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getFileIcon = () => {
    if (type.startsWith('image/')) return <Image className="w-5 h-5" />;
    if (type.startsWith('video/')) return <Video className="w-5 h-5" />;
    if (type.startsWith('application/pdf')) return <FileText className="w-5 h-5" />;
    return <File className="w-5 h-5" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center justify-between p-4 bg-white rounded-lg shadow mb-2 cursor-move hover:bg-gray-50"
    >
      <div className="flex items-center space-x-4">
        {getFileIcon()}
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-gray-500">{formatFileSize(size)}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <a
          href={url}
          download
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <Download className="w-5 h-5" />
        </a>
        <button
          onClick={() => onDelete(id)}
          className="p-2 text-red-500 hover:text-red-700 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default FileItem;