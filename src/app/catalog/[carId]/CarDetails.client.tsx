'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { fetchCarById } from '@/lib/api/cars';
import RentalForm from '@/components/RentalForm/RentalForm';
import styles from './CarDetails.module.css';

export default function CarDetailsClient({ carId }: { carId: string }) {
  const { data: car, isLoading, isError } = useQuery({
    queryKey: ['car', carId],
    queryFn: () => fetchCarById(carId),
  });

  if (isLoading) return <p className={styles.loading}>Loading car details...</p>;
  if (isError || !car) return <p className={styles.error}>Car not found.</p>;

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <div className={styles.imageBox}>
          <Image
            src={car.img}
            alt={`${car.make} ${car.model}`}
            fill
            className={styles.image}
            priority
          />
        </div>

        <RentalForm carId={car.id} />
      </div>

      <div className={styles.infoSection}>
        <h2>
          {car.make} {car.model}, {car.year}
        </h2>
        <p className={styles.description}>{car.description}</p>
      </div>
    </div>
  );
}