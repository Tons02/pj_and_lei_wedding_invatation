import BannerImage from "../assets/HeroImage.jpg";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap');

  .hero {
    position: relative;
    width: 100%;
    height: 96svh;
    min-height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: #1a1612;
  }

  .hero__bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    transform: scale(1.06);
    animation: heroZoom 18s ease-out forwards;
  }

  @keyframes heroZoom {
    from { transform: scale(1.06); }
    to   { transform: scale(1.00); }
  }

  .hero__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(12, 10, 8, 0.28) 0%,
      rgba(12, 10, 8, 0.52) 55%,
      rgba(12, 10, 8, 0.72) 100%
    );
  }

  .hero__content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2rem 1.5rem;
    gap: 0;
  }

  .hero__eyebrow {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: clamp(0.6rem, 1.5vw, 0.72rem);
    letter-spacing: 0.35em;
    color: rgba(245, 235, 210, 0.75);
    text-transform: uppercase;
    margin: 0 0 1.6rem;
    opacity: 0;
    transform: translateY(14px);
    animation: fadeUp 1s ease forwards 0.4s;
  }

  .hero__divider {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.4rem;
    opacity: 0;
    animation: fadeIn 1.2s ease forwards 0.7s;
  }

  .hero__divider-line {
    width: clamp(40px, 8vw, 80px);
    height: 0.5px;
    background: rgba(210, 185, 140, 0.6);
  }

  .hero__divider-diamond {
    width: 5px;
    height: 5px;
    background: rgba(210, 185, 140, 0.8);
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  .hero__names {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-style: italic;
    font-size: clamp(3.8rem, 13vw, 9rem);
    line-height: 0.92;
    letter-spacing: -0.01em;
    color: #f7efe0;
    margin: 0 0 1.8rem;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeUp 1.1s ease forwards 0.9s;
  }

  .hero__names span {
    display: block;
    font-style: normal;
    font-weight: 300;
    font-size: 0.38em;
    letter-spacing: 0.28em;
    color: rgba(210, 185, 140, 0.9);
    text-transform: uppercase;
    font-family: 'Montserrat', sans-serif;
    margin: 0.6em 0 0.3em;
  }

  .hero__date {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: clamp(0.65rem, 1.6vw, 0.78rem);
    letter-spacing: 0.3em;
    color: rgba(245, 235, 210, 0.65);
    text-transform: uppercase;
    margin: 0 0 2.8rem;
    opacity: 0;
    animation: fadeIn 1s ease forwards 1.4s;
  }

  .hero__cta {
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: clamp(0.6rem, 1.4vw, 0.7rem);
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #1a1612;
    background: rgba(210, 185, 140, 0.92);
    border: none;
    padding: clamp(0.75rem, 2vw, 0.95rem) clamp(1.8rem, 5vw, 2.8rem);
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease, letter-spacing 0.3s ease;
    opacity: 0;
    animation: fadeIn 1s ease forwards 1.7s;
  }

  .hero__cta:hover {
    background: rgba(235, 215, 170, 1);
    transform: translateY(-1px);
    letter-spacing: 0.38em;
  }

  .hero__cta:active {
    transform: translateY(0);
  }

  .hero__scroll {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    opacity: 0;
    animation: fadeIn 1s ease forwards 2.2s;
  }

  .hero__scroll-label {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.55rem;
    letter-spacing: 0.3em;
    color: rgba(245, 235, 210, 0.4);
    text-transform: uppercase;
  }

  .hero__scroll-line {
    width: 0.5px;
    height: 36px;
    background: rgba(210, 185, 140, 0.35);
    position: relative;
    overflow: hidden;
  }

  .hero__scroll-line::after {
    content: '';
    position: absolute;
    top: -100%;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(210, 185, 140, 0.8);
    animation: scrollDrop 2s ease-in-out infinite 2.5s;
  }

  @keyframes scrollDrop {
    0%   { top: -100%; }
    100% { top: 100%; }
  }

  @keyframes fadeUp {
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeIn {
    to { opacity: 1; }
  }

  @media (max-width: 480px) {
    .hero__names {
      font-size: clamp(3.2rem, 18vw, 5rem);
    }
    .hero__divider-line {
      width: 28px;
    }
  }

  @media (max-width: 768px) {
    .hero__scroll {
      bottom: 1.4rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero__bg,
    .hero__eyebrow,
    .hero__divider,
    .hero__names,
    .hero__date,
    .hero__cta,
    .hero__scroll,
    .hero__scroll-line::after {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }

    @media (max-width: 1440px) {
    .hero__bg {
        background-position: 100% 20%;
    }
    }

    @media (max-width: 1024px) {
    .hero__bg {
        background-position: 90% 20%;
    }
    }

    @media (max-width: 425px) {
    .hero__bg {
        background-position: 70% 20%;
    }
    }
}
`;

export default function Hero() {
  return (
    <>
      <style>{styles}</style>

      <section className="hero" id="home">
        <div
          className="hero__bg"
          style={{ backgroundImage: `url(${BannerImage})` }}
        />
        <div className="hero__overlay" />

        <div className="hero__content">
          <p className="hero__eyebrow">We are getting married</p>

          <div className="hero__divider">
            <span className="hero__divider-line" />
            <span className="hero__divider-diamond" />
            <span className="hero__divider-line" />
          </div>

          <h1 className="hero__names">
            PJ
            <span>&amp;</span>
            LEI
          </h1>

          <p className="hero__date">July 05, 2026 &nbsp;·&nbsp; Pampanga</p>

          {/* <button className="hero__cta">RSVP Now</button> */}
        </div>

        <div className="hero__scroll">
          <span className="hero__scroll-label">Scroll</span>
          <span className="hero__scroll-line" />
        </div>
      </section>
    </>
  );
}
