import React, { useState } from 'react';
import { Plus, Search, Star, Trash2, ArrowLeft } from 'lucide-react';
import NoteEditor from '../components/notes/NoteEditor';
import NoteList from '../components/notes/NoteList';
import { useNoteStore } from '../store/noteStore';

const Notes = () => {
  const { notes, currentNote, addNote, updateNote, setCurrentNote, starNote, deleteNote } = useNoteStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [showNotesList, setShowNotesList] = useState(true);

  const folders = [
    { id: 'all', name: 'All Notes', icon: <Star size={18} /> },
    { id: 'starred', name: 'Starred', icon: <Star size={18} /> },
    { id: 'trash', name: 'Trash', icon: <Trash2 size={18} /> },
  ];

  const filteredNotes = notes.filter(note => {
    if (selectedFolder === 'starred') return note.starred && !note.deleted;
    if (selectedFolder === 'trash') return note.deleted;
    if (selectedFolder === 'all') return !note.deleted;
    return note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           note.content.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleNewNote = () => {
    const newNote = {
      title: 'Untitled Note',
      content: '',
      starred: false,
      tags: [],
      deleted: false,
      deletedAt: null,
      color: '#ffffff',
      fontFamily: 'default',
    };
    addNote(newNote);
    setShowNotesList(false);
  };

  const handleNoteSelect = (note) => {
    setCurrentNote(note);
    setShowNotesList(false);
  };

  const handleBackToList = () => {
    setShowNotesList(true);
    setCurrentNote(null);
  };

  return (
    <div className="h-screen bg-gray-50">
      {showNotesList ? (
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Notes</h1>
            <button
              onClick={handleNewNote}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus size={20} className="mr-2" />
              New Note
            </button>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex space-x-4 mb-6">
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(folder.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  selectedFolder === folder.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {folder.icon}
                <span className="ml-2">{folder.name}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <NoteList
              notes={filteredNotes}
              onNoteSelect={handleNoteSelect}
              onStarNote={starNote}
              onDeleteNote={deleteNote}
              showTrashOptions={selectedFolder === 'trash'}
            />
          </div>
        </div>
      ) : (
        <div className="h-full">
          <button
            onClick={handleBackToList}
            className="fixed top-4 left-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <ArrowLeft size={24} />
          </button>
          <NoteEditor
            note={currentNote}
            onUpdate={updateNote}
            onClose={handleBackToList}
          />
        </div>
      )}
    </div>
  );
};

export default Notes;