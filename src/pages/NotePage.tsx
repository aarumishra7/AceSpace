import React, { useState } from 'react';
import { Bold, Italic, Underline, List, AlignLeft, AlignCenter, AlignRight, Image } from 'lucide-react';

const NotePage = () => {
  const [noteTitle, setNoteTitle] = useState('Untitled');
  const [noteContent, setNoteContent] = useState('');

  const formatText = (command) => {
    document.execCommand(command, false, null);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-100 p-4 flex items-center justify-between">
        <input
          type="text"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          className="text-2xl font-bold bg-transparent border-none outline-none"
        />
        <div className="flex space-x-2">
          <button onClick={() => formatText('bold')} className="p-2 hover:bg-gray-200 rounded"><Bold size={20} /></button>
          <button onClick={() => formatText('italic')} className="p-2 hover:bg-gray-200 rounded"><Italic size={20} /></button>
          <button onClick={() => formatText('underline')} className="p-2 hover:bg-gray-200 rounded"><Underline size={20} /></button>
          <button onClick={() => formatText('insertUnorderedList')} className="p-2 hover:bg-gray-200 rounded"><List size={20} /></button>
          <button onClick={() => formatText('justifyLeft')} className="p-2 hover:bg-gray-200 rounded"><AlignLeft size={20} /></button>
          <button onClick={() => formatText('justifyCenter')} className="p-2 hover:bg-gray-200 rounded"><AlignCenter size={20} /></button>
          <button onClick={() => formatText('justifyRight')} className="p-2 hover:bg-gray-200 rounded"><AlignRight size={20} /></button>
          <button onClick={() => formatText('insertImage')} className="p-2 hover:bg-gray-200 rounded"><Image size={20} /></button>
        </div>
      </header>
      <main className="flex-grow p-4 overflow-auto">
        <div
          contentEditable
          className="w-full h-full outline-none"
          onInput={(e) => setNoteContent(e.currentTarget.textContent)}
          dangerouslySetInnerHTML={{ __html: noteContent }}
        />
      </main>
    </div>
  );
};

export default NotePage;