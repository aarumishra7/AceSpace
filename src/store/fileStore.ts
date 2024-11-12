import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Folder {
  id: string;
  name: string;
  color?: string;
}

interface File {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  folderId?: string;
  lastAccessed: Date;
  visitCount: number;
}

interface FileState {
  files: File[];
  folders: Folder[];
  currentFolder: Folder | null;
  loading: boolean;
  error: string | null;
  addFolder: (name: string) => void;
  renameFolder: (id: string, name: string) => void;
  deleteFolder: (id: string) => void;
  setCurrentFolder: (folder: Folder | null) => void;
  addFile: (file: Omit<File, 'id' | 'lastAccessed' | 'visitCount'>) => void;
  deleteFile: (id: string) => void;
  searchFiles: (query: string, folder: Folder | null) => void;
  sortFiles: (sortType: string) => void;
  incrementFileVisit: (id: string) => void;
}

export const useFileStore = create<FileState>()(
  persist(
    (set, get) => ({
      files: [],
      folders: [],
      currentFolder: null,
      loading: false,
      error: null,

      addFolder: (name) => {
        const newFolder: Folder = {
          id: Date.now().toString(),
          name,
        };
        set((state) => ({
          folders: [...state.folders, newFolder],
        }));
      },

      renameFolder: (id, name) => {
        set((state) => ({
          folders: state.folders.map((folder) =>
            folder.id === id ? { ...folder, name } : folder
          ),
        }));
      },

      deleteFolder: (id) => {
        set((state) => ({
          folders: state.folders.filter((folder) => folder.id !== id),
          files: state.files.filter((file) => file.folderId !== id),
        }));
      },

      setCurrentFolder: (folder) => {
        set({ currentFolder: folder });
      },

      addFile: (file) => {
        const newFile: File = {
          ...file,
          id: Date.now().toString(),
          lastAccessed: new Date(),
          visitCount: 0,
        };
        set((state) => ({
          files: [...state.files, newFile],
        }));
      },

      deleteFile: (id) => {
        set((state) => ({
          files: state.files.filter((file) => file.id !== id),
        }));
      },

      searchFiles: (query, folder) => {
        const { files } = get();
        const searchResults = files.filter((file) => {
          const matchesQuery = file.name.toLowerCase().includes(query.toLowerCase());
          const matchesFolder = folder ? file.folderId === folder.id : true;
          return matchesQuery && matchesFolder;
        });
        return searchResults;
      },

      sortFiles: (sortType) => {
        set((state) => {
          const sortedFiles = [...state.files].sort((a, b) => {
            switch (sortType) {
              case 'name-asc':
                return a.name.localeCompare(b.name);
              case 'name-desc':
                return b.name.localeCompare(a.name);
              case 'size-asc':
                return a.size - b.size;
              case 'size-desc':
                return b.size - a.size;
              case 'date-asc':
                return new Date(a.lastAccessed).getTime() - new Date(b.lastAccessed).getTime();
              case 'date-desc':
                return new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime();
              case 'visits-desc':
                return b.visitCount - a.visitCount;
              default:
                return 0;
            }
          });
          return { files: sortedFiles };
        });
      },

      incrementFileVisit: (id) => {
        set((state) => ({
          files: state.files.map((file) =>
            file.id === id
              ? { ...file, visitCount: file.visitCount + 1, lastAccessed: new Date() }
              : file
          ),
        }));
      },
    }),
    {
      name: 'file-storage',
    }
  )
);