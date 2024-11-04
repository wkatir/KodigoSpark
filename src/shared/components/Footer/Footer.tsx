import styles from '@/shared/components/Footer/Footer.module.css';
import { FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div>
                <h1 className={styles.title}>Kodigo Spark</h1>
            </div>
            <div className={styles.socials}>
                <a href="#"><FaLinkedin /></a>
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaFacebook /></a>
            </div>
        </footer>
    );
};

export default Footer;