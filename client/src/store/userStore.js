import { create } from 'zustand';

const useUserStore = create((set) => ({
  username: '',
  setUsername: (name) => set({ username: name }),
  clearUser: () => set({ username: '' })
}));

export default useUserStore;
