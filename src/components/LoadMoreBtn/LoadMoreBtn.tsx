import styles from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onClick: () => void;
  isLoading?: boolean;
}

export default function LoadMoreBtn({ onClick, isLoading }: LoadMoreBtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className={styles.loadMoreBtn} 
    >
      {isLoading ? 'Loading...' : 'Load more'}
    </button>
  );
}