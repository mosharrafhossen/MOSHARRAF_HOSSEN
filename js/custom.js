/* =====================================================
   DOM HELPERS
   Short utility functions for cleaner DOM selection
===================================================== */

/**
 * Selects a single DOM element
 * @param {string} selector - CSS selector
 * @returns {Element|null}
 */
const $ = (selector) => document.querySelector(selector);

/**
 * Selects multiple DOM elements
 * @param {string} selector - CSS selector
 * @returns {NodeListOf<Element>}
 */
const $$ = (selector) => document.querySelectorAll(selector);


/* =====================================================
   MOBILE MENU TOGGLE (ACCESSIBLE & UX FRIENDLY)
===================================================== */

// Mobile menu toggle button
const navToggle = $('#navToggle');

// Navigation container
const nav = $('#nav');

if (navToggle && nav) {

  /**
   * Toggle mobile navigation visibility
   * Updates aria-expanded for accessibility
   */
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('show');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  /**
   * Close menu when a navigation link is clicked
   * Improves mobile user experience
   */
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /**
   * Close mobile menu when clicking outside
   * Prevents menu staying open unintentionally
   */
  document.addEventListener('click', (e) => {
    if (
      nav.classList.contains('show') &&
      !nav.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      nav.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}


/* =====================================================
   FOOTER YEAR (AUTO UPDATE)
===================================================== */

// Footer year span element
const yearEl = $('#year');

if (yearEl) {
  // Set current year dynamically
  yearEl.textContent = new Date().getFullYear();
}

/* =====================================================
   DARK MODE TOGGLE (PERSISTENT USING LOCAL STORAGE)
===================================================== */

// Theme toggle button
const themeToggle = $('#themeToggle');

if (themeToggle) {

  // Retrieve previously saved theme
  const savedTheme = localStorage.getItem('theme');

  /**
   * Apply saved theme on page load
   */
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀️';
    themeToggle.setAttribute('aria-pressed', 'true'); // ✅ added
  } else {
    themeToggle.setAttribute('aria-pressed', 'false'); // ✅ added
  }

  /**
   * Toggle dark/light mode
   * Save user preference to localStorage
   */
  themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');

    themeToggle.textContent = isDark ? '☀️' : '🌙';

    // ✅ THIS is the line you asked about
    themeToggle.setAttribute('aria-pressed', isDark);

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}


/* =====================================================
   CONTACT FORM VALIDATION (CLIENT-SIDE)
===================================================== */

// Contact form element
const form = $('#contactForm');

// Feedback message container
const formMsg = $('#formMsg');

if (form && formMsg) {

  /**
   * Handle form submission
   */
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission

    // Extract and sanitize input values
    const name = form.querySelector('[name="name"]')?.value.trim();
    const email = form.querySelector('[name="email"]')?.value.trim();
    const message = form.querySelector('[name="message"]')?.value.trim();

    // Validate required fields
    if (!name || !email || !message) {
      showFormMessage('Please fill all fields!', 'red');
      return;
    }

    // Validate email format
    if (!isValidEmail(email)) {
      showFormMessage('Please enter a valid email address!', 'red');
      return;
    }

    // Success feedback
    showFormMessage('Message sent successfully!', 'green');

    // Reset form fields
    form.reset();
  });
}

/**
 * Display feedback message below the form
 * @param {string} text - Message text
 * @param {string} color - Text color
 */
function showFormMessage(text, color) {
  if (!formMsg) return;
  formMsg.textContent = text;
  formMsg.style.color = color;
}

/**
 * Email validation using regular expression
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


/* =====================================================
   SCROLL REVEAL ANIMATION (PERFORMANCE OPTIMIZED)
===================================================== */

// Elements to animate on scroll
const revealElements = $$('.reveal');

if (revealElements.length > 0) {

  /**
   * Use IntersectionObserver if supported
   * Improves performance vs scroll event
   */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            obs.unobserve(entry.target); // Animate once
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe each reveal element
    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('active'));
  }
}





const projectCards = document.querySelectorAll('.project.reveal');

projectCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.15}s`;
});



/* =====================================================
   BACK TO TOP BUTTON
===================================================== */

// Back-to-top button element
const backToTopBtn = $('#backToTop');

if (backToTopBtn) {

  /**
   * Toggle button visibility based on scroll position
   */
  window.addEventListener('scroll', () => {
    backToTopBtn.style.display =
      window.scrollY > 300 ? 'block' : 'none';
  });

  /**
   * Smooth scroll to top on click
   */
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}




/* =====================================================
   WORD BY WORD TEXT REVEAL (LEFT TO RIGHT)
===================================================== */

const wordAnimatedElements = document.querySelectorAll(
  '[data-animate="words"]'
);

wordAnimatedElements.forEach((el) => {
  const words = el.textContent.trim().split(/\s+/);

  el.textContent = '';

  words.forEach((word, index) => {
    const span = document.createElement('span');
    span.className = 'word';
    span.textContent = word;

    // spacing control
    span.style.marginRight = '0.4rem';

    // stagger animation
    span.style.animationDelay = `${index * 0.1}s`;

    el.appendChild(span);
  });
});



/* =====================================================
   SKILLS – SCROLL TRIGGERED ANIMATION (ADVANCED)
===================================================== */

const skillItems = document.querySelectorAll('.skill');

if ('IntersectionObserver' in window && skillItems.length) {
  const skillObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry, index) => {
        if (!entry.isIntersecting) return;

        const skill = entry.target;
        const bar = skill.querySelector('.bar span');
        const target = bar.dataset.skill;

        // Stagger reveal
        setTimeout(() => {
          skill.classList.add('active');
          bar.style.width = `${target}%`;
        }, index * 180);

        observer.unobserve(skill);
      });
    },
    {
      threshold: 0.35,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  skillItems.forEach(skill => skillObserver.observe(skill));
}

