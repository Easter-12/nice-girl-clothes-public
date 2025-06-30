import Head from 'next/head';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import styles from '../../styles/Public.module.css';

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// This function tells Next.js which product pages to create at build time
export async function getStaticPaths() {
    const { data, error } = await supabase.from('products').select('id');
    const paths = data.map(product => ({
        params: { id: product.id.toString() },
    }));
    return { paths, fallback: 'blocking' };
}

// This function fetches the data for a single product
export async function getStaticProps({ params }) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id)
        .single();
        
    if (error || !data) {
        return { notFound: true };
    }

    return {
        props: {
            product: data,
        },
        revalidate: 60, // Re-check for updates every 60 seconds
    };
}

// This is the component that displays the page
export default function ProductDetailPage({ product }) {
    return (
        <div className={styles.container}>
            <Head>
                {/* CHANGED: Website Name */}
                <title>{product.name} - Nicegelclothing</title>
                <meta name="description" content={product.description} />
            </Head>

            <header className={styles.header}>
                {/* CHANGED: Website Name */}
                <Link href="/" className={styles.logo}>
                    Nicegelclothing
                </Link>
            </header>

            <main className={styles.main}>
                <div className={styles.productDetailContainer}>
                    <img src={product.image_url} alt={product.name} className={styles.productDetailImage} />
                    <div className={styles.productDetailInfo}>
                        <h1 className={styles.productDetailTitle}>{product.name}</h1>
                        <p className={styles.productDetailPrice}>NGN {Number(product.price).toLocaleString()}</p>
                        <p className={styles.productDetailDescription}>{product.description}</p>
                        <Link href="/" className={styles.backButton}>
                            ← Back to All Products
                        </Link>
                    </div>
                </div>
            </main>
            
            <footer className={styles.footer}>
                <p>© {new Date().getFullYear()} Nicegelclothing</p>
            </footer>
        </div>
    );
}