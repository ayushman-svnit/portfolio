import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import CustomCursor from '@/components/CustomCursor';
import SupernovaLoader from '@/components/SupernovaLoader';

export const metadata = {
  title: 'Portfolio | Ayushman Singh',
  description: 'Full Stack Developer Portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="noise min-h-screen" style={{ background: '#06060f' }}>
        <SupernovaLoader />
        
        {/* Video Background - Layer 0 */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed inset-0 w-full h-full object-cover"
          style={{ zIndex: 0, opacity: 0.3 }}
        >
          <source src="/332264_medium.mp4" type="video/mp4" />
        </video>
        
        {/* Particle effects - Layer 2 */}
        <ParticleBackground />
        
        <div id="cursor-dot" />
        <div id="cursor-ring" />
        <CustomCursor />
        
        {/* Main content - Layer 10 */}
        <div className="relative" style={{ zIndex: 10 }}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
