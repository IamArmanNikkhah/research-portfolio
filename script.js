/* =========================================================
   Minimal JS: mobile nav toggle, active-section highlight,
   and dynamic year in footer. No external dependencies.
   ========================================================= */

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when a link is clicked (mobile)
  siteNav.addEventListener('click', (e) => {
    if (e.target.matches('a')) {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Active section highlighting in nav (IntersectionObserver)
const sections = document.querySelectorAll('main section[id], .hero[id]');
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

const sectionMap = {};
sections.forEach(sec => sectionMap[`#${sec.id}`] = sec);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = `#${entry.target.id}`;
    const link = document.querySelector(`.site-nav a[href="${id}"]`);
    if (!link) return;

    if (entry.isIntersecting) {
      navLinks.forEach(l => l.removeAttribute('aria-current'));
      link.setAttribute('aria-current', 'page');
    }
  });
}, {
  rootMargin: '-40% 0px -55% 0px',
  threshold: 0.01
});

sections.forEach(sec => observer.observe(sec));

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* Accessibility: prefer-reduced-motion friendly smooth scroll
   (native CSS smooth scroll is used; here we ensure focus management). */
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    const tgt = document.querySelector(href);
    if (!tgt) return;
    // Allow default smooth behavior, then move focus for a11y
    setTimeout(() => tgt.setAttribute('tabindex', '-1'), 0);
    setTimeout(() => tgt.focus({ preventScroll: true }), 400);
  });
});
