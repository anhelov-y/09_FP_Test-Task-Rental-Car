'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './FilterBar.module.css';

interface FilterBarProps {
  brands: string[];
  onSearch: (filters: {
    brand: string;
    price: string;
    minMileage: string;
    maxMileage: string;
  }) => void;
  onReset?: () => void;
}

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    className={`${styles.chevronIcon} ${isOpen ? styles.chevronOpen : ''}`}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="#101828"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FilterBar: React.FC<FilterBarProps> = ({ brands, onSearch, onReset }) => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [minMileage, setMinMileage] = useState('');
  const [maxMileage, setMaxMileage] = useState('');

  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const brandRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);

  const priceOptions = Array.from({ length: 18 }, (_, i) => 30 + i * 10);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (brandRef.current && !brandRef.current.contains(event.target as Node)) {
        setIsBrandOpen(false);
      }
      if (priceRef.current && !priceRef.current.contains(event.target as Node)) {
        setIsPriceOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    onSearch({
      brand: selectedBrand,
      price: selectedPrice,
      minMileage,
      maxMileage,
    });
  };

  const handleReset = () => {
    setSelectedBrand('');
    setSelectedPrice('');
    setMinMileage('');
    setMaxMileage('');
    if (onReset) onReset();
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.inputGroup} ref={brandRef}>
        <label className={styles.label}>Car brand</label>
        <div
          className={`${styles.selectTrigger} ${styles.selectBrand}`}
          onClick={() => setIsBrandOpen(!isBrandOpen)}
        >
          <span>{selectedBrand || 'Choose a brand'}</span>
          <ChevronIcon isOpen={isBrandOpen} />
        </div>

        {isBrandOpen && (
          <ul className={styles.dropdownList}>
            <li
              className={styles.dropdownItem}
              onClick={() => {
                setSelectedBrand('');
                setIsBrandOpen(false);
              }}
            >
              Choose a brand
            </li>
            {brands.map((brand) => (
              <li
                key={brand}
                className={`${styles.dropdownItem} ${selectedBrand === brand ? styles.selected : ''}`}
                onClick={() => {
                  setSelectedBrand(brand);
                  setIsBrandOpen(false);
                }}
              >
                {brand}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.inputGroup} ref={priceRef}>
        <label className={styles.label}>Price / 1 hour</label>
        <div
          className={`${styles.selectTrigger} ${styles.selectPrice}`}
          onClick={() => setIsPriceOpen(!isPriceOpen)}
        >
          <span>{selectedPrice ? `To ${selectedPrice}$` : 'Choose a price'}</span>
          <ChevronIcon isOpen={isPriceOpen} />
        </div>

        {isPriceOpen && (
          <ul className={styles.dropdownList}>
            <li
              className={styles.dropdownItem}
              onClick={() => {
                setSelectedPrice('');
                setIsPriceOpen(false);
              }}
            >
              Choose a price
            </li>
            {priceOptions.map((price) => (
              <li
                key={price}
                className={`${styles.dropdownItem} ${selectedPrice === String(price) ? styles.selected : ''}`}
                onClick={() => {
                  setSelectedPrice(String(price));
                  setIsPriceOpen(false);
                }}
              >
                To {price}$
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Car mileage / km</label>
        <div className={styles.rangeInputs}>
          <input
            type="number"
            placeholder="From"
            className={styles.inputLeft}
            value={minMileage}
            onChange={(e) => setMinMileage(e.target.value)}
          />
          <input
            type="number"
            placeholder="To"
            className={styles.inputRight}
            value={maxMileage}
            onChange={(e) => setMaxMileage(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <button
          type="button"
          className={styles.searchButton}
          onClick={handleSearch}
        >
          Search
        </button>
        {onReset && (
          <button
            type="button"
            className={styles.clearLink}
            onClick={handleReset}
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;