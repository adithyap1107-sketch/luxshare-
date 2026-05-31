import { useEffect, useMemo, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VoidShader from './sections/VoidShader';
import Hero from './sections/Hero';
import Stats from './sections/Stats';
import FleetIndex from './sections/FleetIndex';
import CarDetail from './sections/CarDetail';
import HowItWorks from './sections/HowItWorks';
import CinematicPavilions from './sections/CinematicPavilions';
import Footer from './sections/Footer';
import CustomCursor from './components/CustomCursor';
import { siteConfig } from './config';
import { getExhibitionBySlug } from './lib/exhibitions';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    // Enable smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Handle anchor link clicks for smooth scroll
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const el = document.querySelector(href);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    document.addEventListener('click', handleClick);

    const handlePopState = () => {
      setPathname(window.location.pathname);
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('popstate', handlePopState);
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  useEffect(() => {
    document.title = siteConfig.siteTitle || '';
    document.documentElement.lang = siteConfig.language || '';

    let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = siteConfig.siteDescription || '';
  }, []);

  const activeExhibition = useMemo(() => {
    const match = pathname.match(/^\/fleet\/([^/]+)$/);
    if (!match) return null;
    return getExhibitionBySlug(match[1]);
  }, [pathname]);

  const navigateToCar = (slug: string) => {
    const nextPath = `/fleet/${slug}`;
    window.history.pushState({}, '', nextPath);
    setPathname(nextPath);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const navigateToFleet = () => {
    window.history.pushState({}, '', '/');
    setPathname('/');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  // Car detail page
  if (pathname.startsWith('/fleet/') && activeExhibition) {
    return (
      <>
        <CustomCursor />
        <CarDetail exhibition={activeExhibition} onBack={navigateToFleet} />
      </>
    );
  }

  // Home page
  return (
    <>
      <CustomCursor />

      {/* Hero with Void Shader Background */}
      <div style={{ position: 'relative', height: '100vh' }}>
        <VoidShader />
        <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Hero />
          <div style={{ marginTop: 'auto', paddingBottom: '4rem', position: 'relative', zIndex: 1 }}>
            <Stats />
          </div>
        </div>
      </div>

      {/* Fleet Index */}
      <FleetIndex onSelect={navigateToCar} />

      {/* How It Works / Manifesto */}
      <HowItWorks />

      {/* Cinematic Pavilions */}
      <CinematicPavilions />

      {/* Footer */}
      <Footer />
    </>
  );
}
