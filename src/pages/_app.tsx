// // src/pages/_app.tsx or pages/_app.tsx

// import '../styles/globals.css';
// import type { AppProps } from 'next/app';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import '../styles/Header.module.css';
// import '../styles/Footer.module.css';

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <>
//       <Header />
//       <Component {...pageProps} />
//       <Footer />
//     </>
//   );
// }

// export default MyApp;

// pages/_app.tsx

import '../styles/globals.css';

import { useRouter } from 'next/router';
import { useEffect } from 'react';

import type { AppProps } from 'next/app';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();

  useEffect(() => {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''; // Set your base path
    if (basePath && router.pathname.startsWith(basePath)) {
      const newPath = router.pathname.replace(basePath, '');
      router.push(newPath);
    }
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
