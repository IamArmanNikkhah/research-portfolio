/* =====================================================================
   Minimal interactivity: mobile nav, recruiter mode, copy email, mailto form
   ===================================================================== */

// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Recruiter Mode: hides detail-heavy sections for quick scanning
const recruiterBtn = document.getElementById('recruiterModeBtn');
if (recruiterBtn) {
  recruiterBtn.addEventListener('click', () => {
    const pressed = recruiterBtn.getAttribute('aria-pressed') === 'true';
    const next = !pressed;
    recruiterBtn.setAttribute('aria-pressed', String(next));
    document.documentElement.classList.toggle('recruiter-mode', next);
    recruiterBtn.textContent = next ? 'Recruiter Mode: On' : 'Recruiter Mode';
  });
}

// Back to top (progressive enhancement)
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Year + (optional) last updated date
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Copy email to clipboard
const copyBtn = document.getElementById('copyEmailBtn');
const copyStatus = document.getElementById('copyEmailStatus');
const emailLink = document.getElementById('emailLink');
if (copyBtn && copyStatus && emailLink) {
  copyBtn.addEventListener('click', async () => {
    const email = emailLink.textContent.trim();
    try {
      await navigator.clipboard.writeText(email);
      copyStatus.textContent = 'Email copied to clipboard.';
      setTimeout(() => (copyStatus.textContent = ''), 3000);
    } catch {
      copyStatus.textContent = 'Press Ctrl/Cmd+C to copy.';
      setTimeout(() => (copyStatus.textContent = ''), 3000);
    }
  });
}

// Contact form -> opens a prefilled mailto (no backend required)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = (document.getElementById('msg').value || '').trim();
    const subject = encodeURIComponent("Summer ’26 Internship Inquiry");
    const body = encodeURIComponent(msg.length ? msg : "Hello Arman,\n\nI'm reaching out regarding a Summer ’26 opportunity.\n\n—");
    const mailto = `mailto:arman.nikkhah@utdallas.edu?subject=${subject}&body=${body}`;
    window.location.href = mailto;
  });
}
