import { useEffect, useRef, useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap');

  .event {
    position: relative;
    padding: clamp(5rem, 12vw, 9rem) 1.5rem;
    background-color: #2c2418;
    overflow: hidden;
  }

  /* ── Decorative bg ── */
  .event__bg-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(7rem, 20vw, 18rem);
    font-weight: 300;
    font-style: italic;
    color: rgba(210, 185, 140, 0.04);
    white-space: nowrap;
    pointer-events: none;
    user-select: none;
    letter-spacing: -0.02em;
    line-height: 1;
  }

  .event__inner {
    position: relative;
    max-width: 1100px;
    margin: 0 auto;
  }

  /* ── Header ── */
  .event__header {
    text-align: center;
    margin-bottom: clamp(3.5rem, 8vw, 6rem);
  }

  .event__eyebrow {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: clamp(0.6rem, 1.4vw, 0.7rem);
    letter-spacing: 0.35em;
    color: rgba(210, 185, 140, 0.6);
    text-transform: uppercase;
    margin: 0 0 1.2rem;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }

  .event__title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-style: italic;
    font-size: clamp(3rem, 8vw, 5.5rem);
    line-height: 1;
    color: #f7efe0;
    margin: 0 0 1.4rem;
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s;
  }

  .event__rule {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    opacity: 0;
    transition: opacity 0.8s ease 0.3s;
  }

  .event__rule span {
    display: block;
    width: clamp(40px, 7vw, 70px);
    height: 0.5px;
    background: rgba(210, 185, 140, 0.4);
  }

  .event__rule i {
    display: block;
    width: 5px;
    height: 5px;
    background: rgba(210, 185, 140, 0.6);
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  /* ── Countdown ── */
  .event__countdown {
    display: flex;
    justify-content: center;
    gap: clamp(0.5rem, 4vw, 3.5rem);
    margin-bottom: clamp(4rem, 10vw, 7rem);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.9s ease 0.45s, transform 0.9s ease 0.45s;
  }
@media (max-width: 320px) {
  .event__countdown {
    gap: 0;
  }
}
  .cd-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .cd-unit__number {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: clamp(2.8rem, 8vw, 5.5rem);
    line-height: 1;
    color: #f7efe0;
    min-width: clamp(60px, 12vw, 100px);
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .cd-unit__number .cd-flip {
    display: block;
    animation: cdFlip 0.4s ease forwards;
  }

  @keyframes cdFlip {
    from { opacity: 0; transform: translateY(-14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .cd-unit__label {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: clamp(0.5rem, 1.2vw, 0.6rem);
    letter-spacing: 0.3em;
    color: rgba(210, 185, 140, 0.55);
    text-transform: uppercase;
  }

  .cd-separator {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 5vw, 3.8rem);
    color: rgba(210, 185, 140, 0.3);
    line-height: 1;
    padding-top: 0.1em;
    animation: blink 2s ease-in-out infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.2; }
  }

  /* ── Details + Map grid ── */
  .event__body {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(3rem, 7vw, 5rem);
    align-items: start;
  }

  @media (min-width: 900px) {
    .event__body {
      grid-template-columns: 1fr 1fr;
    }
  }

  /* ── Detail cards ── */
  .event__details {
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
    opacity: 0;
    transform: translateX(-24px);
    transition: opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s;
  }

  .event__detail-card {
    display: flex;
    align-items: flex-start;
    gap: 1.4rem;
    padding: 1.6rem 1.8rem;
    border: 0.5px solid rgba(210, 185, 140, 0.15);
    background: rgba(255, 248, 235, 0.04);
    position: relative;
    transition: background 0.3s ease, border-color 0.3s ease;
  }

  .event__detail-card::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, rgba(210,185,140,0), rgba(210,185,140,0.6), rgba(210,185,140,0));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .event__detail-card:hover {
    background: rgba(255, 248, 235, 0.07);
    border-color: rgba(210, 185, 140, 0.28);
  }

  .event__detail-card:hover::before {
    opacity: 1;
  }

  .event__detail-icon {
    width: 38px;
    height: 38px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.5px solid rgba(210, 185, 140, 0.3);
    rotate: 45deg;
    margin-top: 2px;
  }

  .event__detail-icon svg {
    rotate: -45deg;
    width: 16px;
    height: 16px;
    stroke: rgba(210, 185, 140, 0.8);
    fill: none;
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .event__detail-label {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: 0.6rem;
    letter-spacing: 0.3em;
    color: rgba(210, 185, 140, 0.55);
    text-transform: uppercase;
    margin: 0 0 0.4rem;
  }

  .event__detail-value {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: clamp(1.4rem, 3vw, 1.8rem);
    color: #f7efe0;
    line-height: 1.2;
    margin: 0 0 0.2rem;
  }

  .event__detail-sub {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: 0.72rem;
    color: rgba(210, 185, 140, 0.45);
    letter-spacing: 0.05em;
    margin: 0;
  }

  /* ── Map ── */
  .event__map-wrap {
    position: relative;
    opacity: 0;
    transform: translateX(24px);
    transition: opacity 0.9s ease 0.35s, transform 0.9s ease 0.35s;
  }

  .event__map-frame {
    position: relative;
    width: 100%;
    padding-top: 68%;
    overflow: hidden;
  }

  .event__map-frame::before {
    content: '';
    position: absolute;
    inset: -8px;
    border: 0.5px solid rgba(210, 185, 140, 0.2);
    pointer-events: none;
    z-index: 1;
    transform: translate(8px, 8px);
  }

  .event__map-frame iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
    filter: grayscale(30%) sepia(20%) brightness(0.9);
    transition: filter 0.4s ease;
  }

  .event__map-frame:hover iframe {
    filter: grayscale(0%) sepia(0%) brightness(1);
  }

  .event__map-label {
    margin-top: 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.7rem;
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: 0.65rem;
    letter-spacing: 0.25em;
    color: rgba(210, 185, 140, 0.5);
    text-transform: uppercase;
  }

  .event__map-label::before {
    content: '';
    display: block;
    width: 20px;
    height: 0.5px;
    background: rgba(210, 185, 140, 0.4);
  }

  /* ── Visible ── */
  .is-visible {
    opacity: 1 !important;
    transform: none !important;
  }

  @media (prefers-reduced-motion: reduce) {
    .event__eyebrow,
    .event__title,
    .event__rule,
    .event__countdown,
    .event__details,
    .event__map-wrap,
    .cd-separator { animation: none !important; opacity: 1 !important; transform: none !important; transition: none !important; }
    .cd-unit__number .cd-flip { animation: none; }
  }
`;

function getTimeLeft() {
  const target = new Date("2026-07-05T14:30:00+08:00").getTime();
  const now = Date.now();
  const diff = Math.max(target - now, 0);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function pad(n) {
  return String(n).padStart(2, "0");
}

export default function EventDetails() {
  const [time, setTime] = useState(getTimeLeft());
  const [keys, setKeys] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const prevRef = useRef(getTimeLeft());
  const headerRef = useRef(null);
  const countdownRef = useRef(null);
  const detailsRef = useRef(null);
  const mapRef = useRef(null);

  // Countdown
  useEffect(() => {
    const id = setInterval(() => {
      const next = getTimeLeft();
      const prev = prevRef.current;
      setKeys((k) => ({
        d: next.days !== prev.days ? k.d + 1 : k.d,
        h: next.hours !== prev.hours ? k.h + 1 : k.h,
        m: next.minutes !== prev.minutes ? k.m + 1 : k.m,
        s: next.seconds !== prev.seconds ? k.s + 1 : k.s,
      }));
      prevRef.current = next;
      setTime(next);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const targets = [
      headerRef.current?.querySelector(".event__eyebrow"),
      headerRef.current?.querySelector(".event__title"),
      headerRef.current?.querySelector(".event__rule"),
      countdownRef.current,
      detailsRef.current,
      mapRef.current,
    ].filter(Boolean);

    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    targets.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const details = [
    {
      label: "Date",
      value: "July 5, 2026",
      sub: "Sunday",
      icon: (
        <svg viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      label: "Time",
      value: "2:30 PM Onwards",
      sub: "Doors open at 2:30 PM",
      icon: (
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      label: "Venue",
      value: "Shepherd's Palace",
      sub: "Shepherd's Palace Garden and Resort, Pampanga",
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{styles}</style>

      <section id="event" className="event">
        <div className="event__bg-text" aria-hidden="true">
          July
        </div>

        <div className="event__inner">
          {/* Header */}
          <header className="event__header" ref={headerRef}>
            <p className="event__eyebrow">Mark your calendar</p>
            <h2 className="event__title">Event Details</h2>
            <div className="event__rule">
              <span />
              <i />
              <span />
            </div>
          </header>

          {/* Countdown */}
          <div className="event__countdown" ref={countdownRef}>
            {[
              { val: time.days, k: keys.d, label: "Days" },
              null,
              { val: time.hours, k: keys.h, label: "Hours" },
              null,
              { val: time.minutes, k: keys.m, label: "Minutes" },
              null,
              { val: time.seconds, k: keys.s, label: "Seconds" },
            ].map((unit, i) =>
              unit === null ? (
                <span
                  className="cd-separator"
                  key={`sep-${i}`}
                  aria-hidden="true"
                >
                  ·
                </span>
              ) : (
                <div className="cd-unit" key={unit.label}>
                  <div
                    className="cd-unit__number"
                    aria-live="polite"
                    aria-label={`${unit.val} ${unit.label}`}
                  >
                    <span className="cd-flip" key={unit.k}>
                      {pad(unit.val)}
                    </span>
                  </div>
                  <span className="cd-unit__label">{unit.label}</span>
                </div>
              ),
            )}
          </div>

          {/* Body */}
          <div className="event__body">
            {/* Detail cards */}
            <div className="event__details" ref={detailsRef}>
              {details.map((d) => (
                <div className="event__detail-card" key={d.label}>
                  <div className="event__detail-icon">{d.icon}</div>
                  <div>
                    <p className="event__detail-label">{d.label}</p>
                    <p className="event__detail-value">{d.value}</p>
                    <p className="event__detail-sub">{d.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="event__map-wrap" ref={mapRef}>
              <div className="event__map-frame">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3853.523983776303!2d120.8647541!3d15.0191067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396fe43af5bd1db%3A0xbb7fd402e9c137aa!2sShepherd&#39;s%20Palace%20Garden%20and%20Resort!5e0!3m2!1sen!2sph!4v1777559193200!5m2!1sen!2sph"
                  title="Shepherd's Palace Garden and Resort"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="event__map-label">
                Shepherd's Palace Garden and Resort, Pampanga
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
