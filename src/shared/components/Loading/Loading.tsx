import { LiaSpinnerSolid } from 'react-icons/lia';
import styles from '@/shared/components/Loading/Loading.module.css';

export const Loading = () => {
  return (
    <div className={styles.loading}>
      <LiaSpinnerSolid className={styles.icon} />
    </div>
  );
};

