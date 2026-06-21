import React, { useState } from 'react';

const TEAM = [
  { name: "Abram Stanton", role: "President", img: "https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/6964f10c1234b15b4baa6bf9_team-img-1.avif" },
  { name: "Charlie Septimus", role: "Carpenter", img: "https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/6964f10cb83a905e180e1fab_team-img-2.avif" },
  { name: "Gretchen Levin", role: "Administrative Assistant", img: "https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/6964f10c3311375c4be1ebfc_team-img-3.avif" },
  { name: "Ryan Korsgaard", role: "Associate", img: "https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/6964f10c1a6013a8b5a37734_team-img-4.avif" },
  { name: "Wilson Baptista", role: "Team Leader", img: "https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/6964f10c2f9d761093e8a753_team-img-5.avif" },
  { name: "Nolan Vaccaro", role: "Team Leader", img: "https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/6964f10c79176792c94e13b4_team-img-6.avif" },
  { name: "Justin Rhiel Madsen", role: "Carpenter", img: "https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/6964f10c2c4e76639678dfae_team-img-7.avif" },
  { name: "Jordyn Lipshutz", role: "Carpenter", img: "https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/6964f10c1dd131b16c1ba91b_team-img-8.avif" }
];

export default function AboutUs({ onOpenBooking }) {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: "Where exactly is Caesar Palm Jumeirah located?",
      a: "On Karpaz Anayolu in Dikarpaz, Northern Cyprus, 300 metres from a private fully equipped beach."
    },
    {
      q: "Are the apartments fully furnished?",
      a: "Yes. Every unit is delivered fully furnished with modern interiors and equipped kitchens."
    },
    {
      q: "What apartment types are available?",
      a: "Studios, 1+1, 2+1 layouts, and penthouses, all with private balconies."
    },
    {
      q: "What facilities are included for residents?",
      a: "Private beach, multiple pools (infinity, palm-shaped, indoor heated, kids'), gym, sauna, hammam, jacuzzi, tennis and football courts, kids' game room, on-site restaurant, café, and Arabic tents lounge."
    },
    {
      q: "Is there a membership programme?",
      a: "Yes. The Caesar Projects Membership Programme gives owners and their tenants access to facilities and services across all Caesar Projects developments."
    },
    {
      q: "Is there a virtual tour?",
      a: "Yes, a full VR walkthrough is available on request."
    }
  ];

  return (
    <div style={{ paddingBottom: '8rem' }}>
      {/* Intro Header */}
      <section className="section mod--about-us" style={{ paddingTop: '10rem', paddingBottom: '4rem' }}>
        <div className="container">
          <h1 className="h1 text-color-black" style={{ marginBottom: '2rem' }}>A resort lifestyle inspired by Dubai</h1>
          <p className="body-text-24 mob-16 opacity60" style={{ maxWidth: '45rem' }}>
            We believe that a home is more than architecture. It’s a personal space shaped by your lifestyle, values, and rhythm of life, 300m from the Mediterranean sea.
          </p>
        </div>
      </section>

      {/* Philosophy Statement */}
      <section className="section" style={{ background: '#222', color: '#fff' }}>
        <div className="container" style={{ textAlign: 'center', padding: '3rem 0' }}>
          <p className="h3" style={{ color: '#fff', maxWidth: '50rem', margin: '0 auto', lineHeight: 1.4 }}>
            "Only 300 metres from the sea, with a private palm-shaped communal pool and an exclusive pool in every building — Caesar Palm Jumeirah is built for a higher standard of living."
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section">
        <div className="container">
          <span className="tag">[ ABOUT ]</span>
          <div className="about__content-wrap">
            <div className="about__content">
              <h2>Caesar Palm Jumeirah blends Dubai-inspired architecture, resort-grade amenities, and Mediterranean serenity into one address.</h2>
              <div className="about__columns" style={{ marginTop: '3rem' }}>
                <div className="about__col">
                  <p className="h2" style={{ fontSize: '3.5rem' }}>7</p>
                  <p className="text-color-gray">High-rise towers, 24 floors each</p>
                </div>
                <div className="about__col">
                  <p className="h2" style={{ fontSize: '3.5rem' }}>300m</p>
                  <p className="text-color-gray">Distance to a private beach</p>
                </div>
                <div className="about__col">
                  <p className="h2" style={{ fontSize: '3.5rem' }}>24/7</p>
                  <p className="text-color-gray">Gated security and concierge</p>
                </div>
              </div>
            </div>
            
            <div className="about__card">
              <div className="about__img-wrap" style={{ height: '22rem' }}>
                <img 
                  src="/assets/about_resort_view.png" 
                  alt="Modern architectural structure" 
                  className="about__img" 
                />
              </div>
              <p style={{ fontWeight: 500 }}>Resort living, redesigned for the coast of Cyprus.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <span className="tag">[ Our team ]</span>
          <div className="heading-columns" style={{ marginBottom: '3rem' }}>
            <div className="heading-col">
              <h2>Our team</h2>
            </div>
            <div className="heading-col">
              <p>We are architects, designers, and builders united by one belief — a well-designed home should feel effortless to live in.</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '3rem 2rem' }}>
            {TEAM.map((member, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{ width: '100%', aspectRatio: '3/4', borderRadius: '1rem', overflow: 'hidden', marginBottom: '1rem' }}>
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.3)' }} 
                  />
                </div>
                <p className="body-text-24" style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{member.name}</p>
                <p className="body-text-16 opacity60" style={{ fontSize: '0.9rem' }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="section">
        <div className="container">
          <span className="tag">[ FACILITIES ]</span>
          <div className="heading-columns">
            <div className="heading-col max-width-560">
              <h2 className="h2">WHY CHOOSE CAESAR PALM JUMEIRAH?</h2>
            </div>
            <div className="heading-col max-width-450">
              <p>Every facility you'd expect from a five-star resort, available to residents and members.</p>
            </div>
          </div>

          <div className="choose__content">
            <div className="choose__columns mod--img">
              <div className="choose__col mod--img is--1">
                <div className="choose__img-wrap is--1">
                  <img src="https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/6949e23fe081a735de635dbb_choose__img-1.avif" alt="Modern home" className="choose__img is--1" />
                </div>
              </div>
              <div className="choose__col mod--img is--2">
                <div className="choose__img-wrap is--2">
                  <img src="https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/6949e23f6beb9a0f3dab1cd1_choose__img-3.avif" alt="Modern home" className="choose__img is--2" />
                </div>
              </div>
              <div className="choose__col mod--img is--3">
                <div className="choose__img-wrap is--3">
                  <img src="https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/6949e23f81429009491cd498_choose__img-4.avif" alt="Modern home" className="choose__img is--3" />
                </div>
              </div>
              <div className="choose__col mod--img is--4">
                <div className="choose__img-wrap is--4">
                  <img src="https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/6949e23f03aeb4c2932974ae_choose__img-2.avif" alt="Modern home" className="choose__img is--4" />
                </div>
              </div>
            </div>

            <div className="choose__columns mod--points">
              <div className="choose__col">
                <img src="https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/6948811759a4c3302b5e0057_choose__icon-1.svg" alt="" className="icon-64" />
                <div className="choose__text-wrap">
                  <p className="body-text-24">Dubai-Inspired Architecture</p>
                  <p className="opacity60">Seven towers designed in the spirit of Palm Jumeirah, with curved balconies, sea-facing layouts, and a signature palm-shaped communal pool unique to the complex.</p>
                </div>
              </div>
              <div className="choose__col">
                <img src="https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/694881176a9a8de410572e4f_choose__icon-2.svg" alt="" className="icon-64" />
                <div className="choose__text-wrap">
                  <p className="body-text-24">Resort-Grade Amenities</p>
                  <p className="opacity60">A fully equipped private beach, infinity and indoor heated pools, sauna, hammam, jacuzzi, ice bath, a state-of-the-art fitness centre, tennis and football courts, and a kids' game room.</p>
                </div>
              </div>
              <div className="choose__col">
                <img src="https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/694881179414a8ec1d969f68_choose__icon-3.svg" alt="" className="icon-64" />
                <div className="choose__text-wrap">
                  <p className="body-text-24">Dining & Leisure</p>
                  <p className="opacity60">Azul restaurant by Afik Group serving fusion cuisine, Café Paris bakery, and an Arabic tents area with ethnic food, shisha, and cocktails — all on site.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <div className="container">
          <span className="tag">[ FAQ ]</span>
          <div className="heading-columns" style={{ marginBottom: '3rem' }}>
            <div className="heading-col">
              <h2>Frequently asked questions</h2>
            </div>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${activeFaq === index ? 'active' : ''}`}
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
              >
                <div className="faq-header">
                  <h3 className="h3">{faq.q}</h3>
                  <div className="faq-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4V20M4 12H20" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className="faq-content">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="section mod--contact">
        <div className="container">
          <div className="contact-layout">
            <div>
              <p className="contact__title">[ Still have not found what</p>
              <p className="contact__title mod--right">you are looking for? ]</p>
              <p style={{ opacity: 0.7, maxWidth: '28rem', marginBottom: '2rem' }}>
                Leave your contact details, and our team will get in touch to help you choose the right variant, answer your questions and arrange a viewing.
              </p>
            </div>
            
            <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert("Thanks! We will contact you soon."); }}>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Message" rows="4"></textarea>
              <button type="submit" className="button is--text" style={{ alignSelf: 'flex-start', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                Send Request
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
