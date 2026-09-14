import React from 'react';
import Image from 'next/image';
import styles from './CarCard.module.css';

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

interface CarCardProps {
  car: Car;
  onLearnMore?: (car: Car) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onLearnMore }) => {
  const addressParts = car.address ? car.address.split(', ') : ['', ''];
  const city = addressParts[addressParts.length - 2] || '';
  const country = addressParts[addressParts.length - 1] || '';

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={car.img}
          alt={`${car.make} ${car.model}`}
          fill
          className={styles.carImage}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.headerRow}>
          <h3 className={styles.title}>
            {car.make} <span style={{ color: '#00AAD4' }}>{car.model}</span>, {car.year}
          </h3>
          <span className={styles.price}>{car.rentalPrice}</span>
        </div>

        <div className={styles.tagsContainer}>
          <div className={styles.tagRow}>
            <span className={styles.tag}>{city}</span>
            <span className={styles.separator}></span>
            <span className={styles.tag}>{country}</span>
            <span className={styles.separator}></span>
            <span className={styles.tag}>{car.rentalCompany}</span>
          </div>

          <div className={styles.tagRow}>
            <span className={styles.tag}>{car.type}</span>
            <span className={styles.separator}></span>
            <span className={styles.tag}>{car.mileage.toLocaleString('en-US')} km</span>
          </div>
        </div>

        <button
          type="button"
          className={styles.readMoreBtn}
          onClick={() => onLearnMore && onLearnMore(car)}
        >
          Read more
        </button>
      </div>
    </div>
  );
};

export default CarCard;