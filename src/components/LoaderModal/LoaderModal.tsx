import React from 'react';
import styles from './LoaderModal.module.css';

const LoaderModal: React.FC = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modalCard}>
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner}></div>
        </div>
        <div className={styles.textGroup}>
          <h2 className={styles.title}>Loading cars...</h2>
          <p className={styles.description}>
            Please wait while we fetch the best cars for you
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoaderModal;