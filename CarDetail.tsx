import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import type { Exhibition } from '../lib/exhibitions';
import { formatLakhs } from '../lib/exhibitions';
import { fleetConfig } from '../config';

interface CarDetailProps {
  exhibition: Exhibition;
  onBack: () => void;
}

function BookingCalendar({ car, onClose, onProceed }: { car: Exhibition; onClose: () => void; onProceed: (dates: Set<string>, cost: number) => void }) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDates, setSelectedDates] = useState<Set<string>>(new Set());
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, []);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const changeMonth = (offset: number) => {
    let newMonth = currentMonth + offset;
    let newYear = currentYear;
    if (newMonth > 11) { newMonth = 0; newYear++; }
    else if (newMonth < 0) { newMonth = 11; newYear--; }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const toggleDate = (day: number) => {
    const dateKey = `${currentYear}-${currentMonth}-${day}`;
    const newDates = new Set(selectedDates);
    if (newDates.has(dateKey)) {
      newDates.delete(dateKey);
    } else {
      newDates.add(dateKey);
    }
    setSelectedDates(newDates);
  };

  const handleProceed = () => {
    if (selectedDates.size === 0) return;
    onProceed(selectedDates, car.tokenPrice);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dayElements = [];
  for (let i = 0; i < firstDay; i++) {
    dayElements.push(<div key={`empty-${i}`} />);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const checkDate = new Date(currentYear, currentMonth, d);
    const dateKey = `${currentYear}-${currentMonth}-${d}`;
    const isPast = checkDate < today;
    const isUnavailable = !isPast && (d % 7 === 0 || d % 8 === 0);
    const isSelected = selectedDates.has(dateKey);

    let className = 'calendar-day';
    if (isPast || isUnavailable) className += ' unavailable';
    else if (isSelected) className += ' selected';

    dayElements.push(
      <div
        key={d}
        className={className}
        onClick={() => !isPast && !isUnavailable && toggleDate(d)}
      >
        {d}
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(5, 5, 5, 0.9)',
      }}
    >
      <div
        ref={modalRef}
        style={{
          background: '#0f172a',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '1.5rem',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div style={{ padding: '2rem 2rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            color: 'var(--text-primary)',
            margin: 0,
            textTransform: 'uppercase',
          }}>
            Block Dates
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: '1.5rem',
              cursor: 'none',
              padding: '0.5rem',
            }}
          >
            &#x2715;
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          padding: '2rem',
        }}>
          {/* Car Info */}
          <div>
            <div style={{
              width: '100%',
              aspectRatio: '4 / 3',
              overflow: 'hidden',
              borderRadius: '1rem',
              marginBottom: '1.5rem',
              background: '#000',
            }}>
              <img
                src={car.image}
                alt={car.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Full Value</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{formatLakhs(car.price)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ color: 'var(--accent-rose)', fontWeight: 700, fontSize: '0.85rem' }}>Token Price (10%)</span>
                <span style={{ color: 'var(--accent-rose)', fontWeight: 700, fontSize: '1.1rem' }}>{formatLakhs(car.tokenPrice)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(30, 41, 59, 0.8)', padding: '0.75rem 1rem', borderRadius: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Available Tokens</span>
                <span style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#34d399',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                }}>
                  {car.tokensLeft}/{car.totalTokens} Available
                </span>
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <button
                onClick={() => changeMonth(-1)}
                style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'none', padding: '0.5rem', fontSize: '1.2rem' }}
              >
                &#8249;
              </button>
              <h4 style={{ color: 'var(--text-primary)', fontWeight: 600, fontFamily: 'var(--font-sans)' }}>
                {months[currentMonth]} {currentYear}
              </h4>
              <button
                onClick={() => changeMonth(1)}
                style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'none', padding: '0.5rem', fontSize: '1.2rem' }}
              >
                &#8250;
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.25rem', textAlign: 'center', marginBottom: '0.5rem' }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <div key={d} style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{d}</div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.4rem' }}>
              {dayElements}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '12px', height: '12px', background: 'linear-gradient(135deg, #db2777, #be123c)', borderRadius: '3px' }} />
                Selected
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '12px', height: '12px', background: '#334155', borderRadius: '3px' }} />
                Unavailable
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(30, 41, 59, 0.6)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Selected Days</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.1rem' }}>{selectedDates.size}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '1rem',
          padding: '1.5rem 2rem 2rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'transparent',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)',
              fontWeight: 500,
              cursor: 'none',
              fontSize: '0.85rem',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleProceed}
            disabled={selectedDates.size === 0}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              background: selectedDates.size > 0 ? 'linear-gradient(135deg, #f43f5e, #be123c)' : '#334155',
              color: '#fff',
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              cursor: 'none',
              fontSize: '0.85rem',
              opacity: selectedDates.size > 0 ? 1 : 0.5,
              transition: 'all 0.2s',
            }}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}

