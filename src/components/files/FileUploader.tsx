import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File } from 'lucide-react';
import { useFileStore } from '../../store/fileStore';

const FileUploader: React.FC = () => {
  const { uploadFiles, uploading } = useFileStore();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      await uploadFiles(acceptedFiles);
    },
    [uploadFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center">
        {uploading ? (
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
        ) : (
          <>
            <Upload className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600 text-center mb-2">
              {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
            </p>
            <p className="text-sm text-gray-500">or click to select files</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUploader;