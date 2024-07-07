// components/Layout.tsx

import Header from './Header';
import Footer from './Footer';
import '../styles/Header.module.css';
import '../styles/Footer.module.css';

interface LayoutProps {
    children: React.ReactNode; // Define the children prop with React.ReactNode type
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
      <>
        <Header />
        <main>{children}</main>
        <Footer />
      </>
    );
  };
  
  export default Layout;