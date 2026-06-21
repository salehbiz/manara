import React from 'react';

export default function Footer() {
  const handleLinkClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="section mod--footer">
      <div className="container">
        <div className="footer-layout">
          <div>
            <p className="opacity60" style={{ marginBottom: '1rem' }}>Ariana Group Building, Sheikh Zayed Road, Dubai, UAE</p>
            <p className="opacity40" style={{ fontSize: '0.9rem' }}>© 2026. Manara. All rights reserved.</p>
          </div>
          
          <div className="footer-links" style={{ display: 'flex', gap: '2rem' }}>
            <a href="#home" onClick={(e) => handleLinkClick(e, 'home')} data-gsap="btn" className="opacity80 hover-opacity100" style={{ textTransform: 'uppercase', fontSize: '0.9rem', fontFamily: 'var(--font-garet)' }}>Home</a>
            <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} data-gsap="btn" className="opacity80 hover-opacity100" style={{ textTransform: 'uppercase', fontSize: '0.9rem', fontFamily: 'var(--font-garet)' }}>The Building</a>
            <a href="#apartments" onClick={(e) => handleLinkClick(e, 'apartments')} data-gsap="btn" className="opacity80 hover-opacity100" style={{ textTransform: 'uppercase', fontSize: '0.9rem', fontFamily: 'var(--font-garet)' }}>Offices</a>
            <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')} data-gsap="btn" className="opacity80 hover-opacity100" style={{ textTransform: 'uppercase', fontSize: '0.9rem', fontFamily: 'var(--font-garet)' }}>Contact</a>
          </div>
          
          <div className="footer__title" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <img src="/logo.png" alt="Manara Logo" style={{ height: '60px', width: 'auto', objectFit: 'contain', marginBottom: '0.5rem', filter: 'brightness(0) invert(1)' }} />
            <div style={{ fontFamily: 'var(--font-garet)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Manara
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
