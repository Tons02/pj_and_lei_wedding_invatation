import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe-nzuZfOUYwmgv91vw9FDtv9-dyEviQdzqEdUBt_IR_stEng/viewform?usp=publish-editor";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap');

  /* ─── Section ─────────────────────────────────────────── */
  .rsvp {
    position: relative;
    padding: clamp(4rem, 10vw, 9rem) clamp(1.2rem, 5vw, 2rem);
    background-color: #2c2418;
    overflow: hidden;
  }

  /* ─── Background decorations ──────────────────────────── */
  .rsvp__bg-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(5rem, 20vw, 20rem);
    font-weight: 300;
    font-style: italic;
    color: rgba(210, 185, 140, 0.04);
    white-space: nowrap;
    pointer-events: none;
    user-select: none;
    letter-spacing: -0.02em;
  }

  .rsvp__ring {
    position: absolute;
    border-radius: 50%;
    border: 0.5px solid rgba(210, 185, 140, 0.07);
    pointer-events: none;
    top: 50%;
    left: 50%;
  }

  .rsvp__ring--1 {
    width: clamp(280px, 70vw, 600px);
    height: clamp(280px, 70vw, 600px);
    transform: translate(-50%, -50%);
    animation: ringRotate 40s linear infinite;
  }

  .rsvp__ring--2 {
    width: clamp(180px, 48vw, 440px);
    height: clamp(180px, 48vw, 440px);
    transform: translate(-50%, -50%);
    animation: ringRotate 28s linear infinite reverse;
    border-color: rgba(210, 185, 140, 0.05);
  }

  @keyframes ringRotate {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to   { transform: translate(-50%, -50%) rotate(360deg); }
  }

  /* ─── Inner wrapper ───────────────────────────────────── */
  .rsvp__inner {
    position: relative;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: clamp(3rem, 8vw, 5.5rem);
  }

  @media (min-width: 860px) {
    .rsvp__inner {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: clamp(3rem, 6vw, 5rem);
    }
  }

  /* ─── Text block ──────────────────────────────────────── */
  .rsvp__text {
    width: 100%;
    text-align: center;
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 1s ease 0.1s, transform 1s ease 0.1s;
  }

  @media (min-width: 860px) {
    .rsvp__text {
      text-align: left;
      transform: translateX(-28px);
    }
  }

  .rsvp__eyebrow {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: clamp(0.58rem, 2.5vw, 0.7rem);
    letter-spacing: 0.35em;
    color: rgba(210, 185, 140, 0.6);
    text-transform: uppercase;
    margin: 0 0 1rem;
  }

  .rsvp__title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-style: italic;
    font-size: clamp(3rem, 10vw, 6rem);
    line-height: 0.95;
    color: #f7efe0;
    margin: 0 0 1.4rem;
  }

  .rsvp__rule {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 1.8rem;
    justify-content: center;
  }

  @media (min-width: 860px) {
    .rsvp__rule { justify-content: flex-start; }
  }

  .rsvp__rule span {
    display: block;
    width: clamp(30px, 7vw, 70px);
    height: 0.5px;
    background: rgba(210, 185, 140, 0.35);
  }

  .rsvp__rule i {
    display: block;
    width: 5px;
    height: 5px;
    background: rgba(210, 185, 140, 0.55);
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  .rsvp__desc {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: clamp(0.78rem, 2.2vw, 0.88rem);
    line-height: 2;
    color: rgba(245, 235, 210, 0.5);
    margin: 0 auto 2rem;
    max-width: 380px;
  }

  @media (min-width: 860px) {
    .rsvp__desc { margin: 0 0 2rem; }
  }

  /* ─── Deadline card ───────────────────────────────────── */
  .rsvp__deadline {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1rem 1.3rem;
    border: 0.5px solid rgba(210, 185, 140, 0.15);
    background: rgba(255, 248, 235, 0.04);
    max-width: 320px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  @media (min-width: 860px) {
    .rsvp__deadline {
      margin-left: 0;
      margin-right: 0;
    }
  }

  .rsvp__deadline-icon {
    width: 34px;
    height: 34px;
    border: 0.5px solid rgba(210, 185, 140, 0.3);
    rotate: 45deg;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .rsvp__deadline-icon svg {
    rotate: -45deg;
    width: 14px;
    height: 14px;
    stroke: rgba(210, 185, 140, 0.75);
    fill: none;
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .rsvp__deadline-label {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: 0.55rem;
    letter-spacing: 0.28em;
    color: rgba(210, 185, 140, 0.5);
    text-transform: uppercase;
    margin: 0 0 0.25rem;
  }

  .rsvp__deadline-date {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.1rem, 3vw, 1.35rem);
    font-weight: 300;
    color: #f7efe0;
    margin: 0;
    line-height: 1;
  }

  /* ─── CTA button ──────────────────────────────────────── */
  .rsvp__btn-wrap {
    display: flex;
    justify-content: center;
  }

  @media (min-width: 860px) {
    .rsvp__btn-wrap { justify-content: flex-start; }
  }

  .rsvp__btn {
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: clamp(0.6rem, 2vw, 0.68rem);
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #1a1612;
    background: rgba(210, 185, 140, 0.92);
    border: none;
    padding: clamp(0.85rem, 2.5vw, 1rem) clamp(2rem, 6vw, 3rem);
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    transition: background 0.3s ease, transform 0.2s ease, letter-spacing 0.3s ease;
    -webkit-tap-highlight-color: transparent;
  }

  .rsvp__btn:hover {
    background: rgba(235, 215, 170, 1);
    transform: translateY(-2px);
    letter-spacing: 0.38em;
  }

  .rsvp__btn:active { transform: translateY(0); }

  /* ─── QR card block ───────────────────────────────────── */
  .rsvp__qr-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 1s ease 0.3s, transform 1s ease 0.3s;
  }

  @media (min-width: 860px) {
    .rsvp__qr-wrap {
      transform: translateX(28px);
    }
  }

  .rsvp__qr-card {
    position: relative;
    background: #faf8f4;
    padding: clamp(1.6rem, 5vw, 2.8rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
    width: 100%;
    max-width: clamp(260px, 80vw, 320px);
  }

  /* Offset shadow */
  .rsvp__qr-card::before {
    content: '';
    position: absolute;
    inset: -8px;
    background: rgba(210, 185, 140, 0.1);
    z-index: -1;
    transform: translate(8px, 8px);
  }

  /* Border */
  .rsvp__qr-card::after {
    content: '';
    position: absolute;
    inset: 0;
    border: 0.5px solid rgba(210, 185, 140, 0.22);
    pointer-events: none;
  }

  /* Corner brackets */
  .rsvp__qr-corner {
    position: absolute;
    width: 14px;
    height: 14px;
    border-color: rgba(107, 21, 37, 0.5);
    border-style: solid;
  }

  .rsvp__qr-corner--tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
  .rsvp__qr-corner--tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
  .rsvp__qr-corner--bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
  .rsvp__qr-corner--br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }

  .rsvp__qr-eyebrow {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: clamp(0.52rem, 1.5vw, 0.58rem);
    letter-spacing: 0.3em;
    color: rgba(107, 21, 37, 0.6);
    text-transform: uppercase;
  }

  /* Canvas: fluid size on mobile, fixed on desktop */
  .rsvp__qr-canvas {
    display: block;
    width: clamp(150px, 50vw, 200px) !important;
    height: clamp(150px, 50vw, 200px) !important;
    animation: qrPulse 4s ease-in-out infinite 2s;
  }

  @keyframes qrPulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.82; }
  }

  .rsvp__qr-names {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-style: italic;
    font-size: clamp(1.2rem, 4vw, 1.55rem);
    color: #2c2418;
    text-align: center;
    line-height: 1.2;
    margin: 0;
  }

  .rsvp__qr-sub {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: clamp(0.5rem, 1.5vw, 0.58rem);
    letter-spacing: 0.18em;
    color: rgba(60, 48, 30, 0.45);
    text-align: center;
    text-transform: uppercase;
  }

  .rsvp__qr-divider {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .rsvp__qr-divider span {
    flex: 1;
    height: 0.5px;
    background: rgba(107, 21, 37, 0.13);
  }

  .rsvp__qr-divider i {
    width: 4px;
    height: 4px;
    background: rgba(107, 21, 37, 0.22);
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  /* ─── Scan hint ───────────────────────────────────────── */
  .rsvp__scan-hint {
    margin-top: 1.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.8s ease 0.8s, transform 0.8s ease 0.8s;
  }

  .rsvp__scan-label {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: clamp(0.5rem, 1.5vw, 0.55rem);
    letter-spacing: 0.28em;
    color: rgba(210, 185, 140, 0.35);
    text-transform: uppercase;
  }

  .rsvp__scan-line {
    width: 0.5px;
    height: 28px;
    background: rgba(210, 185, 140, 0.2);
    position: relative;
    overflow: hidden;
  }

  .rsvp__scan-line::after {
    content: '';
    position: absolute;
    top: -100%;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(210, 185, 140, 0.65);
    animation: scanDrop 2.2s ease-in-out infinite 1.5s;
  }

  @keyframes scanDrop {
    0%   { top: -100%; }
    100% { top: 100%; }
  }

  /* ─── Visible states ──────────────────────────────────── */
  .is-visible {
    opacity: 1 !important;
    transform: none !important;
  }

  /* ─── Reduced motion ──────────────────────────────────── */
  @media (prefers-reduced-motion: reduce) {
    .rsvp__text, .rsvp__qr-wrap, .rsvp__scan-hint,
    .rsvp__ring--1, .rsvp__ring--2,
    .rsvp__qr-canvas, .rsvp__scan-line::after {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
    }
  }
`;

export default function RSVP() {
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const qrRef = useRef(null);
  const hintRef = useRef(null);
  const [, setQrReady] = useState(false);

  // Generate QR onto canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(
      canvasRef.current,
      FORM_URL,
      {
        width: 200,
        margin: 1,
        color: { dark: "#2c2418", light: "#faf8f4" },
        errorCorrectionLevel: "H",
      },
      (err) => {
        if (!err) setQrReady(true);
      },
    );
  }, []);

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.1 },
    );
    [textRef.current, qrRef.current, hintRef.current]
      .filter(Boolean)
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{styles}</style>

      <section id="rsvp" className="rsvp">
        <div className="rsvp__bg-text" aria-hidden="true">
          RSVP
        </div>
        <div className="rsvp__ring rsvp__ring--1" aria-hidden="true" />
        <div className="rsvp__ring rsvp__ring--2" aria-hidden="true" />

        <div className="rsvp__inner">
          {/* ── Text ── */}
          <div className="rsvp__text" ref={textRef}>
            <p className="rsvp__eyebrow">Will you join us?</p>
            <h2 className="rsvp__title">
              Kindly
              <br />
              Reply
            </h2>
            <div className="rsvp__rule">
              <span />
              <i />
              <span />
            </div>

            <p className="rsvp__desc">
              Your presence would mean the world to us. Please let us know if
              you'll be celebrating with Lei &amp; PJ on their special day by
              scanning the QR code or clicking below.
            </p>

            <div className="rsvp__deadline">
              <div className="rsvp__deadline-icon">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div>
                <p className="rsvp__deadline-label">RSVP Deadline</p>
                <p className="rsvp__deadline-date">July 01, 2026</p>
              </div>
            </div>

            <div className="rsvp__btn-wrap">
              <a
                href={FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rsvp__btn"
              >
                RSVP Now
              </a>
            </div>
          </div>

          {/* ── QR card ── */}
          <div className="rsvp__qr-wrap" ref={qrRef}>
            <div className="rsvp__qr-card">
              <span
                className="rsvp__qr-corner rsvp__qr-corner--tl"
                aria-hidden="true"
              />
              <span
                className="rsvp__qr-corner rsvp__qr-corner--tr"
                aria-hidden="true"
              />
              <span
                className="rsvp__qr-corner rsvp__qr-corner--bl"
                aria-hidden="true"
              />
              <span
                className="rsvp__qr-corner rsvp__qr-corner--br"
                aria-hidden="true"
              />

              <p className="rsvp__qr-eyebrow">Scan to RSVP</p>
              <div className="rsvp__qr-divider">
                <span />
                <i />
                <span />
              </div>

              <canvas
                ref={canvasRef}
                className="rsvp__qr-canvas"
                aria-label="QR code linking to RSVP form for Lei and PJ's wedding"
              />

              <div className="rsvp__qr-divider">
                <span />
                <i />
                <span />
              </div>
              <p className="rsvp__qr-names">Lei &amp; PJ</p>
              <p className="rsvp__qr-sub">July 5, 2026 · Shepherd's Palace</p>
            </div>

            <div className="rsvp__scan-hint" ref={hintRef}>
              <span className="rsvp__scan-label">Scan with your camera</span>
              <span className="rsvp__scan-line" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
