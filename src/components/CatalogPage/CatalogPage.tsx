'use client';

import React, { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import FilterBar from '../FilterBar/FilterBar';
import CarGrid from '../CarGrid/CarGrid';
import CarModal from '../CarModal/CarModal';
import NotFoundState from '../NotFoundState/NotFoundState';
import styles from './CatalogPage.module.css';
import { Car } from '@/types/car';
import { fetchCars } from '@/lib/api/cars';

const CatalogPage: React.FC = () => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [filters, setFilters] = useState<{ brand?: string; price?: string; minMileage?: string; maxMileage?: string }>({});

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['cars', filters],
    queryFn: ({ pageParam = 1 }) => fetchCars(pageParam, 8),
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length < lastPage.totalPages) {
        return allPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  const allLoadedCars = data?.pages.flatMap((page) => page.cars) || [];

  const filteredCars = allLoadedCars.filter((car: any) => {
    const brandMatch = filters.brand ? (car.make || car.brand) === filters.brand : true;
    const priceMatch = filters.price ? Number(car.rentalPrice?.replace('$', '') || car.price) <= Number(filters.price) : true;
    const minM = filters.minMileage ? Number(car.mileage) >= Number(filters.minMileage) : true;
    const maxM = filters.maxMileage ? Number(car.mileage) <= Number(filters.maxMileage) : true;
    return brandMatch && priceMatch && minM && maxM;
  });

  const uniqueBrands = Array.from(
    new Set(allLoadedCars.map((car: any) => car.make || car.brand).filter(Boolean))
  ) as string[];

  const handleSearch = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  return (
    <div className={styles.pageContainer}>
      <main className={styles.mainContent}>
        <FilterBar
          brands={uniqueBrands}
          onSearch={handleSearch}
          onReset={handleResetFilters}
        />

        {isLoading && allLoadedCars.length === 0 ? (
          <div className={styles.loading}>Loading cars...</div>
        ) : filteredCars.length === 0 ? (
          <NotFoundState onReset={handleResetFilters} />
        ) : (
          <CarGrid
            cars={filteredCars}
            onLoadMore={() => fetchNextPage()}
            hasMore={!!hasNextPage}
            isLoading={isFetchingNextPage}
            onLearnMore={(car: Car) => setSelectedCar(car)}
          />
        )}

        {selectedCar && (
          <CarModal car={selectedCar} onClose={() => setSelectedCar(null)} />
        )}
      </main>
    </div>
  );
};

export default CatalogPage;