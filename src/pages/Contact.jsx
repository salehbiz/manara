import React, { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ paddingBottom: '0rem' }}>
      <section className="section mod--contact-page" style={{ paddingTop: '10rem', paddingBottom: '8rem' }}>
        <div className="container">
          <div className="contact-layout" style={{ color: 'var(--color-text-dark)' }}>
            <div>
              <h1 className="h1 text-color-black" style={{ marginBottom: '2rem' }}>Contact us</h1>
              <p className="body-text-24 opacity85" style={{ marginBottom: '3rem', maxWidth: '30rem' }}>
                If you have any questions, please contact us. We will be happy to help you create your dream home!
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
                <div>
                  <p style={{ fontWeight: 600, textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '0.5rem', opacity: 0.6 }}>Office Location</p>
                  <p className="body-text-18" style={{ fontFamily: 'var(--font-garet)' }}>Caesar Palm Jumeirah, Karpaz Anayolu, Dikarpaz 5731, North Cyprus</p>
                </div>
                <div>
                  <p style={{ fontWeight: 600, textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '0.5rem', opacity: 0.6 }}>Phone</p>
                  <p className="body-text-18" style={{ fontFamily: 'var(--font-garet)' }}>+90 548 842 48 48</p>
                </div>
                <div>
                  <p style={{ fontWeight: 600, textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '0.5rem', opacity: 0.6 }}>Email</p>
                  <p className="body-text-18" style={{ fontFamily: 'var(--font-garet)' }}>hello@caesarprojects.com</p>
                </div>
              </div>
            </div>

            <div style={{ background: '#fff', padding: '3rem', borderRadius: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{ fontSize: '3rem', color: 'green', marginBottom: '1rem' }}>✓</div>
                  <h3 style={{ textTransform: 'none', marginBottom: '1rem' }}>Message Sent!</h3>
                  <p className="opacity70">Thank you for reaching out. A specialist from our team will contact you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <h3 style={{ textTransform: 'none', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Send us a message</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', opacity: 0.6 }}>Name</label>
                    <input type="text" placeholder="Enter your name" required style={{ color: '#222', borderBottomColor: '#ccc' }} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', opacity: 0.6 }}>Email Address</label>
                    <input type="email" placeholder="Enter your email" required style={{ color: '#222', borderBottomColor: '#ccc' }} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', opacity: 0.6 }}>How can we help?</label>
                    <textarea placeholder="Tell us about your requirements" required rows="4" style={{ color: '#222', borderBottom: '1px solid #ccc', background: 'transparent' }}></textarea>
                  </div>

                  <button type="submit" className="button is--dark" style={{ width: '100%', marginTop: '1rem' }}>
                    Submit Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
