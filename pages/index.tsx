import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import styles from '../styles/Public.module.css';
import { BsThreeDotsVertical } from 'react-icons/bs'; // Import the new icon

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- The Main Component for the Public Page ---
export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching products:', error);
            } else {
                setProducts(data);
            }
            setLoading(false);
        };

        fetchProducts();
    }, []);
    
    // --- CORRECT SOCIAL MEDIA LINKS ---
    const socialLinks = {
        whatsapp: 'https://wa.me/2348103955817',
        telegram: 'https://t.me/nicegelclothing',
        email: 'mailto:estherbeauty123456@gmail.com',
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Nice Girl Clothes</title>
                <meta name="description" content="Beautiful, custom-made clothes." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className={styles.header}>
                <div className={styles.logo}>Nice Girl Clothes</div>
                <div className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
                    <BsThreeDotsVertical /> {/* Using the new icon component */}
                </div>
                {menuOpen && (
                    <div className={styles.socialMenu}>
                        {/* Links are now updated and Facebook is removed */}
                        <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                        <a href={socialLinks.telegram} target="_blank" rel="noopener noreferrer">Telegram</a>
                        <a href={socialLinks.email}>Email</a>
                    </div>
                )}
            </header>

            <main className={styles.main}>
                <h1 className={styles.title}>Our Collection</h1>
                
                {loading ? (
                    <p>Loading clothes...</p>
                ) : (
                    <div className={styles.productGrid}>
                        {products.map((product) => (
                            <div key={product.id} className={styles.productCard}>
                                <img src={product.image_url} alt={product.name} className={styles.cardImage} />
                                <div className={styles.cardBody}>
                                    <h2 className={styles.cardTitle}>{product.name}</h2>
                                    <p className={styles.cardDescription}>{product.description}</p>
                                    <p className={styles.cardPrice}>NGN {Number(product.price).toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            
            <footer className={styles.footer}>
                <Link href="/about" className={styles.footerLink}>
                    About Us
                </Link>
                <p>© {new Date().getFullYear()} Nice Girl Clothes</p>
            </footer>
        </div>
    );
}