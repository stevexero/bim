import { create } from 'zustand';

const useBarCodeStore = create((set) => ({
  barCode: 'XXX',
  isScannerRunning: false,
  setBarCode: (code) => set({ barCode: code }),
  setScannerRunning: (isRunning) => set({ isScannerRunning: isRunning }),
  //   addBarCode: () => set((state) => ({ barCode: state.barCode })),
  //   removeBarCode: () => set({ barCode: 'XXX' }),
}));

export default useBarCodeStore;
