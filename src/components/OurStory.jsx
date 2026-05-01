import { useEffect, useRef } from "react";
import storyImg1 from "../assets/FirstOurStory.jpg";
import storyImg2 from "../assets/SecondOurStory.jpg";

const stories = [
  {
    year: "2023",
    title: "How We Met?",
    description:
      "From evaluating lessons as panel members during a teaching demonstration to preparing for the greatest lesson of all — love, commitment, and forever. ✨📚",
    image: storyImg1,
  },
  {
    year: "2026",
    title: "Journey",
    description:
      "What started with shared passion in education became a beautiful story written by God. Two teachers, once seated as evaluators, are now standing side by side as partners for life. \n Join us as we turn our final vows into forever promises. 💍❤️",
    image: storyImg2,
  },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap');

  .story {
    position: relative;
    padding: clamp(5rem, 12vw, 9rem) 1.5rem;
    background-color: #faf8f4;
    overflow: hidden;
  }

  .story__bg-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(8rem, 22vw, 20rem);
    font-weight: 300;
    font-style: italic;
    color: rgba(180, 160, 120, 0.06);
    white-space: nowrap;
    pointer-events: none;
    user-select: none;
    letter-spacing: -0.02em;
    line-height: 1;
  }

  .story__inner {
    position: relative;
    max-width: 1100px;
    margin: 0 auto;
  }

  /* ── Header ── */
  .story__header {
    text-align: center;
    margin-bottom: clamp(4rem, 10vw, 7rem);
  }

  .story__eyebrow {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: clamp(0.6rem, 1.4vw, 0.7rem);
    letter-spacing: 0.35em;
    color: rgba(160, 135, 90, 0.8);
    text-transform: uppercase;
    margin: 0 0 1.2rem;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }

  .story__title {
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

  .story__title-rule {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    opacity: 0;
    transition: opacity 0.8s ease 0.3s;
  }

  .story__title-rule span {
    display: block;
    width: clamp(40px, 7vw, 70px);
    height: 0.5px;
    background: rgba(160, 135, 90, 0.5);
  }

  .story__title-rule i {
    display: block;
    width: 5px;
    height: 5px;
    background: rgba(160, 135, 90, 0.7);
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  /* ── Timeline line (desktop) ── */
  .story__line {
    display: none;
  }

  @media (min-width: 900px) {
    .story__line {
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 0.5px;
      background: linear-gradient(
        to bottom,
        transparent 0%,
        rgba(160, 135, 90, 0.35) 15%,
        rgba(160, 135, 90, 0.35) 85%,
        transparent 100%
      );
      transform: translateX(-50%);
    }
  }

  /* ── Items ── */
  .story__items {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: clamp(4rem, 10vw, 7rem);
  }

  .story__item {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
    align-items: center;
    opacity: 0;
    transition: opacity 0.9s ease, transform 0.9s ease;
  }

  .story__item--left  { transform: translateX(-30px); }
  .story__item--right { transform: translateX(30px); }

  @media (min-width: 900px) {
    .story__item {
      grid-template-columns: 1fr 1fr;
      gap: clamp(3rem, 6vw, 5rem);
    }

    .story__item--right .story__image-wrap { order: 2; }
    .story__item--right .story__text       { order: 1; text-align: right; }
    .story__item--right .story__text-year  { justify-content: flex-end; }
  }

  /* ── Node dot on timeline ── */
  .story__node {
    display: none;
  }

  @media (min-width: 900px) {
    .story__node {
      display: flex;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      border: 0.5px solid rgba(160, 135, 90, 0.7);
      background: #faf8f4;
      rotate: 45deg;
      top: 50%;
      z-index: 1;
    }
  }

  /* ── Image ── */
  .story__image-wrap {
    position: relative;
    overflow: hidden;
  }

  .story__image-wrap::before {
    content: '';
    position: absolute;
    inset: -10px;
    background: rgba(160, 135, 90, 0.12);
    z-index: 0;
    transform: translate(10px, 10px);
    pointer-events: none;
  }

  .story__image {
    position: relative;
    width: 100%;
    height: clamp(260px, 40vw, 420px);
    object-fit: cover;
    display: block;
    z-index: 1;
    transition: transform 0.7s ease;
  }

  .story__image-wrap:hover .story__image {
    transform: scale(1.03);
  }

  .story__image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(20, 15, 8, 0.3), transparent 60%);
    z-index: 2;
    pointer-events: none;
  }

  /* ── Text ── */
  .story__text {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  .story__text-year {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: clamp(0.6rem, 1.3vw, 0.68rem);
    letter-spacing: 0.35em;
    color: rgba(160, 135, 90, 0.85);
    text-transform: uppercase;
  }

  .story__text-year::after {
    content: '';
    display: block;
    width: 28px;
    height: 0.5px;
    background: rgba(160, 135, 90, 0.5);
  }

  .story__text-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-style: italic;
    font-size: clamp(2rem, 5vw, 3rem);
    line-height: 1.05;
    color: #2c2418;
    margin: 0;
  }

  .story__text-desc {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: clamp(0.78rem, 1.5vw, 0.88rem);
    line-height: 2;
    color: rgba(60, 48, 30, 0.65);
    margin: 0;
    max-width: 420px;
  }

  @media (min-width: 900px) {
    .story__item--right .story__text-desc {
      margin-left: auto;
    }
  }

  /* ── Visible state ── */
  .is-visible {
    opacity: 1 !important;
    transform: none !important;
  }

  /* ── Reduced motion ── */
  @media (prefers-reduced-motion: reduce) {
    .story__eyebrow,
    .story__title,
    .story__title-rule,
    .story__item {
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
    }
  }
`;

export default function OurStory() {
  const headerRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const targets = [
      headerRef.current?.querySelector(".story__eyebrow"),
      headerRef.current?.querySelector(".story__title"),
      headerRef.current?.querySelector(".story__title-rule"),
      ...itemRefs.current,
    ].filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{styles}</style>

      <section id="our-story" className="story">
        <div className="story__bg-text" aria-hidden="true">
          Story
        </div>

        <div className="story__inner">
          {/* Header */}
          <header className="story__header" ref={headerRef}>
            <p className="story__eyebrow">A love worth telling</p>
            <h2 className="story__title">Our Story</h2>
            <div className="story__title-rule">
              <span />
              <i />
              <span />
            </div>
          </header>

          {/* Timeline */}
          <div className="story__items">
            <div className="story__line" aria-hidden="true" />

            {stories.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <article
                  key={index}
                  className={`story__item story__item--${isLeft ? "left" : "right"}`}
                  ref={(el) => (itemRefs.current[index] = el)}
                  style={{ transitionDelay: `${index * 0.12}s` }}
                >
                  <div className="story__node" aria-hidden="true" />

                  {/* Image */}
                  <div className="story__image-wrap">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="story__image"
                    />
                    <div className="story__image-overlay" aria-hidden="true" />
                  </div>

                  {/* Text */}
                  <div className="story__text">
                    <p className="story__text-year">{item.year}</p>
                    <h3 className="story__text-title">{item.title}</h3>
                    <p className="story__text-desc">{item.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
