import React, { useEffect, useRef, useState } from 'react';

export default function FrameSequenceHero({ onOpenBooking }) {
  const videoRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const fadeContentRef = useRef(null);
  const fadeStatsRef = useRef(null);
  const fadeTagRef = useRef(null);
  const scrollOverlayRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const listener = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      mediaQuery.removeEventListener('change', listener);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Wait for enough buffered data, then seek to last frame (completed building)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isMobile) return;

    const onReady = () => {
      video.currentTime = video.duration;
      setLoading(false);
    };

    // canplaythrough = browser has the full video buffered, seeks are instant
    video.addEventListener('canplaythrough', onReady, { once: true });
    if (video.readyState >= 4) onReady();

    return () => video.removeEventListener('canplaythrough', onReady);
  }, [isMobile]);

  // Scroll tracking — scrub video currentTime on desktop
  useEffect(() => {
    if (reducedMotion || isMobile) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        // Always reset ticking so future scroll events aren't dropped
        ticking = false;

        const container = scrollContainerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const scrollHeight = rect.height - window.innerHeight;

        let progress = 0;
        if (scrollHeight > 0) {
          progress = Math.max(0, Math.min(1, -rect.top / scrollHeight));
        }

        // Overlay fades
        if (fadeTagRef.current) {
          const op = progress < 0.02 ? 1 : Math.max(0, 1 - (progress - 0.02) / 0.13);
          fadeTagRef.current.style.opacity = op;
          fadeTagRef.current.style.visibility = op === 0 ? 'hidden' : 'visible';
        }
        if (fadeContentRef.current) {
          const op = progress < 0.02 ? 1 : Math.max(0, 1 - (progress - 0.02) / 0.13);
          fadeContentRef.current.style.opacity = op;
          fadeContentRef.current.style.visibility = op === 0 ? 'hidden' : 'visible';
        }
        if (fadeStatsRef.current) {
          const op = progress < 0.02 ? 1 : Math.max(0, 1 - (progress - 0.02) / 0.13);
          fadeStatsRef.current.style.opacity = op;
          fadeStatsRef.current.style.visibility = op === 0 ? 'hidden' : 'visible';
        }
        if (scrollOverlayRef.current) {
          const op = progress < 0.01 ? 1 : Math.max(0, 1 - progress / 0.20);
          scrollOverlayRef.current.style.opacity = op;
          scrollOverlayRef.current.style.pointerEvents = 'none';
        }

        // Scrub: progress 0 = last frame (completed building), 1 = first frame
        const video = videoRef.current;
        if (video && isFinite(video.duration) && video.duration > 0) {
          video.currentTime = (1 - progress) * video.duration;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [reducedMotion, isMobile]);

  const videoStyle = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  };

  return (
    <section className="caesar-hero" ref={scrollContainerRef}>
      <div className="caesar-hero__sticky-wrapper">
        <div className="caesar-hero__bg">
          {reducedMotion ? (
            <img
              src="/assets/hero-poster.jpg"
              alt="Manara building"
              className="caesar-hero__fallback-img"
            />
          ) : isMobile ? (
            <video
              ref={videoRef}
              src="/assets/hero-video-portrait.mp4"
              poster="/assets/hero-poster-portrait.jpg"
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              style={videoStyle}
            />
          ) : (
            <>
              <video
                ref={videoRef}
                src="/assets/hero-video.mp4"
                poster="/assets/hero-poster.jpg"
                preload="auto"
                muted
                playsInline
                disablePictureInPicture
                style={videoStyle}
              />
              {loading && (
                <img
                  src="/assets/hero-poster.jpg"
                  alt="Manara building"
                  className="caesar-hero__fallback-img"
                  style={{ position: 'absolute', inset: 0, zIndex: 1 }}
                />
              )}
            </>
          )}

          <div className="caesar-hero__overlay-left" />
          <div className="caesar-hero__overlay-bottom" />
          <div className="caesar-hero__blend-blur" />
          <div ref={scrollOverlayRef} className="caesar-hero__scroll-overlay" />
        </div>

        <div className="container caesar-hero__container">
          <div className="caesar-hero__editorial-wrap">
            <span ref={fadeTagRef} className="caesar-hero__tag" letters-fade-in-random="" style={{ transition: 'opacity 0.25s ease, visibility 0.25s ease' }}>[ Sheikh Zayed Road ]</span>

            <div className="caesar-hero__brand-presenter" data-hero-support="" style={{ opacity: 0 }}>
              <div className="caesar-hero__brand-name">REALCO CAPITAL</div>
              <div className="caesar-hero__brand-presents">PRESENTS</div>
            </div>

            <h1 className="caesar-hero__title">
              <span className="caesar-hero__title-main" words-rotate-in="">MANARA</span>
              <span className="caesar-hero__title-by" data-hero-support="" style={{ opacity: 0 }}>by Ariana</span>
            </h1>

            <div ref={fadeContentRef} className="caesar-hero__faded-block">
              <p className="caesar-hero__description" data-hero-support="" style={{ opacity: 0 }}>
                Private offices in a premium business address, designed for modern teams and growing companies.
              </p>
              <div className="caesar-hero__ctas" data-hero-support="" style={{ opacity: 0 }}>
                <button onClick={onOpenBooking} className="button">
                  Get Consultation
                </button>
                <a
                  href="#apartments"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('apartments')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="caesar-hero__secondary-cta"
                >
                  Explore Offices
                </a>
              </div>
            </div>
          </div>
        </div>

        <div ref={fadeStatsRef} className="caesar-hero__stat-bar">
          <div className="caesar-hero__stat-item">
            <span className="caesar-hero__stat-val">18</span>
            <span className="caesar-hero__stat-label">PRIVATE OFFICES</span>
          </div>
          <div className="caesar-hero__stat-divider" />
          <div className="caesar-hero__stat-item">
            <span className="caesar-hero__stat-val">260 to 1,050</span>
            <span className="caesar-hero__stat-label">SQFT RANGE</span>
          </div>
          <div className="caesar-hero__stat-divider" />
          <div className="caesar-hero__stat-item">
            <span className="caesar-hero__stat-val">FROM AED 70,000</span>
            <span className="caesar-hero__stat-label">PER YEAR</span>
          </div>
          <div className="caesar-hero__stat-divider" />
          <div className="caesar-hero__stat-item">
            <span className="caesar-hero__stat-val">EJARI</span>
            <span className="caesar-hero__stat-label">ISSUED</span>
          </div>
        </div>
      </div>
    </section>
  );
}
