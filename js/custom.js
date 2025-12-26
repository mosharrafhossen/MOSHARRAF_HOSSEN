/* =====================================================
   DOM Helpers
===================================================== */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


/* =====================================================
   Mobile Menu Toggle
===================================================== */
const navToggle = $('#navToggle');
const nav = $('#nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
  });

  // Close menu on link click (mobile UX)
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('show');
    });
  });
}


/* =====================================================
   Footer Year
===================================================== */
const yearEl = $('#year');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


/* =====================================================
   Contact Form Validation
===================================================== */
const form = $('#contactForm');
const formMsg = $('#formMsg');

if (form && formMsg) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]')?.value.trim();
    const email = form.querySelector('[name="email"]')?.value.trim();
    const message = form.querySelector('[name="message"]')?.value.trim();

    if (!name || !email || !message) {
      showFormMessage('Please fill all fields!', 'red');
      return;
    }

    if (!isValidEmail(email)) {
      showFormMessage('Please enter a valid email address!', 'red');
      return;
    }

    showFormMessage('Message sent successfully!', 'green');
    form.reset();
  });
}

/**
 * Show form message safely
 */
function showFormMessage(text, color) {
  if (!formMsg) return;
  formMsg.textContent = text;
  formMsg.style.color = color;
}

/**
 * Email validation helper
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


/* =====================================================
   Scroll Reveal Animation
===================================================== */
const revealElements = $$('.reveal');

if (revealElements.length > 0) {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for old browsers
    revealElements.forEach(el => el.classList.add('active'));
  }
}
