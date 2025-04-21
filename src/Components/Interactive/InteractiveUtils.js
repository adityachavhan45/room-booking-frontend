// InteractiveUtils.js
// This file contains utility functions for adding interactive effects to elements

/**
 * Adds a ripple effect to a button or clickable element
 * @param {HTMLElement} element - The element to add the ripple effect to
 */
export const addRippleEffect = (element) => {
  element.addEventListener('click', function(e) {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
};

/**
 * Adds a parallax effect to a background element
 * @param {HTMLElement} element - The element to add the parallax effect to
 * @param {number} speed - The speed of the parallax effect (default: 0.5)
 */
export const addParallaxEffect = (element, speed = 0.5) => {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    element.style.transform = `translateY(${scrollY * speed}px)`;
  });
};

/**
 * Adds a magnetic effect to an element
 * @param {HTMLElement} element - The element to add the magnetic effect to
 * @param {number} strength - The strength of the magnetic effect (default: 40)
 */
export const addMagneticEffect = (element, strength = 40) => {
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    element.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
  });
  
  element.addEventListener('mouseleave', () => {
    element.style.transform = 'translate(0px, 0px)';
  });
};

/**
 * Adds a scroll reveal effect to elements
 * @param {string} selector - The CSS selector for elements to reveal on scroll
 * @param {string} revealClass - The class to add when element is revealed
 */
export const addScrollReveal = (selector = '.scroll-reveal', revealClass = 'revealed') => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(revealClass);
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll(selector).forEach(element => {
    observer.observe(element);
  });
};

/**
 * Adds a tilt effect to an element
 * @param {HTMLElement} element - The element to add the tilt effect to
 * @param {number} maxTilt - The maximum tilt angle in degrees (default: 10)
 */
export const addTiltEffect = (element, maxTilt = 10) => {
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPercent = x / rect.width - 0.5;
    const yPercent = y / rect.height - 0.5;
    
    const rotateX = -yPercent * maxTilt;
    const rotateY = xPercent * maxTilt;
    
    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  element.addEventListener('mouseleave', () => {
    element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
};

/**
 * Adds a smooth scrolling effect to all anchor links
 */
export const addSmoothScrolling = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
};

/**
 * Initialize all interactive effects on page load
 */
export const initializeInteractiveEffects = () => {
  // Add ripple effect to buttons
  document.querySelectorAll('.btn, .ripple-effect').forEach(element => {
    addRippleEffect(element);
  });
  
  // Add scroll reveal effect
  addScrollReveal();
  
  // Add smooth scrolling
  addSmoothScrolling();
  
  // Add parallax effect to specific elements
  document.querySelectorAll('.parallax-bg').forEach(element => {
    addParallaxEffect(element, 0.3);
  });
  
  // Add magnetic effect to specific elements
  document.querySelectorAll('.magnetic-effect').forEach(element => {
    addMagneticEffect(element);
  });
  
  // Add tilt effect to specific elements
  document.querySelectorAll('.tilt-effect').forEach(element => {
    addTiltEffect(element);
  });
};
