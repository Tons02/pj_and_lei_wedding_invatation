import { useEffect, useRef } from "react";
import dressCodeImg from "../assets/dressCode.jpg";

const PALETTE = [
  { name: "Wine Red", hex: "#6B1525" },
  { name: "Beige", hex: "#C8B89A" },
  { name: "Blush Pink", hex: "#E8B4B8" },
  { name: "Burgundy Red", hex: "#800020" },
];

const ROLES = [
  { role: "Mother of the Bride & Groom", attire: "Blush Pink Formal Gown" },
  { role: "Father of the Groom", attire: "Barong Tagalog, Black Slacks" },
  { role: "Maid of Honor", attire: "Red Gown" },
  { role: "Best Man", attire: "Burgundy Suit" },
  { role: "Ninang & Ninong", attire: "Beige / Formal" },
  { role: "Secondary Sponsor", attire: "Wine Red" },
  { role: "Wedding Guests (Female)", attire: "Burgundy or Wine Red" },
  { role: "Wedding Guests (Male)", attire: "Burgundy or Wine Red" },
  { role: "Flower Girl & Ring Bearer", attire: "Burgundy Red" },
];

const NOTES = [
  "Please avoid wearing white, off-white, or ivory",
  "Smart casual to formal attire is encouraged",
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap');

  .dress {
    position: relative;
    padding: clamp(5rem, 12vw, 9rem) 1.5rem;
    background-color: #faf8f4;
    overflow: hidden;
  }

  .dress__bg-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(6rem, 18vw, 16rem);
    font-weight: 300;
    font-style: italic;
    color: rgba(107, 21, 37, 0.04);
    white-space: nowrap;
    pointer-events: none;
    user-select: none;
    letter-spacing: -0.02em;
  }

  .dress__inner {
    position: relative;
    max-width: 1100px;
    margin: 0 auto;
  }

  /* ── Header ── */
  .dress__header {
    text-align: center;
    margin-bottom: clamp(3.5rem, 8vw, 6rem);
  }

  .dress__eyebrow {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: clamp(0.6rem, 1.4vw, 0.7rem);
    letter-spacing: 0.35em;
    color: rgba(107, 21, 37, 0.65);
    text-transform: uppercase;
    margin: 0 0 1.2rem;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }

  .dress__title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-style: italic;
    font-size: clamp(3rem, 8vw, 5.5rem);
    line-height: 1;
    color: #2c2418;
    margin: 0 0 1.4rem;
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s;
  }

  .dress__rule {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    opacity: 0;
    transition: opacity 0.8s ease 0.3s;
  }

  .dress__rule span {
    display: block;
    width: clamp(40px, 7vw, 70px);
    height: 0.5px;
    background: rgba(107, 21, 37, 0.35);
  }

  .dress__rule i {
    display: block;
    width: 5px;
    height: 5px;
    background: rgba(107, 21, 37, 0.5);
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  /* ── Image ── */
  .dress__image-wrap {
    position: relative;
    margin-bottom: clamp(3rem, 7vw, 5rem);
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 1s ease 0.2s, transform 1s ease 0.2s;
  }

  .dress__image-wrap::before {
    content: '';
    position: absolute;
    inset: -10px;
    background: rgba(107, 21, 37, 0.07);
    z-index: 0;
    transform: translate(10px, 10px);
    pointer-events: none;
  }

  .dress__image-inner {
    position: relative;
    overflow: hidden;
    z-index: 1;
  }

  .dress__image {
    width: 100%;
    // height: clamp(200px, 42vw, 500px);
    object-fit: contain;
    object-position: center top;
    display: block;
    transition: transform 0.8s ease;
  }

  .dress__image-inner:hover .dress__image {
    transform: scale(1.025);
  }

  .dress__image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 65%, rgba(20, 8, 10, 0.22) 100%);
    pointer-events: none;
  }

  /* ── Bottom 3-col grid ── */
  .dress__body {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(3rem, 6vw, 4.5rem);
  }

  @media (min-width: 700px) {
    .dress__body { grid-template-columns: 1fr 1fr; }
  }

  @media (min-width: 1024px) {
    .dress__body { grid-template-columns: 1.2fr 0.9fr 0.8fr; }
  }

  /* ── Col label ── */
  .dress__col-label {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: 0.8rem;
    letter-spacing: 0.35em;
    color: rgba(107, 21, 37, 0.65);
    text-transform: uppercase;
    margin: 0 0 1.4rem;
    display: flex;
    align-items: center;
    gap: 0.7rem;
  }

  .dress__col-label::after {
    content: '';
    flex: 1;
    height: 0.5px;
    background: rgba(107, 21, 37, 0.18);
  }

  /* ── Roles col ── */
  .dress__roles-col {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s;
  }

  .dress__role-item {
    display: flex;
    align-items: flex-start;
    gap: 0.8rem;
    padding: 0.85rem 0;
    border-bottom: 0.5px solid rgba(107, 21, 37, 0.1);
    opacity: 0;
    transform: translateX(-12px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .dress__role-item.sw-visible {
    opacity: 1;
    transform: none;
  }

  .dress__role-dot {
    width: 4px;
    height: 4px;
    background: rgba(107, 21, 37, 0.45);
    transform: rotate(45deg);
    flex-shrink: 0;
    margin-top: 0.52em;
  }

  .dress__role-name {
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: clamp(0.9rem, 1.3vw, 0.78rem);
    color: #2c2418;
    margin: 0 0 0.18rem;
  }

  .dress__role-attire {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: clamp(.8rem, 1.2vw, 0.72rem);
    color: rgba(60, 48, 30, 0.5);
    margin: 0;
    font-style: italic;
  }

  /* ── Palette col ── */
  .dress__palette-col {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.9s ease 0.28s, transform 0.9s ease 0.28s;
  }

  .dress__swatches {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .dress__swatch {
    display: flex;
    align-items: center;
    gap: 1rem;
    opacity: 0;
    transform: translateX(14px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .dress__swatch.sw-visible {
    opacity: 1;
    transform: none;
  }

  .dress__swatch-block {
    width: clamp(44px, 8vw, 56px);
    height: clamp(44px, 8vw, 56px);
    flex-shrink: 0;
    border: 0.5px solid rgba(60, 48, 30, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .dress__swatch:hover .dress__swatch-block {
    transform: scale(1.1) rotate(3deg);
    box-shadow: 0 8px 24px rgba(107, 21, 37, 0.2);
  }

  .dress__swatch-name {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 400;
    font-size: clamp(1.1rem, 2.5vw, 1.3rem);
    color: #2c2418;
    display: block;
    line-height: 1;
    margin-bottom: 0.2rem;
  }

  .dress__swatch-hex {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: 0.58rem;
    letter-spacing: 0.15em;
    color: rgba(60, 48, 30, 0.4);
    text-transform: uppercase;
    display: block;
  }

  /* ── Notes col ── */
  .dress__notes-col {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s;
  }

  .dress__note {
    display: flex;
    align-items: flex-start;
    gap: 0.9rem;
    padding: 1rem 1.2rem;
    border: 0.5px solid rgba(107, 21, 37, 0.12);
    background: rgba(107, 21, 37, 0.03);
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: clamp(0.7rem, 1.3vw, 0.78rem);
    color: rgba(60, 48, 30, 0.65);
    line-height: 1.75;
    margin-bottom: 0.8rem;
    position: relative;
    opacity: 0;
    transform: translateX(14px);
    transition: opacity 0.55s ease, transform 0.55s ease, background 0.3s ease;
  }

  .dress__note::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, rgba(107,21,37,0), rgba(107,21,37,0.55), rgba(107,21,37,0));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .dress__note:hover { background: rgba(107, 21, 37, 0.06); }
  .dress__note:hover::before { opacity: 1; }

  .dress__note.sw-visible {
    opacity: 1;
    transform: none;
  }

  .dress__note-diamond {
    width: 5px;
    height: 5px;
    background: rgba(107, 21, 37, 0.45);
    transform: rotate(45deg);
    flex-shrink: 0;
    margin-top: 0.55em;
  }

  /* ── Visible ── */
  .is-visible {
    opacity: 1 !important;
    transform: none !important;
  }

  @media (prefers-reduced-motion: reduce) {
    .dress__eyebrow, .dress__title, .dress__rule,
    .dress__image-wrap, .dress__roles-col, .dress__palette-col,
    .dress__notes-col, .dress__role-item, .dress__swatch, .dress__note {
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
    }
  }
`;

export default function DressCode() {
  const headerRef = useRef(null);
  const imageRef = useRef(null);
  const rolesRef = useRef(null);
  const paletteRef = useRef(null);
  const notesRef = useRef(null);
  const roleItemRefs = useRef([]);
  const swatchRefs = useRef([]);
  const noteRefs = useRef([]);

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
    [
      headerRef.current?.querySelector(".dress__eyebrow"),
      headerRef.current?.querySelector(".dress__title"),
      headerRef.current?.querySelector(".dress__rule"),
      imageRef.current,
      rolesRef.current,
      paletteRef.current,
      notesRef.current,
    ]
      .filter(Boolean)
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("sw-visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.15 },
    );
    [...roleItemRefs.current, ...swatchRefs.current, ...noteRefs.current]
      .filter(Boolean)
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{styles}</style>

      <section id="dress-code" className="dress">
        <div className="dress__bg-text" aria-hidden="true">
          Attire
        </div>

        <div className="dress__inner">
          {/* Header */}
          <header className="dress__header" ref={headerRef}>
            <p className="dress__eyebrow">Come dressed to celebrate</p>
            <h2 className="dress__title">Dress Code</h2>
            <div className="dress__rule">
              <span />
              <i />
              <span />
            </div>
          </header>

          {/* Full-width attire guide image */}
          <div className="dress__image-wrap" ref={imageRef}>
            <div className="dress__image-inner">
              <img
                src={dressCodeImg}
                alt="Wedding Attire Guide"
                className="dress__image"
              />
              <div className="dress__image-overlay" aria-hidden="true" />
            </div>
          </div>

          {/* Bottom 3-col */}
          <div className="dress__body">
            {/* Roles */}
            <div className="dress__roles-col" ref={rolesRef}>
              <p className="dress__col-label">By Role</p>
              {ROLES.map((item, i) => (
                <div
                  className="dress__role-item"
                  key={item.role}
                  ref={(el) => (roleItemRefs.current[i] = el)}
                  style={{ transitionDelay: `${i * 0.07}s` }}
                >
                  <span className="dress__role-dot" aria-hidden="true" />
                  <div>
                    <p className="dress__role-name">{item.role}</p>
                    <p className="dress__role-attire">{item.attire}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Palette */}
            <div className="dress__palette-col" ref={paletteRef}>
              <p className="dress__col-label">Colour Palette</p>
              <div className="dress__swatches">
                {PALETTE.map((color, i) => (
                  <div
                    className="dress__swatch"
                    key={color.name}
                    ref={(el) => (swatchRefs.current[i] = el)}
                    style={{ transitionDelay: `${i * 0.1}s` }}
                  >
                    <div
                      className="dress__swatch-block"
                      style={{ backgroundColor: color.hex }}
                      aria-label={color.name}
                    />
                    <div>
                      <span className="dress__swatch-name">{color.name}</span>
                      <span className="dress__swatch-hex">{color.hex}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="dress__notes-col" ref={notesRef}>
              <p className="dress__col-label">Please Note</p>
              {NOTES.map((note, i) => (
                <div
                  className="dress__note"
                  key={i}
                  ref={(el) => (noteRefs.current[i] = el)}
                  style={{ transitionDelay: `${i * 0.12}s` }}
                >
                  <span className="dress__note-diamond" aria-hidden="true" />
                  {note}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
