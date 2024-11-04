import styles from '@/shared/components/Navbar/Navbar.module.css';
import Link from 'next/link';

export const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div>
                <h1 className={styles.title}>Kodigo Spark</h1>
            </div>
            <div className={styles.content}>
                <Link href='/'>Cursos</Link>
                <Link href=''>FAQ</Link>
            </div>
        </nav>
    );
};
