import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import CustomCursor from '@/components/CustomCursor';
import PageLoader from '@/components/PageLoader';

export const metadata = {
  title: 'Portfolio | Ayushman Singh',
  description: 'Full Stack Developer Portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="noise bg-dark min-h-screen">
        <PageLoader />
        <div id="cursor-dot" />
        <div id="cursor-ring" />
        <CustomCursor />
        <ParticleBackground />
        <div className="relative z-10">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
