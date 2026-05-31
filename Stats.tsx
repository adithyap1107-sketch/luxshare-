import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { statsConfig } from '../config';

export default function Stats() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stats = statsRef.current;
    if (!stats) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = stats.querySelectorAll('.stat-card');
            gsap.fromTo(
              cards,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
            );
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(stats);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={statsRef}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1.5rem',
        maxWidth: '800px',
        margin: '3rem auto 0',
        width: '100%',
      }}
    >
      {statsConfig.items.map((stat) => (
        <div
          key={stat.label}
          className="stat-card"
          style={{
            opacity: 0,
            padding: '1.5rem',
            background: 'rgba(30, 41, 59, 0.6)',
            borderRadius: '1rem',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            textAlign: 'center',
            borderBottom: `3px solid ${stat.accentColor}`,
            transition: 'transform 0.3s ease, border-color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
            (e.currentTarget as HTMLElement).style.borderColor = `${stat.accentColor}40`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.08)';
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              marginBottom: '0.5rem',
            }}
          >
            {stat.value}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
