import Image from 'next/image';
import styles from './NotFoundState.module.css';

interface NotFoundStateProps {
  onReset: () => void;
}

const NotFoundState: React.FC<NotFoundStateProps> = ({ onReset }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image
          src="/not-found-car.png"
          alt="No cars found"
          width={413}
          height={388}
          priority
          className={styles.image}
        />
      </div>
      <h2 className={styles.title}>No cars found</h2>
      <p className={styles.text}>
        We couldn&apos;t find any cars that match your current filters. Try changing your search criteria or reset the filters.
      </p>
      <button type="button" onClick={onReset} className={styles.resetButton}>
        Reset filters
      </button>
    </div>
  );
};

export default NotFoundState;