function PaymentModal({ car, dates, onClose, onSuccess }: { car: Exhibition; dates: Set<string>; onClose: () => void; onSuccess: () => void }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, []);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(5, 5, 5, 0.92)',
      }}
    >
      <div
        ref={modalRef}
        style={{
          background: '#0f172a',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '1.5rem',
          maxWidth: '480px',
          width: '100%',
          padding: '2rem',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            color: 'var(--text-primary)',
            margin: 0,
          }}>
            Secure Payment
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: '1.2rem',
              cursor: 'none',
            }}
          >
            &#x2715;
          </button>
        </div>

        {/* Summary */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.8)',
          padding: '1.25rem',
          borderRadius: '0.75rem',
          marginBottom: '1.5rem',
          border: '1px solid rgba(255,255,255,0.05)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Vehicle</span>
            <span style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 500 }}>{car.title}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Booking Dates</span>
            <span style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 500 }}>{dates.size} Days</span>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '0.75rem 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Total Payable</span>
            <span style={{ color: 'var(--accent-rose)', fontWeight: 700, fontSize: '1.1rem' }}>{formatLakhs(car.tokenPrice)}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Payment Method
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <button style={{
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid var(--accent-rose)',
              background: 'rgba(244, 63, 94, 0.1)',
              color: 'var(--accent-rose)',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'none',
              fontFamily: 'var(--font-sans)',
            }}>
              Card
            </button>
            <button style={{
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'transparent',
              color: 'var(--text-secondary)',
              fontWeight: 500,
              fontSize: '0.85rem',
              cursor: 'none',
              fontFamily: 'var(--font-sans)',
            }}>
              UPI
            </button>
          </div>
        </div>

        {/* Card Form */}
        <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Card Number
            </label>
            <input
              type="text"
              placeholder="0000 0000 0000 0000"
              required
              style={{
                width: '100%',
                padding: '0.65rem 0.75rem',
                background: '#1e293b',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '0.5rem',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                outline: 'none',
              }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Expiry
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                required
                style={{
                  width: '100%',
                  padding: '0.65rem 0.75rem',
                  background: '#1e293b',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '0.5rem',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                CVV
              </label>
              <input
                type="password"
                placeholder="123"
                required
                style={{
                  width: '100%',
                  padding: '0.65rem 0.75rem',
                  background: '#1e293b',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '0.5rem',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            style={{
              width: '100%',
              padding: '0.875rem',
              marginTop: '0.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              background: 'linear-gradient(135deg, #f43f5e, #be123c)',
              color: '#fff',
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              opacity: isProcessing ? 0.7 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            {isProcessing ? (
              <>
                <div className="loader" style={{ width: '16px', height: '16px', borderWidth: '2px' }} />
                Processing...
              </>
            ) : (
              'Pay Now'
            )}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
          256-bit SSL Encrypted Payment
        </p>
      </div>
    </div>
  );
}

function SuccessModal({ car, onClose }: { car: Exhibition; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
      );
    }
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(5, 5, 5, 0.95)',
      }}
    >
      <div
        ref={modalRef}
        style={{
          background: '#0f172a',
          border: '1px solid var(--accent-rose)',
          borderRadius: '1.5rem',
          maxWidth: '420px',
          width: '100%',
          padding: '3rem 2rem',
          textAlign: 'center',
        }}
      >
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          fontSize: '2rem',
        }}>
          &#10003;
        </div>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.75rem',
          color: 'var(--text-primary)',
          margin: '0 0 0.75rem',
        }}>
          Payment Received
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          Welcome to the LuxShare owner's club. You now own 10% of the {car.title}.
        </p>
        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '0.875rem',
            borderRadius: '0.75rem',
            border: 'none',
            background: 'linear-gradient(135deg, #f43f5e, #be123c)',
            color: '#fff',
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'none',
          }}
        >
          Back to Fleet
        </button>
      </div>
    </div>
  );
}

