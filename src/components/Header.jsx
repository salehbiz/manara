import React, { useState, useEffect } from 'react';

export default function Header({ onOpenBooking }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll position to toggle header dark text state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver to spy scroll section and update active link highlighting
  useEffect(() => {
    const sectionIds = ['home', 'welcome', 'about', 'facilities', 'apartments', 'layouts', 'membership', 'faq', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the middle portion of viewport
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getActiveLink = () => {
    if (['home', 'welcome'].includes(activeSection)) return 'home';
    if (['about', 'facilities'].includes(activeSection)) return 'about';
    if (['apartments', 'layouts'].includes(activeSection)) return 'projects';
    if (['contact', 'faq', 'membership'].includes(activeSection)) return 'contact';
    return 'home';
  };

  const isDarkText = isScrolled;
  const currentActive = getActiveLink();

  const navLinks = [
    { label: 'Home', id: 'home', targetId: 'home' },
    { label: 'The Building', id: 'about', targetId: 'about' },
    { label: 'Offices', id: 'projects', targetId: 'apartments' },
    { label: 'Contact', id: 'contact', targetId: 'contact' }
  ];

  return (
    <header className={`header ${isDarkText ? 'is--dark-text' : ''}`}>
      <div className="container">
        <div className="header__columns">
          <a href="#home" onClick={(e) => handleLinkClick(e, 'home')} className="header__col is--1" aria-label="Manara Home" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="Manara Logo" style={{ height: '56px', width: 'auto', objectFit: 'contain', filter: isDarkText ? 'none' : 'brightness(0) invert(1)' }} />
          </a>

          {/* Desktop Nav */}
          <div className="header__col is--2" style={{ display: 'flex', gap: '2rem' }}>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.targetId}`}
                onClick={(e) => handleLinkClick(e, link.targetId)}
                data-gsap="btn"
                className={`header__link ${currentActive === link.id ? 'active' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Consultation Button */}
          <button onClick={onOpenBooking} className={`button is--text ${isDarkText ? 'is--dark-border' : ''}`}>
            <div className="body-text-16">Book A Viewing</div>
            <div className="icon-24">
              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(true)}>
            <img src={isDarkText ? "https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/6964081eedf78ae0e715934a_icon-dots-dark.svg" : "https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/6949ecda23ad812ac5398e25_icon-dots.svg"} alt="Menu" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'is--open' : ''}`}>
        <div className="mobile-menu-header">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="Manara Logo" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
          </div>
          <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>
            <img src="https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/6949ed90fa7ea2133bc99219_icon-cross.svg" alt="Close" />
          </button>
        </div>
        <div className="mobile-menu-links">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.targetId}`}
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleLinkClick(e, link.targetId);
              }}
              className={currentActive === link.id ? 'active' : ''}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="mobile-menu-footer">
          <p className="text-style-allcaps">Manara. Sheikh Zayed Road, Dubai, UAE</p>
          <button onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }} className="button is--text" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>
            <div className="body-text-16 text-style-allcaps">Book A Viewing</div>
          </button>
        </div>
      </div>
    </header>
  );
}
