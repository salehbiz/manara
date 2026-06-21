import React, { useEffect, useRef, useState } from 'react';
import mobileVideo from '../assets/Drone_flythrough_portrait_clean.mp4';

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

  const totalFrames = 240;
  const framePaths = Array.from({ length: totalFrames }, (_, i) => {
    const frameNum = String(i + 1).padStart(6, '0');
    return `/assets/hero-frames/frame_${frameNum}.webp`;
  });

  const imagesRef = useRef([]);

  useEffect(() => {
    // Check reduced motion setting
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const listener = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);

    // Check mobile viewport width
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      mediaQuery.removeEventListener('change', listener);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Progressive image preloading
  useEffect(() => {
    if (reducedMotion) {
      setLoading(false);
      return;
    }

    let loadedCount = 0;
    const images = [];
    const requested = new Set();

    // Load first, middle, and last frames first to establish keys immediately
    const priorityIndices = [0, Math.floor(totalFrames / 2), totalFrames - 1];
    
    const loadNext = (index) => {
      if (index >= totalFrames) return;
      
      if (requested.has(index)) {
        loadNext(index + 1);
        return;
      }
      requested.add(index);

      const img = new Image();
      img.src = framePaths[index];
      img.onload = () => {
        images[index] = img;
        loadedCount++;
        if (loadedCount >= totalFrames) {
          setLoading(false);
        }
        loadNext(index + 1);
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount >= totalFrames) {
          setLoading(false);
        }
        loadNext(index + 1);
      };
    };

    // Trigger priority loads
    priorityIndices.forEach((idx) => {
      requested.add(idx);
      const img = new Image();
      img.src = framePaths[idx];
      img.onload = () => {
        images[idx] = img;
        loadedCount++;
        if (idx === totalFrames - 1) {
          drawFrame(img);
          setLoading(false); // Instantly ready once the last frame is loaded
        }
        if (loadedCount >= totalFrames) {
          setLoading(false);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (idx === totalFrames - 1) {
          setLoading(false);
        }
        if (loadedCount >= totalFrames) {
          setLoading(false);
        }
      };
    });

    imagesRef.current = images;
    loadNext(0);

  }, [reducedMotion]);

  // Helper to draw a specific frame keeping object-fit: cover logic
  const drawFrame = (img) => {
    const canvas = canvasRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    const imgWidth = img.naturalWidth || img.width;
    const imgHeight = img.naturalHeight || img.height;
    if (!imgWidth || !imgHeight) return;

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = width / height;

    let dWidth = width;
    let dHeight = height;
    let dx = 0;
    let dy = 0;

    if (canvasRatio > imgRatio) {
      dHeight = width / imgRatio;
      dy = (height - dHeight) / 2;
    } else {
      dWidth = height * imgRatio;
      dx = (width - dWidth) / 2;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, dx, dy, dWidth, dHeight);
  };

  // Scroll tracking and rendering
  useEffect(() => {
    if (reducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const container = scrollContainerRef.current;
          if (container) {
            const rect = container.getBoundingClientRect();
            const scrollHeight = rect.height - window.innerHeight;
            
            // Calculate normalized scroll progress through the track
            let progress = 0;
            if (scrollHeight > 0) {
              progress = -rect.top / scrollHeight;
              progress = Math.max(0, Math.min(1, progress));
            }

            // Perform direct DOM manipulations on scroll to avoid triggering React component renders
            if (fadeTagRef.current) {
              // Fade out immediately as scroll starts (completely gone by 15% scroll progress)
              const tagOpacity = progress < 0.02 ? 1 : Math.max(0, 1 - (progress - 0.02) / 0.13);
              fadeTagRef.current.style.opacity = tagOpacity;
              fadeTagRef.current.style.visibility = tagOpacity === 0 ? 'hidden' : 'visible';
            }

            if (fadeContentRef.current) {
              // Fade body and CTAs immediately as scroll starts (completely gone by 15% scroll progress)
              const contentOpacity = progress < 0.02 ? 1 : Math.max(0, 1 - (progress - 0.02) / 0.13);
              fadeContentRef.current.style.opacity = contentOpacity;
              fadeContentRef.current.style.visibility = contentOpacity === 0 ? 'hidden' : 'visible';
            }

            if (fadeStatsRef.current) {
              // Fade out stats bar immediately as scroll starts (completely gone by 15% scroll progress)
              const statsOpacity = progress < 0.02 ? 1 : Math.max(0, 1 - (progress - 0.02) / 0.13);
              fadeStatsRef.current.style.opacity = statsOpacity;
              fadeStatsRef.current.style.visibility = statsOpacity === 0 ? 'hidden' : 'visible';
            }

            if (scrollOverlayRef.current) {
              // Fade out the intro overlay as scroll starts (fully gone by 20% scroll progress)
              const overlayOpacity = progress < 0.01 ? 1 : Math.max(0, 1 - progress / 0.20);
              scrollOverlayRef.current.style.opacity = overlayOpacity;
              scrollOverlayRef.current.style.pointerEvents = overlayOpacity === 0 ? 'none' : 'none';
            }

            if (imagesRef.current.length > 0) {
              const frameIndex = progress === 0 ? totalFrames - 1 : Math.floor(progress * (totalFrames - 1));
              let img = imagesRef.current[frameIndex];
              if (!img) {
                // Find nearest loaded frame backward
                for (let i = frameIndex - 1; i >= 0; i--) {
                  if (imagesRef.current[i]) {
                    img = imagesRef.current[i];
                    break;
                  }
                }
              }
              if (!img) {
                // Find nearest loaded frame forward
                for (let i = frameIndex + 1; i < totalFrames; i++) {
                  if (imagesRef.current[i]) {
                    img = imagesRef.current[i];
                    break;
                  }
                }
              }
              if (!img) {
                img = imagesRef.current[0];
              }
              if (img) {
                drawFrame(img);
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Initial paint
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [reducedMotion]);

  return (
    <section className="caesar-hero" ref={scrollContainerRef}>
      <div className="caesar-hero__sticky-wrapper">
        {/* Background canvas or static fallback */}
        <div className="caesar-hero__bg">
          {reducedMotion ? (
            <img 
              src="/assets/hero-frames/frame_000240.webp" 
              alt="Manara building drone view" 
              className="caesar-hero__fallback-img"
            />
          ) : (
            <>
              <canvas ref={canvasRef} className="caesar-hero__canvas" />
              {loading && (
                <img 
                  src="/assets/hero-frames/frame_000240.webp" 
                  alt="Manara building backdrop" 
                  className="caesar-hero__fallback-img"
                />
              )}
            </>
          )}
          {/* Subtle elegant left & bottom overlay gradients */}
          <div className="caesar-hero__overlay-left" />
          <div className="caesar-hero__overlay-bottom" />
          <div className="caesar-hero__blend-blur" />
          {/* Scroll-fade intro overlay */}
          <div ref={scrollOverlayRef} className="caesar-hero__scroll-overlay" />
        </div>

        {/* Cinematic Minimal Content Wrapper */}
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
            
            {/* Scroll-faded block containing description & CTAs */}
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

        {/* Pill-shaped horizontal Bottom Stat Bar */}
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
