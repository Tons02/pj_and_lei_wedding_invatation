import { useEffect, useRef, useState } from "react";

// Google Form identifiers
const FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSfQBlruW3zH5DaTUhlZDIL9kp1awzLIXsGhyTj3T3sk9zFGcw/formResponse";
const ENTRY_NAME = "entry.188293430"; // Name field
const ENTRY_ATTEND = "entry.1512758678"; // Attendance field
const YES_VALUE = "Yes, I'll be there.";
const NO_VALUE = "Sorry, can't make it.";

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
    padding: 0.9rem 1.2rem;
    border: 0.5px solid rgba(210, 185, 140, 0.2);
    background: rgba(255, 248, 235, 0.06);
    max-width: 320px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 2px;
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

  /* ─── Form wrap ───────────────────────────────────────── */
  .rsvp__form-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 1s ease 0.3s, transform 1s ease 0.3s;
  }

  @media (min-width: 860px) {
    .rsvp__form-wrap {
      transform: translateX(28px);
    }
  }

  /* ─── Form card ───────────────────────────────────────── */
  .rsvp__form-card {
    position: relative;
    background: #ffffff;
    border: 1px solid #e8e0d4;
    border-radius: 3px;
    padding: clamp(1.8rem, 5vw, 2.4rem) clamp(1.6rem, 4vw, 2.2rem);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    width: 100%;
    max-width: clamp(280px, 80vw, 360px);
    box-shadow: 8px 8px 0 rgba(107, 21, 37, 0.08);
  }

  /* Corner brackets */
  .rsvp__form-corner {
    position: absolute;
    width: 14px;
    height: 14px;
    border-color: rgba(107, 21, 37, 0.45);
    border-style: solid;
  }

  .rsvp__form-corner--tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
  .rsvp__form-corner--tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
  .rsvp__form-corner--bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
  .rsvp__form-corner--br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }

  .rsvp__form-eyebrow {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 0.6rem;
    letter-spacing: 0.3em;
    color: rgba(107, 21, 37, 0.55);
    text-transform: uppercase;
    text-align: center;
    margin: 0 0 0.75rem;
  }

  .rsvp__form-names {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-style: italic;
    font-size: clamp(1.5rem, 4vw, 1.8rem);
    color: #2c2418;
    text-align: center;
    line-height: 1.2;
    margin: 0 0 0.3rem;
  }

  .rsvp__form-sub {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: 0.62rem;
    letter-spacing: 0.15em;
    color: #a09080;
    text-align: center;
    text-transform: uppercase;
    margin: 0 0 1.1rem;
  }

  .rsvp__form-divider {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.4rem;
  }

  .rsvp__form-divider span {
    flex: 1;
    height: 1px;
    background: #ede8e0;
  }

  .rsvp__form-divider i {
    width: 4px;
    height: 4px;
    background: #c9b99a;
    transform: rotate(45deg);
    flex-shrink: 0;
    display: block;
  }

  /* ─── Deadline strip inside card ─────────────────────── */
  .rsvp__card-deadline {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: #faf5ee;
    border: 1px solid #ede5d8;
    border-radius: 3px;
    padding: 0.65rem 0.9rem;
    margin-bottom: 1.4rem;
  }

  .rsvp__card-deadline-icon {
    width: 28px;
    height: 28px;
    border: 1px solid #c9b99a;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  .rsvp__card-deadline-icon svg {
    transform: rotate(-45deg);
    width: 13px;
    height: 13px;
    stroke: #9e7a58;
    fill: none;
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .rsvp__card-deadline-label {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: 0.55rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #b0906c;
    margin: 0 0 2px;
  }

  .rsvp__card-deadline-date {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    font-weight: 300;
    color: #2c2418;
    margin: 0;
    line-height: 1;
  }

  /* ─── Form fields ─────────────────────────────────────── */
  .rsvp__field {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    margin-bottom: 1.1rem;
  }

  .rsvp__label {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 0.6rem;
    letter-spacing: 0.22em;
    color: #8a7060;
    text-transform: uppercase;
  }

  .rsvp__input {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.05rem;
    font-weight: 300;
    color: #2c2418;
    background: #faf8f5;
    border: 1px solid #ddd6cc;
    border-radius: 3px;
    padding: 0.6rem 0.85rem;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.2s ease, background 0.2s ease;
  }

  .rsvp__input::placeholder {
    color: #bbb0a0;
    font-style: italic;
  }

  .rsvp__input:focus {
    border-color: rgba(107, 21, 37, 0.55);
    background: #ffffff;
  }

  /* ─── Honeypot ────────────────────────────────────────── */
  .rsvp__honeypot {
    position: absolute;
    left: -9999px;
    opacity: 0;
    pointer-events: none;
    tab-index: -1;
  }

  /* ─── Attendance toggle ───────────────────────────────── */
  .rsvp__attend-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.6rem;
  }

  .rsvp__attend-option {
    cursor: pointer;
  }

  .rsvp__attend-option input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .rsvp__attend-label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.7rem 0.4rem;
    border: 1px solid #ddd6cc;
    border-radius: 3px;
    background: #faf8f5;
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: 0.6rem;
    letter-spacing: 0.12em;
    color: #6b5848;
    text-transform: uppercase;
    transition: all 0.2s ease;
    cursor: pointer;
    text-align: center;
    line-height: 1.4;
  }

  .rsvp__attend-option input:checked + .rsvp__attend-label {
    background: #fdf0f2;
    border-color: rgba(107, 21, 37, 0.5);
    color: rgba(107, 21, 37, 0.9);
  }

  .rsvp__attend-label:hover {
    border-color: rgba(107, 21, 37, 0.35);
    background: #fdf5f6;
  }

  .rsvp__attend-dot {
    width: 5px;
    height: 5px;
    border: 1px solid currentColor;
    transform: rotate(45deg);
    flex-shrink: 0;
    transition: background 0.2s ease;
  }

  .rsvp__attend-option input:checked + .rsvp__attend-label .rsvp__attend-dot {
    background: currentColor;
  }

  /* ─── Submit button ───────────────────────────────────── */
  .rsvp__submit {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 0.62rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #ffffff;
    background: rgba(107, 21, 37, 0.88);
    border: none;
    border-radius: 3px;
    padding: 0.9rem 1.5rem;
    cursor: pointer;
    width: 100%;
    transition: background 0.25s ease, letter-spacing 0.25s ease;
    margin-top: 0.5rem;
  }

  .rsvp__submit:hover:not(:disabled) {
    background: rgba(107, 21, 37, 1);
    letter-spacing: 0.38em;
  }

  .rsvp__submit:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* ─── Status messages ─────────────────────────────────── */
  .rsvp__status {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: 0.62rem;
    letter-spacing: 0.12em;
    text-align: center;
    padding: 0.4rem 0;
    min-height: 1.2rem;
  }

  .rsvp__status--error   { color: rgba(107, 21, 37, 0.8); }
  .rsvp__status--loading { color: #a09080; }

  /* ─── Thank you state ─────────────────────────────────── */
  .rsvp__thankyou {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.85rem;
    padding: 0.75rem 0;
    animation: fadeInUp 0.6s ease forwards;
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .rsvp__thankyou-circle {
    width: 44px;
    height: 44px;
    border: 1px solid rgba(107, 21, 37, 0.4);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .rsvp__thankyou-circle svg {
    width: 18px;
    height: 18px;
    stroke: rgba(107, 21, 37, 0.75);
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .rsvp__thankyou-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-style: italic;
    font-size: 1.8rem;
    color: #2c2418;
    margin: 0;
    text-align: center;
  }

  .rsvp__thankyou-msg {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    color: #8a7060;
    text-align: center;
    line-height: 1.9;
    text-transform: uppercase;
    white-space: pre-line;
    margin: 0;
  }

  /* ─── Visible states ──────────────────────────────────── */
  .is-visible {
    opacity: 1 !important;
    transform: none !important;
  }

  /* ─── Reduced motion ──────────────────────────────────── */
  @media (prefers-reduced-motion: reduce) {
    .rsvp__text, .rsvp__form-wrap,
    .rsvp__ring--1, .rsvp__ring--2 {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
    }
  }
`;

function submitToGoogleForms(name, attend) {
  const formData = new FormData();
  formData.append(ENTRY_NAME, name);
  formData.append(ENTRY_ATTEND, attend);
  return fetch(FORM_ACTION, {
    method: "POST",
    mode: "no-cors",
    body: formData,
  });
}

export default function RSVP() {
  const textRef = useRef(null);
  const formWrapRef = useRef(null);

  const [name, setName] = useState("");
  const [attend, setAttend] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [honeypot, setHoneypot] = useState("");
  const lastSubmitRef = useRef(0);
  const submitCountRef = useRef(0);
  const MAX_SUBMISSIONS = 3;

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
    [textRef.current, formWrapRef.current]
      .filter(Boolean)
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  async function handleSubmit() {
    if (honeypot) return;

    if (submitCountRef.current >= MAX_SUBMISSIONS) {
      setErrorMsg("Too many submissions. Please refresh and try again.");
      return;
    }

    const now = Date.now();
    if (now - lastSubmitRef.current < 8000) {
      setErrorMsg("Please wait a moment before submitting again.");
      return;
    }

    if (!name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!attend) {
      setErrorMsg("Please select your attendance.");
      return;
    }

    setErrorMsg("");
    setStatus("loading");

    try {
      await submitToGoogleForms(
        name.trim(),
        attend === "yes" ? YES_VALUE : NO_VALUE,
      );
      lastSubmitRef.current = Date.now();
      submitCountRef.current += 1;
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

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
          {/* ── Left: Text ── */}
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
              you'll be celebrating with Lei &amp; PJ on their special day.
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
                <p className="rsvp__deadline-date">June 15, 2026</p>
              </div>
            </div>
          </div>

          {/* ── Right: Form card ── */}
          <div className="rsvp__form-wrap" ref={formWrapRef}>
            <div className="rsvp__form-card">
              <span
                className="rsvp__form-corner rsvp__form-corner--tl"
                aria-hidden="true"
              />
              <span
                className="rsvp__form-corner rsvp__form-corner--tr"
                aria-hidden="true"
              />
              <span
                className="rsvp__form-corner rsvp__form-corner--bl"
                aria-hidden="true"
              />
              <span
                className="rsvp__form-corner rsvp__form-corner--br"
                aria-hidden="true"
              />

              {/* Honeypot */}
              <input
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="rsvp__honeypot"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <p className="rsvp__form-eyebrow">RSVP</p>

              {status === "success" ? (
                <div className="rsvp__thankyou">
                  <div className="rsvp__thankyou-circle">
                    <svg viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="rsvp__thankyou-title">Thank You</p>
                  <p className="rsvp__thankyou-msg">
                    {attend === "yes"
                      ? "We can't wait to celebrate\nwith you on our special day."
                      : "We'll miss you, but thank you\nfor letting us know."}
                  </p>
                </div>
              ) : (
                <>
                  <p className="rsvp__form-names">Lei &amp; PJ</p>
                  <p className="rsvp__form-sub">
                    July 5, 2026 · Shepherd's Palace
                  </p>

                  <div className="rsvp__form-divider">
                    <span />
                    <i />
                    <span />
                  </div>

                  {/* Deadline inside card */}
                  <div className="rsvp__card-deadline">
                    <div className="rsvp__card-deadline-icon">
                      <svg viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <div>
                      <p className="rsvp__card-deadline-label">RSVP Deadline</p>
                      <p className="rsvp__card-deadline-date">June 15, 2026</p>
                    </div>
                  </div>

                  {/* Name field */}
                  <div className="rsvp__field">
                    <label className="rsvp__label" htmlFor="rsvp-name">
                      Your Name
                    </label>
                    <input
                      id="rsvp-name"
                      className="rsvp__input"
                      type="text"
                      placeholder="Full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                      disabled={status === "loading"}
                      autoComplete="name"
                    />
                  </div>

                  {/* Attendance toggle */}
                  <div className="rsvp__field">
                    <span className="rsvp__label">Will you attend?</span>
                    <div className="rsvp__attend-group">
                      <label className="rsvp__attend-option">
                        <input
                          type="radio"
                          name="rsvp-attend"
                          value="yes"
                          checked={attend === "yes"}
                          onChange={() => setAttend("yes")}
                          disabled={status === "loading"}
                        />
                        <span className="rsvp__attend-label">
                          <span className="rsvp__attend-dot" />
                          Joyfully Accepts
                        </span>
                      </label>
                      <label className="rsvp__attend-option">
                        <input
                          type="radio"
                          name="rsvp-attend"
                          value="no"
                          checked={attend === "no"}
                          onChange={() => setAttend("no")}
                          disabled={status === "loading"}
                        />
                        <span className="rsvp__attend-label">
                          <span className="rsvp__attend-dot" />
                          Regretfully Declines
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Error / loading status */}
                  <div
                    className={`rsvp__status ${
                      status === "error"
                        ? "rsvp__status--error"
                        : "rsvp__status--loading"
                    }`}
                    role="alert"
                    aria-live="polite"
                  >
                    {errorMsg || (status === "loading" ? "Sending…" : "")}
                  </div>

                  {/* Submit */}
                  <button
                    className="rsvp__submit"
                    onClick={handleSubmit}
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Sending…" : "Send RSVP"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
