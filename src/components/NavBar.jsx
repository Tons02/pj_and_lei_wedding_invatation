import { useState, useEffect } from "react";

const menuItems = ["Home", "Our Story", "Event", "Program", "Dress Code"];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

  .lp-nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    font-family: 'Jost', sans-serif;
    background: rgba(252, 249, 245, 0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(180, 150, 100, 0.16);
    transition: background 0.3s, box-shadow 0.3s;
  }

  .lp-nav.scrolled {
    background: rgba(252, 249, 245, 0.98);
    box-shadow: 0 1px 24px rgba(60, 40, 10, 0.07);
  }

  .lp-nav-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .lp-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 300;
    font-style: italic;
    letter-spacing: 0.08em;
    color: #2C2416;
    text-decoration: none;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .lp-logo-amp {
    color: #B89050;
    margin: 0 5px;
    font-style: normal;
    font-weight: 300;
  }

  .lp-links {
    display: flex;
    align-items: center;
    gap: 0;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .lp-links li a {
    display: block;
    padding: 8px 14px;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #6B5B45;
    text-decoration: none;
    position: relative;
    transition: color 0.25s ease;
  }

  .lp-links li a::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 14px;
    right: 14px;
    height: 1px;
    background: #B89050;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .lp-links li a:hover {
    color: #2C2416;
  }

  .lp-links li a:hover::after {
    transform: scaleX(1);
  }

  .lp-rsvp-btn {
    display: inline-block;
    padding: 8px 20px !important;
    border: 1px solid #B89050;
    border-radius: 2px;
    font-size: 11px !important;
    font-weight: 500 !important;
    letter-spacing: 0.2em !important;
    text-transform: uppercase !important;
    color: #8B6830 !important;
    text-decoration: none;
    transition: background 0.25s ease, color 0.25s ease !important;
    margin-left: 8px;
  }

  .lp-rsvp-btn:hover {
    background: #B89050 !important;
    color: #fff !important;
  }

  .lp-rsvp-btn::after {
    display: none !important;
  }

  .lp-hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    padding: 8px;
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
  }

  .lp-hamburger span {
    display: block;
    width: 22px;
    height: 1.5px;
    background: #2C2416;
    transition: transform 0.3s ease, opacity 0.3s ease;
    transform-origin: center;
  }

  .lp-hamburger.open span:nth-child(1) {
    transform: translateY(6.5px) rotate(45deg);
  }

  .lp-hamburger.open span:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
  }

  .lp-hamburger.open span:nth-child(3) {
    transform: translateY(-6.5px) rotate(-45deg);
  }

  /* Mobile overlay */
  .lp-mobile-overlay {
    position: fixed;
    inset: 0;
    z-index: 99;
    background: #faf7f3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.35s ease;
  }

  .lp-mobile-overlay.open {
    opacity: 1;
    pointer-events: all;
  }

  .lp-mobile-ornament {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    color: #C9A96E;
    opacity: 0.5;
    margin-bottom: 4px;
  }

  .lp-mobile-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 30px;
    font-weight: 300;
    font-style: italic;
    color: #2C2416;
    letter-spacing: 0.08em;
    margin-bottom: 36px;
    margin-top: 4px;
  }

  .lp-mobile-nav {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .lp-mobile-nav li {
    width: 200px;
    border-bottom: 1px solid rgba(180, 150, 100, 0.14);
  }

  .lp-mobile-nav li:first-child {
    border-top: 1px solid rgba(180, 150, 100, 0.14);
  }

  .lp-mobile-nav li a {
    display: block;
    padding: 16px 0;
    text-align: center;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #6B5B45;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .lp-mobile-nav li a:hover {
    color: #B89050;
  }

  .lp-mobile-rsvp {
    margin-top: 28px;
    display: inline-block;
    padding: 12px 36px;
    border: 1px solid #B89050;
    border-radius: 2px;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #8B6830;
    text-decoration: none;
    transition: background 0.25s ease, color 0.25s ease;
  }

  .lp-mobile-rsvp:hover {
    background: #B89050;
    color: #fff;
  }

  @media (max-width: 860px) {
    .lp-links { display: none; }
    .lp-hamburger { display: flex; }
    .lp-nav-inner { padding: 0 24px; }
  }

  @media (max-width: 480px) {
    .lp-nav-inner { padding: 0 16px; }
    .lp-logo { font-size: 20px; }
  }
`;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <style>{styles}</style>

      <nav className={`lp-nav${scrolled ? " scrolled" : ""}`}>
        <div className="lp-nav-inner">
          {/* Logo */}
          <a href="#home" className="lp-logo">
            PJ<span className="lp-logo-amp">& LEI</span>
          </a>

          {/* Desktop links */}
          <ul className="lp-links">
            {menuItems.map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}>
                  {item}
                </a>
              </li>
            ))}
            <li>
              <a href="#rsvp" className="lp-rsvp-btn">
                RSVP
              </a>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            className={`lp-hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`lp-mobile-overlay${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="lp-mobile-ornament">✦</div>
        <div className="lp-mobile-logo">
          PJ <span className="lp-logo-amp">& LEI</span>
        </div>
        <ul className="lp-mobile-nav">
          {menuItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={close}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <a href="#rsvp" className="lp-mobile-rsvp" onClick={close}>
          RSVP
        </a>
      </div>
    </>
  );
}
