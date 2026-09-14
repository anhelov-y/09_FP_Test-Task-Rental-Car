'use client';

import { useEffect, useState, use } from 'react';
import Image from 'next/image';
import { fetchCarById } from '@/lib/api/cars';
import { Car } from '@/types/car';
import RentalForm from '@/components/RentalForm/RentalForm';
import css from './CarDetails.module.css';

interface PageProps {
  params: Promise<{ carId: string }>;
}

export default function CarDetailsPage({ params }: PageProps) {
  const { carId } = use(params);
  const [car, setCar] = useState<Car | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCar = async () => {
      try {
        const data = await fetchCarById(carId);
        setCar(data);
      } catch (error) {
        console.error('Failed to fetch car details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getCar();
  }, [carId]);

  if (isLoading) return <p className={css.loading}>Loading car details...</p>;
  if (!car) return <p className={css.error}>Car not found</p>;

  const addressParts = car.address ? car.address.split(', ') : [];
  const city = addressParts[addressParts.length - 2] || '';
  const country = addressParts[addressParts.length - 1] || '';

  return (
    <main className={css.container}>
      <div className={css.content}>
        <div className={css.imageWrap}>
          <Image
            src={car.img || '/placeholder.png'}
            alt={`${car.make} ${car.model}`}
            fill
            className={css.image}
          />
        </div>

        <div className={css.info}>
          <h1 className={css.title}>
            {car.make} <span className={css.accent}>{car.model}</span>, {car.year}
          </h1>

          <p className={css.meta}>
            {city} | {country} | Id: {car.id} | Year: {car.year} | Type: {car.type}
          </p>

          <p className={css.price}>Rental Price: <span>{car.rentalPrice}</span></p>

          <p className={css.description}>{car.description}</p>

          <div className={css.section}>
            <h3>Rental Conditions:</h3>
            <div className={css.tags}>
              <span className={css.tag}>{car.rentalConditions}</span>
              <span className={css.tag}>Mileage: {car.mileage.toLocaleString()}</span>
            </div>
          </div>

          <RentalForm />
        </div>
      </div>
    </main>
  );
}