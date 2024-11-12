import LogoutButton from '@/app/dashboard/DashBoard/components/LogoutButton/LogoutButton';
import styles from '@/shared/components/Navbar/Navbar.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.navHeader}>
                    <h1 className={styles.title}>Kodigo Spark</h1>
                    <div className={styles.menu} onClick={toggleMenu}>
                        <GiHamburgerMenu />
                    </div>
                </div>
                <div className={`${styles.content} ${isMenuOpen ? styles.open : ''}`}>
                    <Link href='/'>Cursos</Link>
                    <Link href='/faq'>FAQ</Link>
                    <div className={styles.mobileLogout}>
                        <LogoutButton></LogoutButton>
                    </div>
                </div>
                <div className={styles.desktopLogout}>
                    <LogoutButton />
                </div>
            </nav>
        </>
    );
};
