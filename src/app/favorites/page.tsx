'use client';

import { useState, useEffect } from 'react';
import { Car } from '@/types/car';
import CarCard from '@/components/CarCard/CarCard';
import CarModal from '@/components/CarModal/CarModal';
import css from './favorites.module.css';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse favorites:', e);
      }
    }
  }, []);

  const handleToggleFavorite = (car: Car) => {
    setFavorites((prev) => {
      const updated = prev.filter((item) => item.id !== car.id);
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <main className={css.container}>
      <h1 className={css.title}>Favorites</h1>

      {favorites.length === 0 ? (
        <p className={css.emptyText}>You haven't added any cars to favorites yet.</p>
      ) : (
        <div className={css.grid}>
          {favorites.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              isFavorite={true}
              onToggleFavorite={handleToggleFavorite}
              onLearnMore={(carToOpen) => setSelectedCar(carToOpen)}
            />
          ))}
        </div>
      )}

      {selectedCar && (
        <CarModal car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}
    </main>
  );
}