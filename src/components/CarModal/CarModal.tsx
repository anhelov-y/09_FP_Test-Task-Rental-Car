'use client';

import React from 'react';
import { FiX, FiCheckCircle } from 'react-icons/fi';
import { Car } from '@/types/car';
import RentalForm from '../RentalForm/RentalForm';
import styles from './CarModal.module.css';

interface CarModalProps {
  car: Car | null;
  onClose: () => void;
}

const CarModal: React.FC<CarModalProps> = ({ car, onClose }) => {
  if (!car) return null;

  const addressParts = car.address ? car.address.split(', ') : [];
  const city = addressParts.length >= 2 ? addressParts[addressParts.length - 2] : addressParts[0] || '';
  const country = addressParts.length >= 1 ? addressParts[addressParts.length - 1] : '';

  const formattedPrice = car.rentalPrice.startsWith('$') 
    ? car.rentalPrice 
    : `$${car.rentalPrice}`;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          <FiX size={24} color="#101828" />
        </button>

        <div className={styles.modalContentWrapper}>
          <div className={styles.leftColumn}>
            <div className={styles.imageBox}>
              <img
                src={car.img}
                alt={`${car.make} ${car.model}`}
                className={styles.image}
              />
            </div>
            <RentalForm carId={car.id} />
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.content}>
              <div className={styles.titleWrapper}>
                <h2 className={styles.title}>
                  {car.make} <span className={styles.model}>{car.model}</span>, {car.year}
                </h2>
                <span className={styles.article}>Article: {car.id}</span>
              </div>
              
              {(city || country) && (
                <div className={styles.location}>
                  {[city, country].filter(Boolean).join(', ')}
                </div>
              )}

              <div className={styles.price}>
                {formattedPrice}
              </div>

              <p className={styles.description}>{car.description}</p>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Rental Conditions:</h3>
                <ul className={styles.conditionList}>
                  {car.rentalConditions?.map((item, idx) => (
                    <li key={idx} className={styles.conditionItem}>
                      <FiCheckCircle size={16} className={styles.checkIcon} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.divider} />

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Car Specifications:</h3>
                <ul className={styles.conditionList}>
                  <li className={styles.conditionItem}>Year: {car.year}</li>
                  <li className={styles.conditionItem}>Type: {car.type}</li>
                  <li className={styles.conditionItem}>Fuel Consumption: {car.fuelConsumption}</li>
                  <li className={styles.conditionItem}>Engine: {car.engineSize}</li>
                  <li className={styles.conditionItem}>Mileage: {car.mileage?.toLocaleString()} km</li>
                </ul>
              </div>

              <div className={styles.divider} />

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Features</h3>
                <div className={styles.featureTags}>
                  {car.accessories?.map((item, idx) => (
                    <span key={`acc-${idx}`} className={styles.featureItem}>
                      <FiCheckCircle size={16} className={styles.checkIcon} />
                      {item}
                    </span>
                  ))}
                  {car.functionalities?.map((item, idx) => (
                    <span key={`func-${idx}`} className={styles.featureItem}>
                      <FiCheckCircle size={16} className={styles.checkIcon} />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarModal;