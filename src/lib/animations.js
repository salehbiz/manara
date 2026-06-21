import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

let lenisInstance = null;
let activeSplitTexts = [];

// Helper to wrap timelines in ScrollTriggers as specified:
// One at start: "top bottom" with onLeaveBack that resets progress(0) and pauses
// One at start: custom (default "top 75%") with onEnter that plays timeline
function createScrollTrigger(el, tl, start = 'top 75%') {
  const stBack = ScrollTrigger.create({
    trigger: el,
    start: 'top bottom',
    onLeaveBack: () => {
      tl.progress(0).pause();
    }
  });

  const stEnter = ScrollTrigger.create({
    trigger: el,
    start: start,
    onEnter: () => {
      tl.play();
    }
  });

  return [stBack, stEnter];
}

export function initAnimations() {
  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    console.log('Reduced motion preferred. Skipping GSAP animations.');
    return () => {};
  }

  // --- Animation 15: Smooth page scrolling (Lenis) ---
  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
  });

  lenisInstance.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenisInstance?.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // --- Animation 13: Section Tags + Headings ---
  // Small bracketed tags [ ABOUT ], [ WELCOME ], etc.
  const tags = document.querySelectorAll('.tag, .caesar-hero__tag');
  tags.forEach((tag) => {
    const el = tag;
    const tl = gsap.timeline({ paused: true });
    tl.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
    createScrollTrigger(el, tl, 'top 90%');
  });

  // Large h2 section headings: split-text by lines, staggered
  const h2Headings = document.querySelectorAll('h2.h2, section h2');
  h2Headings.forEach((h2) => {
    const el = h2;
    // Skip if it has data-text-anim to avoid double-processing
    if (el.hasAttribute('data-text-anim')) return;

    gsap.set(el, { overflow: 'hidden', display: 'block' });
    const split = new SplitText(el, { type: 'lines', linesClass: 'text-line', tag: 'span' });
    activeSplitTexts.push(split);

    // Apply inline block to lines for y-motion
    gsap.set(split.lines, { display: 'inline-block', overflow: 'hidden' });

    const tl = gsap.timeline({ paused: true });
    tl.from(split.lines, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.15
    });
    createScrollTrigger(el, tl, 'top 90%');
  });

  // --- Animation 1: Line-by-line text reveal ---
  const textAnims = document.querySelectorAll('[data-text-anim]');
  textAnims.forEach((text) => {
    const el = text;
    gsap.set(el, { overflow: 'hidden', display: 'block' });
    const split = new SplitText(el, { type: 'lines', linesClass: 'text-line', tag: 'span' });
    activeSplitTexts.push(split);

    // Apply inline block to lines for y-motion
    gsap.set(split.lines, { display: 'inline-block', overflow: 'hidden' });

    // Optional delay via attribute: e.g. data-text-anim="300" (ms)
    const delayAttr = el.getAttribute('data-text-anim');
    const delay = delayAttr ? parseFloat(delayAttr) / 1000 : 0;

    const tl = gsap.timeline({ paused: true });
    tl.from(split.lines, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.2,
      delay: delay
    });

    createScrollTrigger(el, tl, 'top 95%');
  });

  // --- Animation 2: Letters fade in (random) ---
  const lettersFade = document.querySelectorAll('[letters-fade-in-random]');
  lettersFade.forEach((el) => {
    const htmlEl = el;
    const split = new SplitText(htmlEl, { type: 'chars' });
    activeSplitTexts.push(split);

    const tl = gsap.timeline({ paused: true });
    tl.from(split.chars, {
      opacity: 0,
      duration: 0.75,
      ease: 'power1.out',
      stagger: { amount: 0.75, from: 'random' }
    });

    createScrollTrigger(htmlEl, tl, 'top 95%');
  });

  // --- Animation 3: Words rotate in (X-axis flip) ---
  const wordsRotate = document.querySelectorAll('[words-rotate-in]');
  wordsRotate.forEach((el) => {
    const htmlEl = el;
    const split = new SplitText(htmlEl, { type: 'words' });
    activeSplitTexts.push(split);

    gsap.set(split.words, { transformPerspective: 1000 });

    const tl = gsap.timeline({ paused: true });
    tl.from(split.words, {
      rotationX: -90,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      stagger: { amount: 0.6, from: 'end' }
    });

    createScrollTrigger(htmlEl, tl, 'top 95%');
  });

  // --- Animation 4: Number count-up ---
  const numAnims = document.querySelectorAll('[data-num-anim]');
  numAnims.forEach((el) => {
    const htmlEl = el;
    const targetVal = parseInt(htmlEl.textContent || '0', 10);
    if (isNaN(targetVal)) return;

    const proxy = { val: 0 };
    const tl = gsap.timeline({ paused: true });
    tl.to(proxy, {
      val: targetVal,
      duration: 2,
      ease: 'power2.out',
      snap: { val: 1 },
      onUpdate: () => {
        htmlEl.textContent = String(Math.floor(proxy.val));
      }
    });

    ScrollTrigger.create({
      trigger: htmlEl,
      start: 'top 80%',
      once: true,
      onEnter: () => tl.play()
    });
  });

  // --- Animation 5: Hero supporting elements fade in ---
  const heroSupport = document.querySelectorAll('[data-hero-support]');
  if (heroSupport.length > 0) {
    const tl = gsap.timeline();
    tl.fromTo(
      heroSupport,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out', stagger: 0.2, delay: 0.8 }
    );
  }

  // --- Animation 6: Image scale reveal (1.2 -> 1) ---
  const imgScales = document.querySelectorAll('[data-img-scale]');
  imgScales.forEach((img) => {
    const htmlEl = img;
    gsap.set(htmlEl, { scale: 1.2 });

    const tl = gsap.timeline({ paused: true });
    tl.to(htmlEl, { scale: 1, duration: 1.4, ease: 'power3.out' });

    createScrollTrigger(htmlEl, tl, 'top 80%');
  });

  // --- Animation 7: Curtain reveal (width 0 -> 100%) ---
  const curtains = document.querySelectorAll('[data-img-curtain]');
  curtains.forEach((wrap) => {
    const htmlEl = wrap;
    gsap.set(htmlEl, { width: '0%', overflow: 'hidden', display: 'block' });

    const tl = gsap.timeline({ paused: true });
    tl.to(htmlEl, { width: '100%', duration: 1.2, ease: 'expo.out' });

    createScrollTrigger(htmlEl, tl, 'top 80%');
  });

  // --- Animation 8: Properties horizontal slide-in ---
  const slideXElements = document.querySelectorAll('[data-slide-x]');
  slideXElements.forEach((el) => {
    const htmlEl = el;
    const value = parseFloat(htmlEl.getAttribute('data-slide-x') || '0');

    gsap.set(htmlEl, { xPercent: value });

    const tl = gsap.timeline({ paused: true });
    tl.to(htmlEl, { xPercent: 0, duration: 1.2, ease: 'power3.out' });

    createScrollTrigger(htmlEl, tl, 'top 75%');
  });

  // Properties cards scaling
  const propCards = document.querySelectorAll('.properties__card, [data-prop-card]');
  propCards.forEach((card) => {
    const htmlEl = card;
    gsap.set(htmlEl, { scale: 0.8 });

    const tl = gsap.timeline({ paused: true });
    tl.to(htmlEl, { scale: 1, duration: 1.2, ease: 'power3.out' });

    createScrollTrigger(htmlEl, tl, 'top 75%');
  });

  // Properties arrow buttons
  const propBtns = document.querySelectorAll('.properties__btn, [data-prop-btn]');
  propBtns.forEach((btn) => {
    const htmlEl = btn;
    gsap.set(htmlEl, { scale: 0.8, rotation: -90 });

    const tl = gsap.timeline({ paused: true });
    tl.to(htmlEl, { scale: 1, rotation: 0, duration: 1, ease: 'back.out(1.4)' });

    createScrollTrigger(htmlEl, tl, 'top 75%');
  });

  // --- Animation 9: Variants cards slide from right ---
  const variantCards = document.querySelectorAll('[data-variant-slide]');
  if (variantCards.length > 0) {
    const elementsArray = Array.from(variantCards);
    elementsArray.forEach((el) => {
      gsap.set(el, { xPercent: 100 });
    });

    const tl = gsap.timeline({ paused: true });
    tl.to(elementsArray, {
      xPercent: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.15
    });

    createScrollTrigger(elementsArray[0], tl, 'top 80%');
  }

  // --- Animation 10: Contact title two-line slide ---
  const contactLines = document.querySelectorAll('.contact__title');
  if (contactLines.length >= 2) {
    const line1 = contactLines[0];
    const line2 = contactLines[1];

    gsap.set(line1, { x: -100, opacity: 0 });
    gsap.set(line2, { x: 100, opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    tl.to([line1, line2], { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out', stagger: 0 });

    createScrollTrigger(line1, tl, 'top 75%');
  }

  // --- Animation 10b: Contact info rows fade up ---
  const contactInfoRows = document.querySelectorAll('.contact-info-row');
  if (contactInfoRows.length > 0) {
    const elementsArray = Array.from(contactInfoRows);
    elementsArray.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 20 });
    });

    const tl = gsap.timeline({ paused: true });
    tl.to(elementsArray, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.1
    });

    createScrollTrigger(elementsArray[0], tl, 'top 90%');
  }

  // --- Animation 10c: Contact form fields fade up ---
  const contactFormFields = document.querySelectorAll('.contact-form-field');
  if (contactFormFields.length > 0) {
    const elementsArray = Array.from(contactFormFields);
    elementsArray.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 20 });
    });

    const tl = gsap.timeline({ paused: true });
    tl.to(elementsArray, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.08
    });

    createScrollTrigger(elementsArray[0], tl, 'top 90%');
  }

  // --- Animation 11: Quote section reveal ---
  const quoteSec = document.querySelector('.section.mod--atmosphere');
  if (quoteSec) {
    const text = quoteSec.querySelector('.atmosphere__content .h3');
    const btn = quoteSec.querySelector('.atmosphere__content .button');

    if (text && btn) {
      gsap.set(text, { y: 40, opacity: 0 });
      gsap.set(btn, { scale: 0.9, opacity: 0 });

      const tl = gsap.timeline({ paused: true });
      tl.to(text, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' })
        .to(btn, { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.8');

      createScrollTrigger(quoteSec, tl, 'top 75%');
    }
  }

  // --- Animation 12: Hover letter-swap on text links ---
  const hoverBtns = document.querySelectorAll('[data-gsap="btn"]');
  hoverBtns.forEach((btn) => {
    const link = btn;
    if (link.getAttribute('data-gsap-btn-initialized') === 'true') {
      return;
    }

    const originalText = link.getAttribute('data-original-text') || link.textContent?.trim() || '';
    if (!originalText) return;

    if (!link.hasAttribute('data-original-text')) {
      link.setAttribute('data-original-text', originalText);
    }
    link.setAttribute('data-gsap-btn-initialized', 'true');

    link.innerHTML = '';
    link.style.position = 'relative';
    link.style.overflow = 'hidden';
    link.style.display = 'inline-block';

    const ogSpan = document.createElement('span');
    ogSpan.className = 'og-text';
    ogSpan.style.display = 'inline-block';
    ogSpan.textContent = originalText;

    const cloneSpan = document.createElement('span');
    cloneSpan.className = 'clone-text';
    cloneSpan.style.position = 'absolute';
    cloneSpan.style.top = '0';
    cloneSpan.style.left = '0';
    cloneSpan.style.width = '100%';
    cloneSpan.style.pointerEvents = 'none';
    cloneSpan.style.display = 'inline-block';
    cloneSpan.textContent = originalText;

    link.appendChild(ogSpan);
    link.appendChild(cloneSpan);

    const ogSplit = new SplitText(ogSpan, { type: 'chars' });
    const cloneSplit = new SplitText(cloneSpan, { type: 'chars' });

    gsap.set(ogSplit.chars, { display: 'inline-block' });
    gsap.set(cloneSplit.chars, { display: 'inline-block', yPercent: 100, opacity: 0 });

    const enterTl = gsap.timeline({ paused: true });
    enterTl.to(ogSplit.chars, { yPercent: -100, opacity: 0, stagger: 0.05, duration: 0.4, ease: 'power2.inOut' })
           .to(cloneSplit.chars, { yPercent: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: 'power2.inOut' }, 0);

    const onMouseEnter = () => enterTl.play();
    const onMouseLeave = () => enterTl.reverse();

    link.addEventListener('mouseenter', onMouseEnter);
    link.addEventListener('mouseleave', onMouseLeave);

    link._onMouseEnter = onMouseEnter;
    link._onMouseLeave = onMouseLeave;
    link._enterTl = enterTl;
    link._ogSplit = ogSplit;
    link._cloneSplit = cloneSplit;
  });

  // --- Animation 14: FAQ dropdowns ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const header = item.querySelector('.faq-header');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon svg');

    if (header && content && icon) {
      gsap.set(content, { height: 0, overflow: 'hidden', display: 'block' });

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            const isActive = item.classList.contains('active');
            gsap.to(content, {
              height: isActive ? content.scrollHeight : 0,
              duration: 0.4,
              ease: 'power2.inOut'
            });
            gsap.to(icon, {
              rotation: isActive ? 45 : 0,
              duration: 0.4,
              ease: 'power2.inOut'
            });
          }
        });
      });

      observer.observe(item, { attributes: true });

      item._faqObserver = observer;
    }
  });

  return () => {
    console.log('Cleaning up GSAP animations and Lenis...');
    
    if (lenisInstance) {
      lenisInstance.destroy();
      lenisInstance = null;
    }

    activeSplitTexts.forEach((split) => {
      try {
        split.revert();
      } catch (e) {
        console.warn('SplitText revert error:', e);
      }
    });
    activeSplitTexts = [];

    // Clean up hoverBtns manually
    const hoverBtns = document.querySelectorAll('[data-gsap="btn"]');
    hoverBtns.forEach((link) => {
      if (link._onMouseEnter) {
        link.removeEventListener('mouseenter', link._onMouseEnter);
        delete link._onMouseEnter;
      }
      if (link._onMouseLeave) {
        link.removeEventListener('mouseleave', link._onMouseLeave);
        delete link._onMouseLeave;
      }
      if (link._enterTl) {
        link._enterTl.kill();
        delete link._enterTl;
      }
      if (link._ogSplit) {
        try { link._ogSplit.revert(); } catch (e) {}
        delete link._ogSplit;
      }
      if (link._cloneSplit) {
        try { link._cloneSplit.revert(); } catch (e) {}
        delete link._cloneSplit;
      }
      const origText = link.getAttribute('data-original-text');
      if (origText) {
        link.innerHTML = origText;
        link.removeAttribute('data-gsap-btn-initialized');
        link.style.position = '';
        link.style.overflow = '';
        link.style.display = '';
      }
    });

    faqItems.forEach((item) => {
      if (item._faqObserver) {
        item._faqObserver.disconnect();
      }
    });

    ScrollTrigger.getAll().forEach((trigger) => {
      trigger.kill();
    });
  };
}
