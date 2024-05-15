import { create } from 'zustand';

interface DemoStore {
  count: number;
  inc: () => void;
}

const useDemoStore = create<DemoStore>((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));

export default useDemoStore;
