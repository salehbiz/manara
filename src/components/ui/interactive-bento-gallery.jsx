import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InteractiveBentoGallery = ({ mediaItems }) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Reset selected item when category items change
  useEffect(() => {
    setSelectedItemIndex(null);
  }, [mediaItems]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePrev = (e) => {
    e.stopPropagation();
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));
    }
  };

  const activeItem = selectedItemIndex !== null ? mediaItems[selectedItemIndex] : null;

  return (
    <div style={{ width: '100%' }}>
      {/* Grid Layout */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '16px',
          padding: '8px 0'
        }}
      >
        {mediaItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setSelectedItemIndex(index)}
            style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              aspectRatio: '4/3',
              cursor: 'pointer',
              backgroundColor: '#eae8e2',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              border: '1px solid rgba(34, 34, 34, 0.05)'
            }}
          >
            <img
              src={item.url}
              alt={item.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              loading="lazy"
            />
            {/* Hover overlay description */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '16px',
                background: 'gradient-to-t',
                backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                color: '#ffffff',
                pointerEvents: 'none'
              }}
            >
              <h4 style={{ fontFamily: 'Garet, sans-serif', fontSize: '0.95rem', fontWeight: '500', margin: 0 }}>
                {item.title}
              </h4>
              <p style={{ fontFamily: 'Garet, sans-serif', fontSize: '0.8rem', opacity: 0.85, marginTop: '2px', margin: 0 }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Zoom Dialog */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 100000,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
            onClick={() => setSelectedItemIndex(null)}
          >
            {/* Top Bar / Close info */}
            <div
              style={{
                position: 'absolute',
                top: '24px',
                left: '24px',
                right: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: '#fff',
                zIndex: 10
              }}
            >
              <div style={{ fontFamily: 'Garet, sans-serif' }}>
                <span style={{ fontSize: '0.8rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Viewing Image
                </span>
                <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: '500', color: '#fff' }}>
                  {activeItem.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedItemIndex(null)}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: '#fff',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              >
                <X size={20} />
              </button>
            </div>

            {/* Slider Wrap */}
            <div 
              style={{ 
                position: 'relative', 
                width: '100%', 
                maxWidth: '900px', 
                height: isMobile ? '45vh' : '65vh', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prev Arrow */}
              {mediaItems.length > 1 && (
                <button
                  onClick={handlePrev}
                  style={{
                    position: 'absolute',
                    left: isMobile ? '10px' : '-20px',
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    color: '#fff',
                    width: isMobile ? '40px' : '48px',
                    height: isMobile ? '40px' : '48px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 20,
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              {/* Central Image */}
              <motion.img
                key={activeItem.id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                src={activeItem.url}
                alt={activeItem.title}
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  borderRadius: '16px',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                }}
              />

              {/* Next Arrow */}
              {mediaItems.length > 1 && (
                <button
                  onClick={handleNext}
                  style={{
                    position: 'absolute',
                    right: isMobile ? '10px' : '-20px',
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    color: '#fff',
                    width: isMobile ? '40px' : '48px',
                    height: isMobile ? '40px' : '48px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 20,
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>

            {/* Bottom Caption */}
            <div style={{ marginTop: '24px', textAlign: 'center', color: '#fff', maxWidth: '600px' }}>
              <p style={{ fontFamily: 'Garet, sans-serif', fontSize: '0.95rem', margin: 0, opacity: 0.9 }}>
                {activeItem.desc}
              </p>
              <p style={{ fontFamily: 'Garet, sans-serif', fontSize: '0.75rem', margin: 0, opacity: 0.5, marginTop: '8px' }}>
                {selectedItemIndex + 1} / {mediaItems.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveBentoGallery;
