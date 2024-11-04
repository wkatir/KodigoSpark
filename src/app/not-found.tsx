import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/not-found.module.css';

const notFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.message}>
        <h1>404 - Ups, parece que te perdiste </h1>
        <Link href='/'>Volver al inicio</Link>
      </div>
      <Image
        src='/404-not-found.svg'
        alt='Not found page'
        width={550}
        height={400}
        priority
      />
    </div>
  );
};

export default notFound;