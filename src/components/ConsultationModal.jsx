import React, { useState } from 'react';

export default function ConsultationModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1: Date/Time, 2: Contact Info, 3: Success
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handleDateSelect = (day) => {
    setSelectedDate(day);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && (email || phone)) {
      setStep(3);
    }
  };

  const resetForm = () => {
    setStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setName('');
    setEmail('');
    setPhone('');
    onClose();
  };

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const timeSlots = ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"];

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={resetForm}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={resetForm} aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="var(--rl-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {step === 1 && (
          <div>
            <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Select Date &amp; Time</h3>
            <div className="calendar-header">
              <span style={{ fontWeight: 600, fontFamily: 'var(--font-garet)' }}>June 2026</span>
            </div>
            <div className="calendar-weekdays">
              <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
            </div>
            <div className="calendar-grid">
              {/* Empty spaces to align 1st of June (which is Monday, so 1 empty slot for Sunday) */}
              <span></span>
              {daysInMonth.map((day) => (
                <button
                  key={day}
                  type="button"
                  className="calendar-day"
                  style={{
                    backgroundColor: selectedDate === day ? 'var(--rl-teal)' : 'transparent',
                    color: selectedDate === day ? 'var(--rl-ivory)' : 'var(--rl-teal)',
                    fontWeight: selectedDate === day ? 'bold' : 'normal'
                  }}
                  onClick={() => handleDateSelect(day)}
                >
                  {day}
                </button>
              ))}
            </div>

            {selectedDate && (
              <div style={{ marginTop: '2rem' }}>
                <p className="time-title" style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Available times for June {selectedDate}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      className="time-item"
                      onClick={() => handleTimeSelect(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 style={{ marginBottom: '1.5rem' }}>Your Information</h3>
            <p style={{ marginBottom: '1.5rem', opacity: 0.7 }}>
              Booking for: <strong>June {selectedDate}, 2026</strong> at <strong>{selectedTime}</strong>
            </p>
            <form onSubmit={handleSubmit} className="contact-form">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--rl-teal)' }}
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--rl-teal)' }}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--rl-teal)' }}
              />
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button
                  type="button"
                  className="button is--text"
                  onClick={() => setStep(1)}
                  style={{ flex: 1 }}
                >
                  Back
                </button>
                <button type="submit" className="button is--dark" style={{ flex: 1 }}>
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✓</div>
            <h3>Thank You!</h3>
            <p style={{ margin: '1rem 0 2rem 0', opacity: 0.7 }}>
              Your consultation has been booked for <strong>June {selectedDate}, 2026</strong> at <strong>{selectedTime}</strong>. We will reach out to you shortly.
            </p>
            <button className="button is--dark" onClick={resetForm}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
