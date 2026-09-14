import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favorites: string[]; // Зберігаємо масив ID
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useCarStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (id: string) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((carId) => carId !== id)
            : [...state.favorites, id],
        })),
      isFavorite: (id: string) => get().favorites.includes(id),
    }),
    {
      name: 'favorite-cars',
    }
  )
);