export default function CarDetail({ exhibition, onBack }: CarDetailProps) {
  const [showBooking, setShowBooking] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingDates, setBookingDates] = useState<Set<string>>(new Set());

  const handleProceed = useCallback((dates: Set<string>, _cost: number) => {
    setBookingDates(dates);
    setShowBooking(false);
    setShowPayment(true);
  }, []);

  const handlePaymentSuccess = useCallback(() => {
    setShowPayment(false);
    setShowSuccess(true);
  }, []);

  const handleSuccessClose = useCallback(() => {
    setShowSuccess(false);
    onBack();
  }, [onBack]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showSuccess) setShowSuccess(false);
        else if (showPayment) setShowPayment(false);
        else if (showBooking) setShowBooking(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showBooking, showPayment, showSuccess]);

  return (
    <>
      <section
        style={{
          background: 'var(--bg-primary)',
          minHeight: '100vh',
          padding: '2rem 4vw 5rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '3rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.72rem',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
          }}
        >
          <button
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              font: 'inherit',
              color: 'inherit',
              cursor: 'none',
            }}
          >
            &#8592; {fleetConfig.detailBackText}
          </button>
          <span>{exhibition.specs}</span>
        </div>

        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 36vw) minmax(0, 1fr)',
            gap: '4rem',
            alignItems: 'start',
          }}
        >
          {/* Image Column */}
          <div
            style={{
              position: 'sticky',
              top: '2rem',
              maxWidth: '560px',
            }}
          >
            <div
              style={{
                width: '100%',
                aspectRatio: '4 / 5',
                overflow: 'hidden',
                background: '#000',
                borderRadius: '0.5rem',
              }}
            >
              <img
                src={exhibition.image}
                alt={exhibition.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            {/* Token Info Card */}
            <div style={{
              marginTop: '1.5rem',
              padding: '1.5rem',
              background: 'rgba(30, 41, 59, 0.6)',
              borderRadius: '0.75rem',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Full Price</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textDecoration: 'line-through' }}>{formatLakhs(exhibition.price)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.85rem' }}>Your Token (10%)</span>
                <span style={{
                  background: 'linear-gradient(to right, #fb7185, #db2777)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                }}>
                  {formatLakhs(exhibition.tokenPrice)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Available</span>
                <span style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#34d399',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                }}>
                  {exhibition.tokensLeft}/{exhibition.totalTokens}
                </span>
              </div>
              <button
                onClick={() => setShowBooking(true)}
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  background: 'linear-gradient(135deg, #f43f5e, #be123c)',
                  color: '#fff',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'none',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = '0.9'; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = '1'; }}
              >
                Book Ownership &#8594;
              </button>
            </div>
          </div>

          {/* Content Column */}
          <div
            style={{
              maxWidth: '62ch',
              paddingTop: '1rem',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.72rem',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--accent-rose)',
                marginBottom: '1.25rem',
              }}
            >
              {exhibition.eyebrow}
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.6rem, 5vw, 5rem)',
                lineHeight: 1.02,
                fontWeight: 400,
                textTransform: 'uppercase',
                margin: 0,
                color: 'var(--text-primary)',
              }}
            >
              {exhibition.title}
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                lineHeight: 1.8,
                color: 'var(--text-secondary)',
                marginTop: '2rem',
                marginBottom: '3rem',
              }}
            >
              {exhibition.intro}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
              {exhibition.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: '0.4rem 0.9rem',
                    background: 'rgba(30, 41, 59, 0.6)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '9999px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2.75rem',
              }}
            >
              {exhibition.sections.map((section) => (
                <article key={section.heading}>
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.5rem, 2vw, 2.1rem)',
                      lineHeight: 1.15,
                      fontWeight: 400,
                      margin: 0,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {section.heading}
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.96rem',
                      lineHeight: 1.9,
                      color: 'var(--text-secondary)',
                      marginTop: '1rem',
                      marginBottom: 0,
                    }}
                  >
                    {section.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {showBooking && (
        <BookingCalendar
          car={exhibition}
          onClose={() => setShowBooking(false)}
          onProceed={handleProceed}
        />
      )}

      {showPayment && (
        <PaymentModal
          car={exhibition}
          dates={bookingDates}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {showSuccess && (
        <SuccessModal car={exhibition} onClose={handleSuccessClose} />
      )}
    </>
  );
}
