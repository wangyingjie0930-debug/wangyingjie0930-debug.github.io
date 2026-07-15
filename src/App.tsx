import { lazy, Suspense } from 'react';

const HeroSection = lazy(() => import('./sections/HeroSection'));
const MarqueeSection = lazy(() => import('./sections/MarqueeSection'));
const AboutSection = lazy(() => import('./sections/AboutSection'));
const ServicesSection = lazy(() => import('./sections/ServicesSection'));
const ProjectsSection = lazy(() => import('./sections/ProjectsSection'));
const DomeGallerySection = lazy(() => import('./sections/DomeGallerySection'));
const StrengthsSection = lazy(() => import('./sections/StrengthsSection'));

function App() {
  return (
    <main style={{ overflowX: 'clip' }}>
      <Suspense fallback={<div style={{ height: '100vh', background: '#0e0f11' }} />}>
        <HeroSection />
        <MarqueeSection />
        <ProjectsSection />
        <AboutSection />
        <ServicesSection />
        <StrengthsSection />
        <DomeGallerySection />
      </Suspense>
    </main>
  );
}

export default App;
