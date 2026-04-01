import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';

export const metadata = {
  title: 'Portfolio',
  description: 'My personal portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="noise bg-dark min-h-screen">
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
