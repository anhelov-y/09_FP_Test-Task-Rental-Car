import { create } from 'zustand';

interface FilterState {
  brand: string;
  price: string;
  minMileage: string;
  maxMileage: string;
  setBrand: (brand: string) => void;
  setPrice: (price: string) => void;
  setMinMileage: (mileage: string) => void;
  setMaxMileage: (mileage: string) => void;
  resetFilters: () => void;
}

const initialFilters = {
  brand: '',
  price: '',
  minMileage: '',
  maxMileage: '',
};

export const useFilterStore = create<FilterState>((set) => ({
  ...initialFilters,
  setBrand: (brand) => set({ brand }),
  setPrice: (price) => set({ price }),
  setMinMileage: (minMileage) => set({ minMileage }),
  setMaxMileage: (maxMileage) => set({ maxMileage }),
  resetFilters: () => set(initialFilters),
}));