import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Users, Coffee, Wifi, Car, Bath, FileCheck2 } from 'lucide-react';
import { cn } from '../../lib/utils';

const testimonials = [
  {
    tempId: 0,
    testimonial: "Shared reception, executive lounge and a fully equipped boardroom for client meetings and presentations.",
    by: "Reception And Boardroom",
    Icon: Users
  },
  {
    tempId: 1,
    testimonial: "In building Costa Coffee serving tenants and visitors, plus a private executive lounge.",
    by: "Cafe And Lounge",
    Icon: Coffee
  },
  {
    tempId: 2,
    testimonial: "DEWA, business grade WiFi and central air conditioning included in every lease, no separate accounts and no separate bills.",
    by: "Utilities And Connectivity",
    Icon: Wifi
  },
  {
    tempId: 3,
    testimonial: "Covered, secure parking and 24/7 security monitored entry for tenants and their clients.",
    by: "Parking And Access",
    Icon: Car
  },
  {
    tempId: 4,
    testimonial: "Every unit comes with its own private ensuite bathroom, no shared facilities, complete privacy for you and your team.",
    by: "Private Bathroom",
    Icon: Bath
  },
  {
    tempId: 5,
    testimonial: "Every lease is fully Ejari registered from day one, giving your business a legally compliant commercial address with zero admin.",
    by: "Ejari Registered",
    Icon: FileCheck2
  }
];

const TestimonialCard = ({ position, testimonial, handleMove, cardSize }) => {
  const isCenter = position === 0;
  const { Icon } = testimonial;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "stagger-card absolute cursor-pointer transition-all duration-500 ease-in-out",
        isCenter ? "is-center" : "is-side"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        left: '50%',
        top: '50%',
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? '0px 20px 50px rgba(0,0,0,0.2)'
          : '0px 8px 24px rgba(23,58,52,0.15)'
      }}
    >
      <div className="card-icon-wrap">
        <Icon size={28} strokeWidth={1.5} />
      </div>
      <h3 className="card-quote">{testimonial.testimonial}</h3>
      <p className="card-author">{testimonial.by}</p>
    </div>
  );
};

export const StaggerTestimonials = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia('(min-width: 640px)');
      setCardSize(matches ? 365 : 290);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div className="stagger-wrapper" style={{ height: 600 }}>
      {testimonialsList.map((testimonial, index) => {
        // Centre-aligned positions: -2.5 -1.5 -0.5 +0.5 +1.5 +2.5 for 6 cards
        const half = testimonialsList.length / 2;
        const position = index - half + 0.5;
        // Round to nearest integer so centre card gets position 0
        const posInt = Math.round(position);
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={posInt}
            cardSize={cardSize}
          />
        );
      })}
      <div className="control-buttons">
        <button onClick={() => handleMove(-1)} className="control-btn" aria-label="Previous">
          <ChevronLeft size={20} />
        </button>
        <button onClick={() => handleMove(1)} className="control-btn" aria-label="Next">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
