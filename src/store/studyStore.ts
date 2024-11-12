import { create } from 'zustand';
import { generateStudyRoadmap } from '../lib/openai';

interface StudyPlan {
  id: string;
  subject: string;
  roadmap: string;
  timeAvailable: number;
  difficulty: string;
  createdAt: Date;
}

interface StudyState {
  plans: StudyPlan[];
  loading: boolean;
  error: string | null;
  currentPlan: StudyPlan | null;
  generatePlan: (subject: string, timeAvailable: number, difficulty: string) => Promise<void>;
  deletePlan: (id: string) => void;
  setCurrentPlan: (plan: StudyPlan | null) => void;
}

export const useStudyStore = create<StudyState>((set) => ({
  plans: [],
  loading: false,
  error: null,
  currentPlan: null,

  generatePlan: async (subject, timeAvailable, difficulty) => {
    set({ loading: true, error: null });
    try {
      const roadmap = await generateStudyRoadmap(subject, timeAvailable, difficulty);
      const newPlan = {
        id: Date.now().toString(),
        subject,
        roadmap,
        timeAvailable,
        difficulty,
        createdAt: new Date(),
      };
      set((state) => ({
        plans: [...state.plans, newPlan],
        currentPlan: newPlan,
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  deletePlan: (id) => {
    set((state) => ({
      plans: state.plans.filter((plan) => plan.id !== id),
      currentPlan: state.currentPlan?.id === id ? null : state.currentPlan,
    }));
  },

  setCurrentPlan: (plan) => {
    set({ currentPlan: plan });
  },
}));