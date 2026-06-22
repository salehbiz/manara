import React, { useEffect, useRef, useState } from 'react';

export default function FrameSequenceHero({ onOpenBooking }) {
  const canvasRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const fadeContentRef = useRef(null);
  const fadeStatsRef = useRef(null);
  const fadeTagRef = useRef(null);
  const scrollOverlayRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const imagesRef = useRef([]);

  const frameCount = 193;
  const desktopFramePath = (index) => `/assets/hero-frames-new/frame_${String(index).padStart(6, '0')}.jpg`;
  const mobileFramePath = (index) => `/assets/hero-frames-mobile/frame_${String(index).padStart(6, '0')}.jpg`;
  const fallbackImgSrc = '/assets/hero-poster.jpg';

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

  // Preload image sequence into memory for desktop and mobile
  useEffect(() => {
    if (reducedMotion) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const images = [];
    let loadedCount = 0;
    const getFramePath = isMobile ? mobileFramePath : desktopFramePath;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          imagesRef.current = images;
          setLoading(false);
          drawFrame(1); // Draw the first frame initially
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          imagesRef.current = images;
          setLoading(false);
          drawFrame(1);
        }
      };
      images.push(img);
    }
  }, [isMobile, reducedMotion]);

  // Object-fit: cover equivalent canvas drawing
  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index - 1];
    if (!img || !img.complete) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;
    let drawWidth, drawHeight, drawX, drawY;

    if (imgRatio > canvasRatio) {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
      drawX = (canvas.width - drawWidth) / 2;
      drawY = 0;
    } else {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      drawX = 0;
      drawY = (canvas.height - drawHeight) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  };

  useEffect(() => {
    if (reducedMotion || loading) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Handle high DPI retina screens without blurring the image
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      handleScroll();
    };

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
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

        if (imagesRef.current.length === frameCount) {
          const frameIndex = progress === 0
            ? 1
            : Math.max(1, Math.min(frameCount, Math.round(progress * frameCount)));
          drawFrame(frameIndex);
        }
      });
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll, { passive: true });

    resizeCanvas();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, reducedMotion, isMobile]);

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
              src={isMobile ? "/assets/hero-poster-portrait.jpg" : "/assets/hero-poster.jpg"}
              alt="Manara building"
              className="caesar-hero__fallback-img"
            />
          ) : (
            <>
              <canvas
                ref={canvasRef}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              {loading && (
                <img
                  src={isMobile ? "/assets/hero-poster-portrait.jpg" : fallbackImgSrc}
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
