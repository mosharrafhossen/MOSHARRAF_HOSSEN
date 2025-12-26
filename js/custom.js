/* =====================================================
   Mobile Menu Toggle
===================================================== */
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
  });
}


/* =====================================================
   Footer Year
===================================================== */
const yearEl = document.getElementById('year');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


/* =====================================================
   Contact Form Validation
===================================================== */
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

if (form && formMsg) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

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
 * Show form message
 */
function showFormMessage(text, color) {
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
const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length > 0) {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2
    }
  );

  revealElements.forEach(el => observer.observe(el));
}
