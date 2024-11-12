import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { auth, storage, db } from '../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface ProfileState {
  displayName: string;
  photoURL: string | null;
  loading: boolean;
  error: string | null;
  updateProfile: (data: { displayName?: string; photoURL?: string }) => Promise<void>;
  uploadProfilePicture: (file: File) => Promise<void>;
  fetchProfile: () => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  displayName: '',
  photoURL: null,
  loading: false,
  error: null,

  updateProfile: async (data) => {
    try {
      set({ loading: true, error: null });
      const user = auth.currentUser;
      if (!user) throw new Error('No user logged in');

      await setDoc(doc(db, 'users', user.uid), {
        ...data,
        updatedAt: new Date().toISOString(),
      }, { merge: true });

      set((state) => ({
        ...state,
        ...data,
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  uploadProfilePicture: async (file) => {
    try {
      set({ loading: true, error: null });
      const user = auth.currentUser;
      if (!user) throw new Error('No user logged in');

      const storageRef = ref(storage, `profiles/${user.uid}`);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);

      await get().updateProfile({ photoURL });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchProfile: async () => {
    try {
      set({ loading: true, error: null });
      const user = auth.currentUser;
      if (!user) throw new Error('No user logged in');

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        set({
          displayName: data.displayName || '',
          photoURL: data.photoURL || null,
          loading: false,
        });
      }
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));