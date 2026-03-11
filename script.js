/* ============================================================
 *  RAZKAR STUDIO — Portfolio Script
 *  Features:
 *    - Scroll-triggered fade-in animations
 *    - Mobile nav toggle
 *    - Footer year auto-update
 *  ============================================================ */

// ---- 1. FOOTER YEAR ----
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ---- 1b. EMAIL LINK (assembled in JS to avoid scraper/Cloudflare mangling) ----
const emailLink = document.getElementById('email-link');
if (emailLink) {
  const addr = 'razkar.studio' + '@' + 'proton.me';
  emailLink.href = 'mailto:' + addr;
}

// ---- 2. SCROLL FADE-IN ----
const fadeEls = document.querySelectorAll('.fade-in');

// Stagger cards and badges
document.querySelectorAll('.project-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 80}ms`;
});
document.querySelectorAll('.skill-badge').forEach((el, i) => {
  el.style.transitionDelay = `${i * 50}ms`;
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px',   // trigger as soon as any part enters the viewport
    threshold: 0.05,
  });

  fadeEls.forEach((el) => observer.observe(el));

  // Fallback: after a short delay, make anything still invisible visible
  // (handles iframes / preview environments where observer may not fire)
  setTimeout(() => {
    fadeEls.forEach((el) => el.classList.add('visible'));
  }, 600);

} else {
  // No IntersectionObserver support — just show everything
  fadeEls.forEach((el) => el.classList.add('visible'));
}

// ---- 3. MOBILE NAV TOGGLE ----
const navToggle = document.querySelector('.nav-toggle');
const navDrawer = document.getElementById('nav-drawer');

if (navToggle && navDrawer) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navDrawer.classList.toggle('open', isOpen);
  });

  navDrawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navDrawer.classList.remove('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navDrawer.contains(e.target)) {
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navDrawer.classList.remove('open');
    }
  });
}

// ---- 4. NAV SCROLL SHADOW ----
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.borderBottomColor = window.scrollY > 20
    ? 'rgba(124, 58, 237, 0.3)'
    : '';
  }, { passive: true });
}
