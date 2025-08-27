import { create } from 'zustand';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface TeamStore {
  members: TeamMember[];
  addMember: (member: Omit<TeamMember, 'id'>) => void;
  removeMember: (id: string) => void;
  loadMembers: () => void;
}

const STORAGE_KEY = 'team-members';

export const useTeamStore = create<TeamStore>((set, get) => ({
  members: [],

  addMember: (memberData) => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      ...memberData,
    };
    const updatedMembers = [...get().members, newMember];
    set({ members: updatedMembers });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMembers));
  },

  removeMember: (id) => {
    const updatedMembers = get().members.filter(m => m.id !== id);
    set({ members: updatedMembers });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMembers));
  },

  loadMembers: async () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        set({ members: JSON.parse(stored) });
        return;
      }

      const response = await fetch('/data/team-members.json');
      const members = await response.json();
      set({ members });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
    } catch (error) {
      console.error('Failed to load team members:', error);
    }
  },
}));