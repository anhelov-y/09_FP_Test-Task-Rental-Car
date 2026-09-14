import React from 'react';
import { fetchCarById } from '@/lib/api/cars';
import RentalForm from '@/components/RentalForm/RentalForm';
import Image from 'next/image';

interface CarDetailsPageProps {
  params: {
    carId: string;
  };
}

export default async function CarDetailsPage({ params }: CarDetailsPageProps) {
  const { carId } = params;
  const car = await fetchCarById(carId);

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <main style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: '40px' }}>
        <div style={{ position: 'relative', width: '600px', height: '400px' }}>
          <Image
            src={car.img || '/placeholder.jpg'}
            alt={`${car.make} ${car.model}`}
            fill
            style={{ objectFit: 'cover', borderRadius: '14px' }}
            priority
          />
        </div>
        
        <div style={{ flex: 1 }}>
          <h1>{car.make} {car.model}, {car.year}</h1>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '20px 0' }}>{car.rentalPrice}</p>
          <p style={{ marginBottom: '20px' }}>{car.description}</p>
          
          <RentalForm carId={carId} />
        </div>
      </div>
    </main>
  );
}