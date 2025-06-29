import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Public.module.css';

export default function AboutPage() {
    return (
        <div className={styles.container}>
            <Head>
                <title>About Us - Nice Girl Clothes</title>
            </Head>

            <header className={styles.header}>
                <Link href="/" className={styles.logo}>
                    Nice Girl Clothes
                </Link>
            </header>

            <main className={styles.main}>
                <div className={styles.aboutSection}>
                    <h1>About Nice Girl Clothes</h1>
                    <p>
                        Welcome to Nice Girl Clothes, where style meets craftsmanship. 
                        We believe that every woman deserves to wear clothes that make her feel beautiful, confident, and unique.
                    </p>
                    <p>
                        Founded by a passionate tailor with a keen eye for detail and a love for elegant design, 
                        our brand is dedicated to creating high-quality, custom-fit apparel for the modern woman. 
                        Each piece in our collection is thoughtfully designed and meticulously stitched, 
                        using only the finest fabrics sourced with care.
                    </p>
                    <p>
                        Our mission is to empower women through fashion, providing them with pieces that are not just clothes, 
                        but a reflection of their personality and grace. Thank you for choosing us to be a part of your style journey.
                    </p>
                </div>
            </main>
            
            <footer className={styles.footer}>
                <Link href="/" className={styles.footerLink}>
                    Back to Shop
                </Link>
                <p>© {new Date().getFullYear()} Nice Girl Clothes</p>
            </footer>
        </div>
    );
}