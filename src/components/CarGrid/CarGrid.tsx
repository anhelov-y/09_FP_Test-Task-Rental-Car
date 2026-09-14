import React from 'react';
import CarCard from '../CarCard/CarCard';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import styles from './CarGrid.module.css';

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  rentalPrice: string;
  address: string;
  rentalCompany: string;
  type: string;
  mileage: number;
  img: string;
}

interface CarGridProps {
  cars: Car[];
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading?: boolean;
  onLearnMore: (car: Car) => void;
}

export default function CarGrid({
  cars,
  onLoadMore,
  hasMore,
  isLoading,
  onLearnMore,
}: CarGridProps) {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.grid}>
        {cars.map((car) => (
          <li key={car.id} className={styles.item}>
            <CarCard car={car} onLearnMore={onLearnMore} />
          </li>
        ))}
      </ul>

      {hasMore && (
        <LoadMoreBtn onClick={onLoadMore} isLoading={isLoading} />
      )}
    </div>
  );
}