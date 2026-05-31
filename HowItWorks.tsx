import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { howItWorksConfig, manifestoConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

function typeText(setter: (value: string) => void, text: string, speed: number): Promise<void> {
  return new Promise((resolve) => {
    setter('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setter(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
}

// SVG Icons for each step
function StepIcon({ icon, color }: { icon: string; color: string }) {
  const size = 40;
  const strokeWidth = 1.5;

  switch (icon) {
    case 'coins':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="8" r="6" />
          <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
          <path d="M7 6h1v4" />
          <path d="m16.71 13.88.7.71-2.82 2.82" />
        </svg>
      );
    case 'calendar-check':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
          <path d="m9 16 2 2 4-4" />
        </svg>
      );
    case 'chart-line':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v16a2 2 0 0 0 2 2h16" />
          <path d="m19 9-5 5-4-4-3 3" />
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      );
  }
}

function StepCard({ step, index }: { step: typeof howItWorksConfig.steps[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              card,
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 0.8, delay: index * 0.15, ease: 'power2.out' }
            );
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      style={{
        opacity: 0,
        position: 'relative',
        padding: '2.5rem',
        background: 'rgba(30, 41, 59, 0.4)',
        borderRadius: '1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        transition: 'border-color 0.3s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${step.accentColor}50`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.08)';
      }}
    >
      {/* Step Number Badge */}
      <div
        style={{
          position: 'absolute',
          top: '-1rem',
          right: '-0.5rem',
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '50%',
          background: step.accentColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 700,
          fontSize: '0.9rem',
          fontFamily: 'var(--font-sans)',
          boxShadow: `0 4px 15px ${step.accentColor}40`,
        }}
      >
        {step.number}
      </div>

      {/* Icon */}
      <div style={{ marginBottom: '1.5rem' }}>
        <StepIcon icon={step.icon} color={step.accentColor} />
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.3rem, 2vw, 1.75rem)',
          fontWeight: 400,
          color: 'var(--text-primary)',
          margin: '0 0 1rem',
          lineHeight: 1.2,
        }}
      >
        {step.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.9rem',
          lineHeight: 1.7,
          color: 'var(--text-secondary)',
          margin: 0,
        }}
      >
        {step.description}
      </p>
    </div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const hasRunRef = useRef(false);
  const [headingText, setHeadingText] = useState('');
  const [bodyText, setBodyText] = useState('');
  const hasManifestoContent =
    manifestoConfig.headingText || manifestoConfig.bodyText || manifestoConfig.videoPath;

  useEffect(() => {
    if (!hasManifestoContent) return;

    const section = sectionRef.current;
    if (!section) return;

    async function runManifesto() {
      if (hasRunRef.current) return;
      hasRunRef.current = true;
      if (manifestoConfig.headingText) {
        await typeText(setHeadingText, manifestoConfig.headingText, 60);
      }
      if (manifestoConfig.bodyText) {
        await new Promise((r) => setTimeout(r, 400));
        await typeText(setBodyText, manifestoConfig.bodyText, 30);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runManifesto();
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [hasManifestoContent]);

  // Header animation
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              header,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
            );
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      style={{
        background: 'var(--bg-primary)',
        padding: '6rem 4vw 10rem',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {/* Manifesto with Video */}
      {hasManifestoContent && (
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto 6rem',
            display: 'grid',
            gridTemplateColumns: manifestoConfig.videoPath
              ? 'minmax(0, 1fr) minmax(320px, 44vw)'
              : 'minmax(0, 1fr)',
            gap: '4rem',
            alignItems: 'center',
          }}
        >
          <div style={{ maxWidth: '65ch' }}>
            {manifestoConfig.headingText && (
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 600,
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                  color: 'var(--text-primary)',
                  minHeight: '1.2em',
                  display: 'block',
                }}
              >
                {headingText}
              </h2>
            )}
            {manifestoConfig.bodyText && (
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.8rem, 1.1vw, 0.95rem)',
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: 'var(--text-secondary)',
                  marginTop: '2.5rem',
                  minHeight: '3em',
                  display: 'block',
                }}
              >
                {bodyText}
              </p>
            )}
          </div>

          {manifestoConfig.videoPath && (
            <div
              style={{
                width: '100%',
                maxWidth: '720px',
                justifySelf: 'end',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 9',
                  overflow: 'hidden',
                  background: '#000',
                  borderRadius: '0.5rem',
                }}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                >
                  <source src={manifestoConfig.videoPath} type="video/mp4" />
                </video>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Steps Header */}
      <div
        ref={headerRef}
        style={{
          maxWidth: '1400px',
          margin: '0 auto 4rem',
          textAlign: 'center',
          opacity: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.7rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--accent-rose)',
            display: 'block',
            marginBottom: '1rem',
          }}
        >
          {howItWorksConfig.sectionLabel}
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 400,
            lineHeight: 1.15,
            color: 'var(--text-primary)',
            margin: '0 0 1rem',
          }}
        >
          {howItWorksConfig.heading}
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            maxWidth: '45ch',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          {howItWorksConfig.subheading}
        </p>
      </div>

      {/* Steps Grid */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2.5rem',
        }}
      >
        {howItWorksConfig.steps.map((step, i) => (
          <StepCard key={step.number} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}
