import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateAIResponse } from '../lib/openai';

interface Note {
  id: string;
  title: string;
  content: string;
  lastModified: Date;
  starred: boolean;
  tags: string[];
  deleted: boolean;
  deletedAt: Date | null;
  color: string;
  fontFamily: string;
}

interface NoteState {
  notes: Note[];
  currentNote: Note | null;
  loading: boolean;
  error: string | null;
  addNote: (note: Omit<Note, 'id' | 'lastModified'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string, permanent?: boolean) => void;
  setCurrentNote: (note: Note | null) => void;
  generateAIContent: (prompt: string) => Promise<string>;
  starNote: (id: string) => void;
  cleanupDeletedNotes: () => void;
}

export const useNoteStore = create<NoteState>()(
  persist(
    (set, get) => ({
      notes: [],
      currentNote: null,
      loading: false,
      error: null,

      addNote: (note) => {
        const newNote = {
          ...note,
          id: Date.now().toString(),
          lastModified: new Date(),
        };
        set((state) => ({
          notes: [newNote, ...state.notes],
          currentNote: newNote,
        }));
      },

      updateNote: (id, updates) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? { ...note, ...updates, lastModified: new Date() }
              : note
          ),
        }));
      },

      deleteNote: (id, permanent = false) => {
        set((state) => {
          if (permanent) {
            return {
              notes: state.notes.filter((note) => note.id !== id),
              currentNote: state.currentNote?.id === id ? null : state.currentNote,
            };
          }

          return {
            notes: state.notes.map((note) =>
              note.id === id
                ? {
                    ...note,
                    deleted: !note.deleted,
                    deletedAt: !note.deleted ? new Date() : null,
                  }
                : note
            ),
            currentNote: state.currentNote?.id === id ? null : state.currentNote,
          };
        });
      },

      setCurrentNote: (note) => {
        set({ currentNote: note });
      },

      generateAIContent: async (prompt) => {
        set({ loading: true, error: null });
        try {
          const content = await generateAIResponse(prompt, 'You are a helpful writing assistant.');
          return content || '';
        } catch (error) {
          set({ error: (error as Error).message });
          return '';
        } finally {
          set({ loading: false });
        }
      },

      starNote: (id) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, starred: !note.starred } : note
          ),
        }));
      },

      cleanupDeletedNotes: () => {
        const DAYS_TO_KEEP = 30;
        const now = new Date();
        set((state) => ({
          notes: state.notes.filter((note) => {
            if (!note.deleted || !note.deletedAt) return true;
            const deletedDate = new Date(note.deletedAt);
            const daysSinceDeleted = (now.getTime() - deletedDate.getTime()) / (1000 * 60 * 60 * 24);
            return daysSinceDeleted <= DAYS_TO_KEEP;
          }),
        }));
      },
    }),
    {
      name: 'notes-storage',
    }
  )
);