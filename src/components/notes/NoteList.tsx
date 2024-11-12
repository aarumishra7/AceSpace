import React from 'react';
import { Star, Trash2, MoreVertical, RefreshCcw } from 'lucide-react';
import { format } from 'date-fns';

const NoteList = ({ notes, onNoteSelect, onStarNote, onDeleteNote, showTrashOptions }) => {
  const handleRestore = (noteId) => {
    onDeleteNote(noteId, false); // Restore note
  };

  const handleDelete = (noteId) => {
    onDeleteNote(noteId, true); // Permanent delete
  };

  return (
    <>
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 cursor-pointer"
          onClick={() => onNoteSelect(note)}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-lg">{note.title}</h3>
            <div className="flex items-center space-x-2">
              {!showTrashOptions && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onStarNote(note.id);
                  }}
                  className={`p-1 rounded hover:bg-gray-100 ${
                    note.starred ? 'text-yellow-400' : 'text-gray-400'
                  }`}
                >
                  <Star size={16} />
                </button>
              )}
              {showTrashOptions ? (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRestore(note.id);
                    }}
                    className="p-1 rounded hover:bg-gray-100 text-green-500"
                    title="Restore"
                  >
                    <RefreshCcw size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(note.id);
                    }}
                    className="p-1 rounded hover:bg-gray-100 text-red-500"
                    title="Delete Permanently"
                  >
                    <Trash2 size={16} />
                  </button>
                </>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteNote(note.id);
                  }}
                  className="p-1 rounded hover:bg-gray-100 text-gray-400"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
            {note.content.replace(/<[^>]*>/g, '').slice(0, 100)}...
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{format(new Date(note.lastModified), 'MMM d, yyyy')}</span>
            {note.deleted && (
              <span className="text-red-500">
                Deleted {format(new Date(note.deletedAt), 'MMM d, yyyy')}
              </span>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default NoteList;