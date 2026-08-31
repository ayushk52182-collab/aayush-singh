/* ============================
   EduSphere — app.js
   College E-Learning Platform
============================ */

(function () {
  'use strict';

  // ─── NAVBAR SCROLL ───────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // ─── HAMBURGER / MOBILE MENU ─────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  // ─── MODAL ───────────────────────────────────────────────────
  const overlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const signupForm = document.getElementById('signupForm');

  const openModal = () => { overlay.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const closeModal = () => { overlay.classList.remove('open'); document.body.style.overflow = ''; };

  const modalTriggers = [
    'loginBtn', 'enrollBtn', 'mobileEnroll',
    'heroCta', 'enrollBtn',
    'enroll-dsa', 'enroll-ml', 'enroll-calc',
    'enroll-chem', 'enroll-fin', 'enroll-web',
    'ctaSignup',
  ];

  modalTriggers.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', openModal);
  });

  modalClose.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Enroll buttons inside courses grid
  document.querySelectorAll('.btn-enroll').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openModal();
    });
  });

  // Form submit
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();

    if (!name || !email) return;

    const btn = document.getElementById('signupSubmit');
    btn.textContent = '✓ Account Created!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

    setTimeout(() => {
      closeModal();
      signupForm.reset();
      btn.textContent = 'Create Free Account';
      btn.style.background = '';
      showToast(`Welcome aboard, ${name.split(' ')[0]}! 🎉`);
    }, 1400);
  });

  // ─── TOAST ───────────────────────────────────────────────────
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = message;
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '28px',
      right: '28px',
      background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
      color: 'white',
      padding: '14px 24px',
      borderRadius: '12px',
      fontSize: '0.92rem',
      fontWeight: '600',
      fontFamily: 'Inter, sans-serif',
      boxShadow: '0 8px 32px rgba(99,102,241,0.4)',
      zIndex: '9999',
      transform: 'translateY(60px)',
      opacity: '0',
      transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
    });
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });
    setTimeout(() => {
      toast.style.transform = 'translateY(60px)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  // ─── HERO DEMO BUTTON ────────────────────────────────────────
  document.getElementById('heroDemo').addEventListener('click', () => {
    showToast('📺 Video demo coming soon! Stay tuned.');
  });

  // ─── CTA EXPLORE ─────────────────────────────────────────────
  document.getElementById('ctaExplore').addEventListener('click', () => {
    document.getElementById('courses').scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('viewAllCourses').addEventListener('click', () => {
    showToast('📚 Showing all 520 courses — loading catalogue...');
  });

  // ─── COURSE FILTER ───────────────────────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const courseCards = document.querySelectorAll('.course-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      courseCards.forEach(card => {
        const show = cat === 'all' || card.dataset.category === cat;
        card.classList.toggle('hidden', !show);
        // animate in
        if (show) {
          card.style.animation = 'fadeSlideUp 0.4s ease both';
          setTimeout(() => { card.style.animation = ''; }, 400);
        }
      });
    });
  });

  // ─── FOLLOW BUTTONS ──────────────────────────────────────────
  document.querySelectorAll('.btn-follow').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('following');
      btn.textContent = btn.classList.contains('following') ? '✓ Following' : 'Follow';
    });
  });

  // ─── COUNTER ANIMATION ───────────────────────────────────────
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2000;
    const step = 16;
    const steps = duration / step;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString('en-IN');
    }, step);
  }

  const statEls = document.querySelectorAll('.stat-num[data-target]');
  let countersRun = false;

  function runCounters() {
    if (countersRun) return;
    const heroRect = document.querySelector('.hero-stats').getBoundingClientRect();
    if (heroRect.top < window.innerHeight) {
      countersRun = true;
      statEls.forEach(el => animateCounter(el));
    }
  }

  window.addEventListener('scroll', runCounters, { passive: true });
  runCounters();

  // ─── PROGRESS BARS ANIMATION ─────────────────────────────────
  function animateProgressBars() {
    document.querySelectorAll('.progress-fill').forEach(bar => {
      const target = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => { bar.style.width = target; }, 400);
    });
  }
  setTimeout(animateProgressBars, 600);

  // ─── TESTIMONIALS SLIDER ─────────────────────────────────────
  const track = document.getElementById('testimonialsTrack');
  const dotsEl = document.getElementById('testiDots');
  const prevBtn = document.getElementById('testiPrev');
  const nextBtn = document.getElementById('testiNext');
  const slides = track.querySelectorAll('.testimonial-card');
  const total = slides.length;
  let current = 0;
  let autoSlide;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  });

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsEl.querySelectorAll('.testi-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function startAutoSlide() {
    autoSlide = setInterval(() => goTo(current + 1), 5000);
  }
  function stopAutoSlide() { clearInterval(autoSlide); }

  prevBtn.addEventListener('click', () => { stopAutoSlide(); goTo(current - 1); startAutoSlide(); });
  nextBtn.addEventListener('click', () => { stopAutoSlide(); goTo(current + 1); startAutoSlide(); });

  // Touch / swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; stopAutoSlide(); }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    startAutoSlide();
  }, { passive: true });

  startAutoSlide();

  // ─── SCROLL REVEAL ───────────────────────────────────────────
  const revealEls = document.querySelectorAll(
    '.cat-card, .course-card, .feature-card, .instructor-card, .testimonial-card, .section-header'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => io.observe(el));

  // ─── CATEGORY CARD CLICK ─────────────────────────────────────
  document.querySelectorAll('.cat-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      document.getElementById('courses').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ─── PREVIEW BUTTONS ─────────────────────────────────────────
  document.querySelectorAll('.preview-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      showToast('▶ Preview loading... Feature coming soon!');
    });
  });

  console.log('%c🎓 EduSphere', 'font-size:20px;font-weight:bold;color:#6366f1;');
  console.log('%cCollege E-Learning Platform — Built with ❤️', 'color:#9ca3c8;');
})();
