// =====================================================
// Mobile Menu Toggle
// =====================================================
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  nav.classList.toggle('show');
});


// =====================================================
// Footer Year
// =====================================================
const yearEl = document.getElementById('year');
yearEl.textContent = new Date().getFullYear();


// =====================================================
// Contact Form
// =====================================================
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Simple form validation
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    formMsg.textContent = "Please fill all fields!";
    formMsg.style.color = "red";
    return;
  }

  formMsg.textContent = "Message sent successfully!";
  formMsg.style.color = "green";

  // Clear form
  form.reset();
});


// =====================================================
// Scroll Reveal
// =====================================================
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.classList.add('active');
        observer.unobserve(entry);
      }
    });
  },
  {
    threshold: 0.2
  }
);

revealElements.forEach(el => observer.observe(el));
