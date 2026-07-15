import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import ProjectsSection from './sections/ProjectsSection';
import DomeGallerySection from './sections/DomeGallerySection';
import StrengthsSection from './sections/StrengthsSection';

function App() {
  return (
    <main style={{ overflowX: 'clip' }}>
      <HeroSection />
      <MarqueeSection />
      <ProjectsSection />
      <AboutSection />
      <ServicesSection />
      <StrengthsSection />
      <DomeGallerySection />
    </main>
  );
}

export default App;
