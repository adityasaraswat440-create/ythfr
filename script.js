/* ============================================
   CINEMATIC STYLE — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------
     Price Calculator
  ------------------------------------------ */
  const slider = document.getElementById('price-slider');
  const priceDisplay = document.getElementById('calc-price');
  const unitDisplay = document.getElementById('calc-units');

  if (slider && priceDisplay) {
    const RATE = 125; // dollars per unit

    const updatePrice = () => {
      const val = parseInt(slider.value, 10);
      const price = val * RATE;
      priceDisplay.textContent = `$${price.toLocaleString()}`;
      if (unitDisplay) {
        unitDisplay.textContent = val;
      }
      // Update slider fill
      const pct = ((val - slider.min) / (slider.max - slider.min)) * 100;
      slider.style.background = `linear-gradient(to right, #7C3AED ${pct}%, #374151 ${pct}%)`;
    };

    slider.addEventListener('input', updatePrice);
    updatePrice(); // initial
  }

  /* ------------------------------------------
     Hero Background Text – static
  ------------------------------------------ */
  // The text animation on scroll has been removed per request.

  /* ------------------------------------------
     Scroll Reveal (Intersection Observer)
  ------------------------------------------ */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealEls.forEach(el => observer.observe(el));
  }

  /* ------------------------------------------
     Mobile Nav Toggle
  ------------------------------------------ */
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.querySelector('.nav__links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.style.display === 'flex';
      navLinks.style.display = isOpen ? 'none' : 'flex';
      navLinks.style.position = 'fixed';
      navLinks.style.top = '0';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.height = '100vh';
      navLinks.style.flexDirection = 'column';
      navLinks.style.alignItems = 'center';
      navLinks.style.justifyContent = 'center';
      navLinks.style.background = 'rgba(5,5,5,0.97)';
      navLinks.style.zIndex = '999';
      navLinks.style.gap = '2.5rem';

      if (isOpen) {
        navLinks.removeAttribute('style');
      }
    });
  }

  /* ------------------------------------------
     Pause cube on hover
  ------------------------------------------ */
  const cubeWrapper = document.querySelector('.cube-wrapper');
  if (cubeWrapper) {
    cubeWrapper.addEventListener('mouseenter', () => {
      cubeWrapper.style.animationPlayState = 'paused';
    });
    cubeWrapper.addEventListener('mouseleave', () => {
      cubeWrapper.style.animationPlayState = 'running';
    });
  }

  /* ------------------------------------------
     Free Pricing Popup & Confetti
  ------------------------------------------ */
  const pricingLink = document.getElementById('nav-pricing-link');
  const popup = document.getElementById('free-popup');
  const closeBtn = document.getElementById('close-popup');

  if (pricingLink && popup) {
    pricingLink.addEventListener('click', (e) => {
      e.preventDefault();
      // Show popup
      popup.classList.add('is-active');

      // Trigger party popper confetti explode
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          zIndex: 10000,
          colors: ['#06B6D4', '#EC4899', '#7C3AED', '#FFFFFF']
        });
      }
    });

    closeBtn.addEventListener('click', () => {
      popup.classList.remove('is-active');
    });

    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.classList.remove('is-active');
      }
    });
  }

});
