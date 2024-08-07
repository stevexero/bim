import { create } from 'zustand';

const useBarCodeStore = create((set) => ({
  barCode: 'XXX',
  setBarCode: (code) => set({ barCode: code }),
  addBarCode: () => set((state) => ({ barCode: state.barCode })),
  removeBarCode: () => set({ barCode: 'XXX' }),
}));

export default useBarCodeStore;
