import React, { useState, useEffect } from 'react';
import FrameSequenceHero from '../components/FrameSequenceHero';
import atmosphereVideo from '../assets/luxury_real_estate_slideshow.mp4';
import { StaggerTestimonials } from '../components/ui/stagger-testimonials';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import InteractiveBentoGallery from '../components/ui/interactive-bento-gallery';
import { galleryData } from '../lib/galleryData';
import { initAnimations } from '../lib/animations';

export default function Home({ onOpenBooking }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedLayoutKey, setSelectedLayoutKey] = useState(null);
  const [activeArea, setActiveArea] = useState('Living Room');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    apartmentType: '',
    contactMethod: 'Call',
    message: '',
    consent: false
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateField = (name, value) => {
    if (name === 'name') {
      return !value.trim() ? 'Required' : '';
    }
    if (name === 'email') {
      if (!value.trim()) return 'Required';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !emailRegex.test(value) ? 'Please enter a valid email' : '';
    }
    if (name === 'phone') {
      return !value.trim() ? 'Required' : '';
    }
    if (name === 'apartmentType') {
      return !value ? 'Required' : '';
    }
    if (name === 'consent') {
      return !value ? 'Required' : '';
    }
    return '';
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleFocus = (field) => {
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
    if (touched[name]) {
      const error = validateField(name, val);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const newTouched = {};
    let hasInvalid = false;

    ['name', 'email', 'phone', 'apartmentType', 'consent'].forEach((field) => {
      newTouched[field] = true;
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        hasInvalid = true;
      }
    });

    setTouched(newTouched);
    setErrors(newErrors);

    if (!hasInvalid) {
      setFormSubmitted(true);
    }
  };

  useEffect(() => {
    let cleanup;
    let initialized = false;

    const runInit = () => {
      if (initialized) return;
      initialized = true;
      cleanup = initAnimations();
    };

    // Initialize as soon as fonts are ready or after 500ms at most
    document.fonts.ready.then(runInit);
    const fallback = setTimeout(runInit, 500);

    return () => {
      clearTimeout(fallback);
      if (cleanup) cleanup();
    };
  }, []);

  useEffect(() => {
    if (selectedLayoutKey && galleryData[selectedLayoutKey]) {
      const areas = Object.keys(galleryData[selectedLayoutKey].areas);
      if (areas.length > 0 && !areas.includes(activeArea)) {
        setActiveArea(areas[0]);
      }
    }
  }, [selectedLayoutKey, activeArea]);

  const faqs = [
    {
      q: "Where exactly is Manara located?",
      a: "On Sheikh Zayed Road, Dubai, inside the Ariana Group Building, minutes from DIFC, Downtown Dubai and Dubai Marina."
    },
    {
      q: "Are the offices fully fitted?",
      a: "Yes. Every unit arrives furnished, lit, networked and Ejari registered before you move in, with desks, chairs, storage and central air conditioning included."
    },
    {
      q: "What office sizes are available?",
      a: "From 260 sqft single suites up to 1,050 sqft flagship configurations, across 18 available units on the Classic Floor."
    },
    {
      q: "What's included in the lease?",
      a: "DEWA, WiFi, central air conditioning, covered parking, a private bathroom and 24/7 secured access, all in one annual rent."
    },
    {
      q: "Can I combine adjacent units?",
      a: "Yes. Adjacent suites can be combined into a custom footprint, with fit out negotiable for premium configurations."
    },
    {
      q: "Is a private viewing available?",
      a: "Yes. Same day viewings are arranged for serious tenants, brokers and corporate clients."
    }
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleScrollToId = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="home">
      {/* Cinematic Drone Playback Frame Sequence Hero */}
      <FrameSequenceHero onOpenBooking={onOpenBooking} />

      {/* Welcome / Discover Section */}
      <section className="section z-index-2 overflow-visible" id="welcome">
        <div className="container">
          <span className="tag">[ Welcome ]</span>
          <div className="heading-columns">
            <div className="heading-col max-width-560">
              <h2 className="h2">Welcome To The Classic Floor</h2>
            </div>
            <div className="heading-col max-width-450">
              <p data-text-anim="">
                A curated set of eighteen private office suites inside the Ariana Group Building, on Sheikh Zayed Road, Dubai's most recognised commercial corridor. Every unit is independently leased and Ejari registered, with its own entrance, private bathroom, central air and lockable storage. Tenants share only what they should, the lobby, the in house Costa Coffee, the executive lounge and the prestige of the address.
              </p>
            </div>
          </div>

          <div className="discover__content">
            <div className="discover__img-wrap" style={{ overflow: 'hidden' }}>
              <img
                src="/assets/welcome_discover.png"
                alt="The Ariana Group Building lobby, Sheikh Zayed Road."
                className="discover__img"
                data-img-scale=""
              />
            </div>
            <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', opacity: 0.7 }}>The Ariana Group Building lobby, Sheikh Zayed Road.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section z-index-1" id="about">
        <div className="container">
          <div className="about__content-wrap">
            <div className="about__content">
              <span className="tag">[ About ]</span>
              <h2 data-text-anim="">Our approach goes beyond a workspace. Manara blends a landmark Sheikh Zayed Road address, fully fitted interiors and same day move in into one lease.</h2>
              <div className="about__columns">
                <div className="about__col">
                  <p className="h2"><span data-num-anim="">18</span></p>
                  <p className="text-color-gray" data-text-anim="">private offices on the Classic Floor</p>
                </div>
                <div className="about__col">
                  <p className="h2">260-1,050 <span className="about__unit">sqft</span></p>
                  <p className="text-color-gray" data-text-anim="">configurable footprint from single to flagship</p>
                </div>
                <div className="about__col">
                  <p className="h2">24/7</p>
                  <p className="text-color-gray" data-text-anim="">secured access and on site management</p>
                </div>
              </div>
            </div>

            <div className="about__card">
              <div className="about__img-wrap" data-img-curtain="">
                <img
                  src="/assets/about_resort_view.png"
                  alt="Fitted office interiors, ready from day one."
                  className="about__img"
                  data-img-scale=""
                />
              </div>
              <p style={{ fontWeight: 500 }}>Fitted office interiors, ready from day one.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Atmosphere Section */}
      <section className="section mod--atmosphere">
        <div className="atmosphere__bg">
          <video
            autoPlay
            loop
            muted
            playsInline
            src={atmosphereVideo}
            data-img-scale=""
          />
        </div>
        <div className="atmosphere__content">
          <p className="h3">
            "Sheikh Zayed Road carries weight no other address matches. Banks, brokerages, family offices and law firms anchor here for the same reason you will."
          </p>
          <button onClick={onOpenBooking} className="button" style={{ marginTop: '1rem' }}>
            Book A Viewing
          </button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section" id="facilities">
        <div className="container">
          <span className="tag">[ Why Lease Here ]</span>
          <div className="heading-columns">
            <div className="heading-col max-width-560">
              <h2 className="h2">Why Lease At Manara</h2>
            </div>
            <div className="heading-col max-width-450">
              <p data-text-anim="">One lease, everything switched on. The cost certainty serious tenants demand.</p>
            </div>
          </div>

          <div className="choose__content">
            <div className="choose__columns mod--img">
              <div className="choose__img-column">
                <div className="choose__img-wrap is--tall">
                  <img src="/assets/choose_amenity_1.png" alt="Luxury resort amenity pool view" className="choose__img" />
                </div>
                <div className="choose__img-wrap is--short">
                  <img src="/assets/choose_amenity_2.png" alt="Caesar Palm Jumeirah tower exterior facade closeup" className="choose__img" />
                </div>
              </div>
              <div className="choose__img-column">
                <div className="choose__img-wrap is--short">
                  <img src="/assets/choose_amenity_3.png" alt="Resort amenity swimming pool deck lounge" className="choose__img" />
                </div>
                <div className="choose__img-wrap is--tall">
                  <img src="/assets/choose_amenity_4.png" alt="Luxury resort lounge area" className="choose__img" />
                </div>
              </div>
            </div>

            <div className="choose__columns mod--points">
              <div className="choose__col">
                <img src="https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/6948811759a4c3302b5e0057_choose__icon-1.svg" alt="" className="icon-64" />
                <div className="choose__text-wrap">
                  <p className="body-text-24">Prestige Location</p>
                  <p className="opacity60">A single line on Sheikh Zayed Road on your business card carries the same weight as the address itself. Banks, brokerages, family offices, law firms and trading houses anchor here for the footfall and visibility.</p>
                </div>
              </div>
              <div className="choose__col">
                <img src="https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/694881176a9a8de410572e4f_choose__icon-2.svg" alt="" className="icon-64" />
                <div className="choose__text-wrap">
                  <p className="body-text-24">Zero Setup Time</p>
                  <p className="opacity60">Walk in Monday, trade Tuesday. Ejari, DEWA, WiFi, furniture and parking are included from day one, with no fit out delay and no setup cost.</p>
                </div>
              </div>
              <div className="choose__col">
                <img src="https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/694881179414a8ec1d969f68_choose__icon-3.svg" alt="" className="icon-64" />
                <div className="choose__text-wrap">
                  <p className="body-text-24">Cost Certainty</p>
                  <p className="opacity60">One number covers DEWA, WiFi, parking and central air conditioning. No surprise bills, no hidden service charges, just predictable annual rent.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Properties - Staggered Design */}
      <section className="section" id="apartments">
        <div className="container">
          <span className="tag">[ Offices ]</span>
          <div className="heading-columns" style={{ marginBottom: '2rem' }}>
            <div className="heading-col">
              <h2>Explore Available Offices</h2>
            </div>
          </div>

          <div className="properties__columns is--1">
            <div className="properties__col is--1" style={{ overflow: 'hidden' }}>
              <img src="/assets/explore_apartment_left.png" alt="Manara Offices" data-slide-x="-50" />
              <a href="#contact" onClick={(e) => handleScrollToId(e, 'contact')} className="properties__btn is--1">
                <img src="https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/694883c86bc039784b1ff34d_icon-arrow-right-large.svg" alt="Details" />
              </a>
            </div>
            <div className="properties__col is--2">
              <p data-text-anim="">Single suites, combined floors and flagship configurations. Every unit fully fitted with furniture, lighting and a private bathroom.</p>
              
              <div className="properties__card">
                <div className="properties__img-wrap" style={{ overflow: 'hidden' }}>
                  <img src="/assets/explore_apartment_right.png" className="img" alt="310 sqft Single Office Card" data-img-scale="" />
                </div>
                <div className="properties__text-wrap">
                  <div>
                    <p className="opacity80" style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>Location:</p>
                    <p className="body-text-24" style={{ fontSize: '1.1rem', marginTop: '0.2rem' }}>Sheikh Zayed Road, Dubai</p>
                  </div>
                  <div>
                    <p className="opacity80" style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>Property Type:</p>
                    <p className="body-text-20" style={{ fontSize: '1.1rem', marginTop: '0.2rem', fontFamily: 'var(--font-garet)' }}>310 sqft Single Office</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="properties__columns is--2" style={{ marginTop: '4rem' }}>
            <div className="properties__col is--2">
              <div className="properties__card">
                <div className="properties__img-wrap" style={{ overflow: 'hidden' }}>
                  <img src="/assets/explore_apartment_2_left.png" className="img" alt="650 sqft Combined Suite Card" data-img-scale="" />
                </div>
                <div className="properties__text-wrap">
                  <div>
                    <p className="opacity80" style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>Location:</p>
                    <p className="body-text-24" style={{ fontSize: '1.1rem', marginTop: '0.2rem' }}>Sheikh Zayed Road, Dubai</p>
                  </div>
                  <div>
                    <p className="opacity80" style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>Property Type:</p>
                    <p className="body-text-20" style={{ fontSize: '1.1rem', marginTop: '0.2rem', fontFamily: 'var(--font-garet)' }}>650 sqft Combined Suite</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="properties__col is--1" style={{ overflow: 'hidden' }}>
              <img src="/assets/explore_apartment_2_right.png" alt="650 sqft Combined Suite" data-slide-x="50" />
              <a href="#contact" onClick={(e) => handleScrollToId(e, 'contact')} className="properties__btn is--2">
                <img src="https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/694883c86bc039784b1ff34d_icon-arrow-right-large.svg" alt="Details" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Completed Variants (Layouts) */}
      <section className="section" id="layouts">
        <div className="container">
          <span className="tag">[ LAYOUTS ]</span>
          <div className="heading-columns">
            <div className="heading-col">
              <h2>YOUR FUTURE RESIDENCE IS READY</h2>
            </div>
          </div>

          <div className="variants__columns">
            {/* House 1 */}
            <div className="variants__col">
              <div className="variants__img-wrap" data-img-curtain="">
                <img src="/assets/layout_studio.png" alt="Single Office" className="variants__img" data-img-scale="" />
              </div>
              <div className="variants__col-content">
                <h3 className="h3">Single Office</h3>
                <div className="variants__list">
                  <div className="variants__list-el">
                    <img src="https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/6948898e038420ec0c413f94_variants__icon-1.svg" alt="Workstations" className="icon-24" />
                    <p>2 workstations</p>
                  </div>
                  <div className="variants__list-el">
                    <img src="https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/6948898eaf84227880120a79_variants__icon-2.svg" alt="Floors" className="icon-24" />
                    <p>1 floor</p>
                  </div>
                  <div className="variants__list-el">
                    <img src="https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/6948898eda774fbec0193ee2_variants__icon-3.svg" alt="Size" className="icon-24" />
                    <p>260 to 310 sqft</p>
                  </div>
                </div>
                <div className="variants__text-wrap">
                  <p className="opacity60">A fully fitted private office with a dedicated private bathroom and reception seating, ideal as a first Dubai address or a lean two person team.</p>
                  <p style={{ fontWeight: 600, marginTop: '0.75rem', color: 'var(--color-text-dark)' }}>From AED 70,000 a year</p>
                </div>
                <div className="variants__btn-wrap">
                  <button onClick={() => { setSelectedLayoutKey('studio'); setActiveArea('Workspace'); }} className="button is--dark" style={{ width: '100%', textAlign: 'center', display: 'block', border: 'none', cursor: 'pointer' }}>View Availability</button>
                </div>
              </div>
            </div>

            {/* House 2 */}
            <div className="variants__col" data-variant-slide="">
              <div className="variants__img-wrap" style={{ overflow: 'hidden' }}>
                <img src="/assets/layout_1plus1.png" alt="Combined Suite" className="variants__img" data-img-scale="" />
              </div>
              <div className="variants__col-content">
                <h3 className="h3">Combined Suite</h3>
                <div className="variants__list">
                  <div className="variants__list-el">
                    <img src="https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/6948898e038420ec0c413f94_variants__icon-1.svg" alt="Workstations" className="icon-24" />
                    <p>up to 6 workstations</p>
                  </div>
                  <div className="variants__list-el">
                    <img src="https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/6948898eaf84227880120a79_variants__icon-2.svg" alt="Floors" className="icon-24" />
                    <p>1 floor</p>
                  </div>
                  <div className="variants__list-el">
                    <img src="https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/6948898eda774fbec0193ee2_variants__icon-3.svg" alt="Size" className="icon-24" />
                    <p>420 to 650 sqft</p>
                  </div>
                </div>
                <div className="variants__text-wrap">
                  <p className="opacity60">Two adjoining units opened into one footprint, with a separate executive room, built for growing teams and partner style practices.</p>
                  <p style={{ fontWeight: 600, marginTop: '0.75rem', color: 'var(--color-text-dark)' }}>From AED 100,000 a year</p>
                </div>
                <div className="variants__btn-wrap">
                  <button onClick={() => { setSelectedLayoutKey('1+1'); setActiveArea('Living Room'); }} className="button is--dark" style={{ width: '100%', textAlign: 'center', display: 'block', border: 'none', cursor: 'pointer' }}>View Availability</button>
                </div>
              </div>
            </div>

            {/* House 3 */}
            <div className="variants__col" data-variant-slide="">
              <div className="variants__img-wrap" style={{ overflow: 'hidden' }}>
                <img src="/assets/layout_2plus1.png" alt="Premium Flagship Suite" className="variants__img" data-img-scale="" />
              </div>
              <div className="variants__col-content">
                <h3 className="h3">Premium Flagship Suite</h3>
                <div className="variants__list">
                  <div className="variants__list-el">
                    <img src="https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/6948898e038420ec0c413f94_variants__icon-1.svg" alt="Workstations" className="icon-24" />
                    <p>up to 12 workstations</p>
                  </div>
                  <div className="variants__list-el">
                    <img src="https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/6948898eaf84227880120a79_variants__icon-2.svg" alt="Floors" className="icon-24" />
                    <p>1 floor</p>
                  </div>
                  <div className="variants__list-el">
                    <img src="https://cdn.prod.website-files.com/6912666ed2f85503a5c73fb4/6948898eda774fbec0193ee2_variants__icon-3.svg" alt="Size" className="icon-24" />
                    <p>800 to 1,050 sqft</p>
                  </div>
                </div>
                <div className="variants__text-wrap">
                  <p className="opacity60">Three or four units combined into a boutique floor of your own, with architectural lighting, a configurable layout and executive scale.</p>
                  <p style={{ fontWeight: 600, marginTop: '0.75rem', color: 'var(--color-text-dark)' }}>From AED 180,000 a year</p>
                </div>
                <div className="variants__btn-wrap">
                  <button onClick={() => { setSelectedLayoutKey('2+1'); setActiveArea('Living Room'); }} className="button is--dark" style={{ width: '100%', textAlign: 'center', display: 'block', border: 'none', cursor: 'pointer' }}>View Availability</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Membership Section */}
      <section className="section" id="membership" style={{ paddingBottom: 0 }}>
        <div className="container">
          <span className="tag">[ The Lease ]</span>
          <div className="heading-columns" style={{ marginBottom: '3rem' }}>
            <div className="heading-col">
              <h2>What's Included In Every Lease</h2>
            </div>
          </div>
        </div>
        <StaggerTestimonials />
      </section>

      {/* FAQ Section */}
      <section className="section" id="faq">
        <div className="container">
          <span className="tag">[ FAQ ]</span>
          <div className="heading-columns" style={{ marginBottom: '3rem' }}>
            <div className="heading-col">
              <h2>Frequently Asked Questions</h2>
            </div>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${activeFaq === index ? 'active' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-header">
                  <h3 className="h3">{faq.q}</h3>
                  <div className="faq-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

      {/* Contact Section */}
      <section className="section mod--contact" id="contact">
        <div className="container">
          <div className="contact-layout">
            <div>
              <p className="contact__title">[ Book Your Private</p>
              <p className="contact__title mod--right">Office Viewing ]</p>
              
              <p style={{ opacity: 0.7, maxWidth: '28rem', marginBottom: '2rem' }} data-text-anim="">
                Leave your details and our sales team will reach out to arrange a private tour of Manara, share full layouts, and walk you through availability across single offices, combined suites, and flagship configurations.
              </p>

              <div className="contact-info-block">
                <div className="contact-info-row">
                  <div className="contact-info-label">PHONE</div>
                  <div className="contact-info-value">800 ARIANA</div>
                </div>
                <div className="contact-info-row">
                  <div className="contact-info-label">EMAIL</div>
                  <div className="contact-info-value">admin@realcocapital.ae</div>
                </div>
                <div className="contact-info-row">
                  <div className="contact-info-label">WEB</div>
                  <div className="contact-info-value">www.thearianagroup.com</div>
                </div>
                <div className="contact-info-row">
                  <div className="contact-info-label">ADDRESS</div>
                  <div className="contact-info-value">Sheikh Zayed Road, Dubai, UAE</div>
                </div>
                <div className="contact-info-row">
                  <div className="contact-info-label">HOURS</div>
                  <div className="contact-info-value">Sunday through Saturday 9am to 9pm</div>
                </div>
              </div>

              <p style={{ opacity: 0.6, fontSize: '0.9rem', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                Leased and managed by RealCo Capital Real Estate, a division of The Ariana Group.
              </p>

              <div className="social-links-row">
                <a href="#instagram" className="social-link" data-gsap="btn">Instagram</a>
                <span className="social-link-separator" style={{ opacity: 0.3 }}>·</span>
                <a href="#linkedin" className="social-link" data-gsap="btn">LinkedIn</a>
                <span className="social-link-separator" style={{ opacity: 0.3 }}>·</span>
                <a href="#youtube" className="social-link" data-gsap="btn">YouTube</a>
              </div>
            </div>
            
            {formSubmitted ? (
              <div className="contact-form-success">
                <div className="success-icon-wrap">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3 className="success-title">Thank you — your request is received.</h3>
                <p className="success-sub">
                  Our team will be in touch shortly. In the meantime, you can explore the full project presentation.
                </p>
                <a href="/presentation.pdf" target="_blank" rel="noopener noreferrer" className="button is--text is--light" style={{ alignSelf: 'flex-start' }}>
                  Download Presentation
                </a>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="contact-form-field">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur('name')}
                    onFocus={() => handleFocus('name')}
                    style={{ borderColor: touched.name && errors.name ? '#ff4d4d' : '' }}
                    required
                  />
                  {touched.name && errors.name && (
                    <span className="error-message">{errors.name}</span>
                  )}
                </div>
                
                <div className="contact-form-field">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    onFocus={() => handleFocus('email')}
                    style={{ borderColor: touched.email && errors.email ? '#ff4d4d' : '' }}
                    required
                  />
                  {touched.email && errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </div>

                <div className="contact-form-field">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number e.g. +971 ..."
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={() => handleBlur('phone')}
                    onFocus={() => handleFocus('phone')}
                    style={{ borderColor: touched.phone && errors.phone ? '#ff4d4d' : '' }}
                    required
                  />
                  {touched.phone && errors.phone && (
                    <span className="error-message">{errors.phone}</span>
                  )}
                </div>

                <div className="contact-form-field">
                  <select
                    name="apartmentType"
                    value={formData.apartmentType}
                    onChange={handleChange}
                    onBlur={() => handleBlur('apartmentType')}
                    onFocus={() => handleFocus('apartmentType')}
                    style={{ 
                      borderColor: touched.apartmentType && errors.apartmentType ? '#ff4d4d' : '',
                      color: formData.apartmentType === '' ? 'rgba(255,255,255,0.4)' : 'var(--color-white)' 
                    }}
                    required
                  >
                    <option value="" disabled hidden>Office Size Preference</option>
                    <option value="Single 260 to 310 sqft">Single 260 to 310 sqft</option>
                    <option value="Combined 420 to 650 sqft">Combined 420 to 650 sqft</option>
                    <option value="Premium 800 to 1,050 sqft">Premium 800 to 1,050 sqft</option>
                  </select>
                  {touched.apartmentType && errors.apartmentType && (
                    <span className="error-message">{errors.apartmentType}</span>
                  )}
                </div>

                <div className="contact-form-field">
                  <label className="field-label-eyebrow">Preferred contact method</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="Call"
                        checked={formData.contactMethod === 'Call'}
                        onChange={handleChange}
                      />
                      <span>Call</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="WhatsApp"
                        checked={formData.contactMethod === 'WhatsApp'}
                        onChange={handleChange}
                      />
                      <span>WhatsApp</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="Email"
                        checked={formData.contactMethod === 'Email'}
                        onChange={handleChange}
                      />
                      <span>Email</span>
                    </label>
                  </div>
                </div>

                <div className="contact-form-field">
                  <textarea
                    name="message"
                    placeholder="Tell us about your business, your team size, or any questions about the building."
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                  />
                </div>

                <div className="contact-form-field checkbox-field">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      onBlur={() => handleBlur('consent')}
                      onFocus={() => handleFocus('consent')}
                      required
                    />
                    <span className="checkbox-text">
                      I agree to be contacted by Manara and RealCo Capital Real Estate regarding my inquiry and accept the privacy policy.
                    </span>
                  </label>
                  {touched.consent && errors.consent && (
                    <span className="error-message">{errors.consent}</span>
                  )}
                </div>

                <button type="submit" className="button is--text" style={{ alignSelf: 'flex-start', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                  Request A Viewing
                </button>

                <p className="form-caption">
                  We respond within 24 hours. A consultation is free and carries no obligation.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Layout Gallery Modal Dialog */}
      <AnimatePresence>
        {selectedLayoutKey && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="layout-modal-overlay"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px'
            }}
            onClick={() => setSelectedLayoutKey(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="layout-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="layout-modal-header">
                <div>
                  <h2 className="layout-modal-title">{galleryData[selectedLayoutKey].title}</h2>
                  <p className="layout-modal-desc">{galleryData[selectedLayoutKey].description}</p>
                </div>
                <button
                  onClick={() => setSelectedLayoutKey(null)}
                  className="layout-modal-close"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Area Selector Tabs */}
              <div className="layout-modal-tabs">
                {Object.keys(galleryData[selectedLayoutKey].areas).map((area) => (
                  <button
                    key={area}
                    onClick={() => setActiveArea(area)}
                    className={`layout-modal-tab ${activeArea === area ? 'active' : ''}`}
                    style={{
                      color: '#173a34',
                      fontWeight: 600
                    }}
                  >
                    {area}
                  </button>
                ))}
              </div>

              {/* Interactive Bento Gallery */}
              <div className="layout-modal-bento-container">
                <InteractiveBentoGallery
                  mediaItems={galleryData[selectedLayoutKey].areas[activeArea] || []}
                  title=""
                  description=""
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
