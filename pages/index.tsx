import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import styles from '../styles/Public.module.css';
import { BsThreeDotsVertical } from 'react-icons/bs';

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- The Main Component for the Public Page ---
export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    
    // --- NEW: State for the "New Arrivals" banner ---
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // --- This function now does two things ---
        const fetchProductsAndCheckForNew = async () => {
            setLoading(true);
            
            // 1. Fetch all products to display on the page
            const { data: allProducts, error: productsError } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (productsError) {
                console.error('Error fetching products:', productsError);
            } else {
                setProducts(allProducts);
            }

            // 2. NEW: Check for products added in the last 24 hours
            const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
            const { data: newProducts, error: newProductsError } = await supabase
                .from('products')
                .select('id', { count: 'exact' })
                .gt('created_at', twentyFourHoursAgo);

            if (!newProductsError && newProducts.length > 0) {
                setShowBanner(true); // If new products exist, set state to show banner
            }
            
            setLoading(false);
        };

        fetchProductsAndCheckForNew();
    }, []);
    
    // Social Media Links
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

            {/* --- NEW: The Banner itself. It only shows if showBanner is true --- */}
            {showBanner && (
                <div className={styles.newArrivalsBanner}>
                    <span>✨ New Arrivals! Check out our latest designs.</span>
                    <button onClick={() => setShowBanner(false)} className={styles.closeButton}>×</button>
                </div>
            )}

            <header className={styles.header}>
                <div className={styles.logo}>Nice Girl Clothes</div>
                <div className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
                    <BsThreeDotsVertical />
                </div>
                {menuOpen && (
                    <div className={styles.socialMenu}>
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