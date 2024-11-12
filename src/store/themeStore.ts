import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDarkMode: boolean;
  primaryColor: string;
  backgroundColor: string;
  backgroundImage: string | null;
  toggleDarkMode: () => void;
  setPrimaryColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  setBackgroundImage: (url: string | null) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      primaryColor: '#3B82F6',
      backgroundColor: '#ffffff',
      backgroundImage: null,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setPrimaryColor: (color) => set({ primaryColor: color }),
      setBackgroundColor: (color) => set({ backgroundColor: color }),
      setBackgroundImage: (url) => set({ backgroundImage: url }),
    }),
    {
      name: 'theme-storage',
    }
  )
);