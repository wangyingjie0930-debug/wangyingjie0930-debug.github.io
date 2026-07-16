import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';

const HeroSection = lazy(() => import('./sections/HeroSection'));

/* 视口懒加载包装器：进入视口（含 200px 预加载缓冲）才加载组件 */
function LazySection({ children, threshold = 0.05 }: { children: ReactNode; threshold?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px', threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} style={{ minHeight: '1px' }}>
      {inView ? children : null}
    </div>
  );
}

const MarqueeSection = lazy(() => import('./sections/MarqueeSection'));
const AboutSection = lazy(() => import('./sections/AboutSection'));
const ServicesSection = lazy(() => import('./sections/ServicesSection'));
const ProjectsSection = lazy(() => import('./sections/ProjectsSection'));
const DomeGallerySection = lazy(() => import('./sections/DomeGallerySection'));
const StrengthsSection = lazy(() => import('./sections/StrengthsSection'));

const fallback = <div style={{ height: '100vh' }} />;

function App() {
  return (
    <main style={{ overflowX: 'clip' }}>
      <Suspense fallback={<div style={{ height: '100vh', background: '#0e0f11' }} />}>
        <HeroSection />
      </Suspense>

      <LazySection>
        <Suspense fallback={fallback}>
          <MarqueeSection />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={fallback}>
          <ProjectsSection />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={fallback}>
          <AboutSection />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={fallback}>
          <ServicesSection />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={fallback}>
          <StrengthsSection />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={fallback}>
          <DomeGallerySection />
        </Suspense>
      </LazySection>
    </main>
  );
}

export default App;
