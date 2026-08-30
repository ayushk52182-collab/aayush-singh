/* =============================================================
   PARUL UNIVERSITY — Main JavaScript Application
   ============================================================= */

'use strict';

// ===== COURSES DATABASE =====
const coursesData = [
  // Engineering & Tech
  { id: 'btech-cse', title: 'B.Tech Computer Science & Engineering', cat: 'engineering', icon: '💻', degree: 'B.Tech · 4 Years', desc: 'Master full-stack development, AI, machine learning, cloud computing, and software engineering with industry mentors.', package: '₹60 LPA Highest', duration: '4 Years', seats: '600 Seats', careers: ['Software Engineer', 'Data Scientist', 'ML Engineer', 'Cloud Architect'] },
  { id: 'btech-ai', title: 'B.Tech Artificial Intelligence & ML', cat: 'engineering', icon: '🤖', degree: 'B.Tech · 4 Years', desc: 'Deep learning, neural networks, computer vision, and natural language processing at an advanced level.', package: '₹55 LPA Highest', duration: '4 Years', seats: '300 Seats', careers: ['AI Researcher', 'ML Lead', 'Computer Vision Engineer', 'NLP Scientist'] },
  { id: 'btech-it', title: 'B.Tech Information Technology', cat: 'engineering', icon: '🌐', degree: 'B.Tech · 4 Years', desc: 'Networking, cybersecurity, database systems, web technologies, and enterprise software solutions.', package: '₹42 LPA Highest', duration: '4 Years', seats: '300 Seats', careers: ['Network Engineer', 'Cybersecurity Analyst', 'IT Manager', 'Systems Architect'] },
  { id: 'btech-mech', title: 'B.Tech Mechanical Engineering', cat: 'engineering', icon: '⚙️', degree: 'B.Tech · 4 Years', desc: 'Thermodynamics, robotics, CAD/CAM, manufacturing, and automotive engineering with hands-on labs.', package: '₹24 LPA Highest', duration: '4 Years', seats: '240 Seats', careers: ['Design Engineer', 'Production Manager', 'Robotics Engineer', 'Automotive Designer'] },
  { id: 'btech-ec', title: 'B.Tech Electronics & Communication', cat: 'engineering', icon: '📡', degree: 'B.Tech · 4 Years', desc: 'VLSI design, signal processing, embedded systems, IoT, and wireless communications technology.', package: '₹28 LPA Highest', duration: '4 Years', seats: '240 Seats', careers: ['VLSI Engineer', 'IoT Developer', 'Signal Processing Engineer', 'Telecom Expert'] },
  { id: 'mtech-cs', title: 'M.Tech Computer Science', cat: 'engineering', icon: '🔬', degree: 'M.Tech · 2 Years', desc: 'Advanced algorithms, distributed systems, research methodology, and specializations in AI, security, or data science.', package: '₹45 LPA Highest', duration: '2 Years', seats: '120 Seats', careers: ['Senior Engineer', 'Tech Lead', 'Research Scientist', 'CTO'] },

  // Management
  { id: 'mba', title: 'MBA (General Management)', cat: 'management', icon: '📊', degree: 'MBA · 2 Years', desc: 'Comprehensive business leadership with specializations in finance, marketing, HR, operations, and strategy.', package: '₹32 LPA Highest', duration: '2 Years', seats: '360 Seats', careers: ['Business Analyst', 'Marketing Director', 'Finance Manager', 'Consultant'] },
  { id: 'bba', title: 'BBA (Bachelor of Business Admin)', cat: 'management', icon: '🏢', degree: 'BBA · 3 Years', desc: 'Business fundamentals, entrepreneurship, digital marketing, accounting, and organizational management.', package: '₹18 LPA Highest', duration: '3 Years', seats: '240 Seats', careers: ['Business Developer', 'Marketing Executive', 'Entrepreneur', 'Operations Manager'] },
  { id: 'mba-fin', title: 'MBA Finance & Banking', cat: 'management', icon: '💹', degree: 'MBA · 2 Years', desc: 'Investment banking, portfolio management, financial modeling, risk analysis, and capital markets.', package: '₹35 LPA Highest', duration: '2 Years', seats: '120 Seats', careers: ['Investment Banker', 'Portfolio Manager', 'Financial Analyst', 'Risk Manager'] },

  // Medical & Health
  { id: 'mbbs', title: 'MBBS (Bachelor of Medicine)', cat: 'medical', icon: '🏥', degree: 'MBBS · 5.5 Years', desc: 'Comprehensive medical education with anatomy, physiology, clinical rotations, and specialized medical training.', package: '₹40 LPA Highest', duration: '5.5 Years', seats: '150 Seats', careers: ['Doctor', 'Surgeon', 'Medical Researcher', 'Specialist Physician'] },
  { id: 'bpharm', title: 'B.Pharm (Pharmacy)', cat: 'medical', icon: '💊', degree: 'B.Pharm · 4 Years', desc: 'Pharmaceutical chemistry, pharmacology, drug formulation, clinical pharmacy, and quality assurance.', package: '₹25 LPA Highest', duration: '4 Years', seats: '180 Seats', careers: ['Pharmacist', 'Drug Safety Officer', 'Clinical Researcher', 'Formulation Scientist'] },
  { id: 'bpt', title: 'B.Sc Physiotherapy (BPT)', cat: 'medical', icon: '🏃', degree: 'BPT · 4.5 Years', desc: 'Physical rehabilitation, sports medicine, neurological therapy, musculoskeletal assessment and treatment.', package: '₹20 LPA Highest', duration: '4.5 Years', seats: '120 Seats', careers: ['Physiotherapist', 'Sports Medicine Therapist', 'Rehabilitation Specialist'] },

  // Law & Arts
  { id: 'ballb', title: 'BA LLB (Integrated Law)', cat: 'law', icon: '⚖️', degree: 'BA LLB · 5 Years', desc: 'Constitutional law, criminal law, corporate law, intellectual property, and court practice training.', package: '₹28 LPA Highest', duration: '5 Years', seats: '120 Seats', careers: ['Lawyer', 'Corporate Counsel', 'Judge', 'Legal Consultant'] },
  { id: 'ba', title: 'BA (Liberal Arts & Humanities)', cat: 'law', icon: '🎓', degree: 'BA · 3 Years', desc: 'Political science, sociology, psychology, economics, literature, and inter-disciplinary social sciences.', package: '₹14 LPA Highest', duration: '3 Years', seats: '180 Seats', careers: ['Civil Services', 'Social Worker', 'Journalist', 'Policy Analyst'] },

  // Design & Media
  { id: 'bdes', title: 'B.Des (Product & UX Design)', cat: 'design', icon: '🎨', degree: 'B.Des · 4 Years', desc: 'User experience design, graphic design, product prototyping, branding, and digital interface creation.', package: '₹30 LPA Highest', duration: '4 Years', seats: '120 Seats', careers: ['UX Designer', 'Product Designer', 'Brand Strategist', 'Creative Director'] },
  { id: 'bfa', title: 'BCA (Computer Applications)', cat: 'engineering', icon: '📱', degree: 'BCA · 3 Years', desc: 'Programming fundamentals, web development, mobile apps, database management, and software design.', package: '₹22 LPA Highest', duration: '3 Years', seats: '180 Seats', careers: ['App Developer', 'Web Developer', 'Software Analyst', 'IT Executive'] },
  { id: 'bjmc', title: 'BJMC (Journalism & Mass Comm.)', cat: 'design', icon: '📰', degree: 'BJMC · 3 Years', desc: 'Media production, digital journalism, public relations, advertising, film making, and broadcast media.', package: '₹18 LPA Highest', duration: '3 Years', seats: '120 Seats', careers: ['Journalist', 'PR Manager', 'Content Creator', 'Media Producer'] },
];

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  initBgParticles();
  initNavbar();
  initTheme();
  initMobileMenu();
  initCounters();
  renderCourses(coursesData);
  initCourseFilters();
  initChatbot();
  initModal();
  initAdmissionForm();
  initRevealOnScroll();
  initSmoothScroll();
});

// ===== 1. BACKGROUND PARTICLES =====
function initBgParticles() {
  const container = document.getElementById('bgParticles');
  if (!container) return;
  const colors = ['#7c3aed', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b'];
  const count = window.innerWidth < 768 ? 8 : 15;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 120 + 40;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      left: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 20 + 15}s;
      animation-delay: ${Math.random() * 10}s;
      filter: blur(${size / 2}px);
    `;
    container.appendChild(p);
  }
}

// ===== 2. NAVBAR SCROLL =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlight
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ===== 3. THEME TOGGLE =====
function initTheme() {
  const btn = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const html = document.documentElement;
  const saved = localStorage.getItem('pu_theme') || 'light';
  applyTheme(saved);

  btn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('pu_theme', next);
  });

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    icon.textContent = theme === 'dark' ? '🌙' : '☀️';
  }
}

// ===== 4. MOBILE MENU =====
function initMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
    });
  });
}

// ===== 5. ANIMATED COUNTERS =====
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'));
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1800;
      const step = 16;
      const increment = target / (duration / step);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.textContent = target >= 1000
            ? (target / 1000).toFixed(0) + ',000' + suffix
            : target + suffix;
          clearInterval(timer);
        } else {
          const val = Math.ceil(current);
          el.textContent = val >= 1000
            ? (val / 1000).toFixed(0) + ',000' + suffix
            : val + suffix;
        }
      }, step);

      observer.unobserve(el);
    });
  }, { threshold: 0.3 });

  counters.forEach(c => observer.observe(c));
}

// ===== 6. RENDER COURSES =====
function renderCourses(list) {
  const grid = document.getElementById('courseGrid');
  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-secondary);">
        <div style="font-size: 3rem; margin-bottom: 16px;">🔍</div>
        <h3>No courses found</h3>
        <p>Try different keywords or browse all programs.</p>
      </div>`;
    return;
  }

  grid.innerHTML = list.map(c => `
    <div class="course-card reveal" data-id="${c.id}">
      <div class="course-card-top">
        <div class="course-icon" style="background: rgba(124,58,237,0.12);">${c.icon}</div>
        <span class="course-badge">${c.degree}</span>
      </div>
      <h3 class="course-title">${c.title}</h3>
      <p class="course-desc">${c.desc}</p>
      <div class="course-meta">
        <span class="course-meta-item">⏱️ ${c.duration}</span>
        <span class="course-meta-item">🪑 ${c.seats}</span>
      </div>
      <div class="course-footer">
        <span class="course-package">${c.package}</span>
        <button class="course-btn" onclick="openCourseModal('${c.id}')">View Details</button>
      </div>
    </div>
  `).join('');

  // Re-run reveal observer for new cards
  setTimeout(initRevealOnScroll, 50);
}

// ===== 7. COURSE FILTERS =====
function initCourseFilters() {
  const searchInput = document.getElementById('courseSearch');
  const filterBtns = document.querySelectorAll('.filter-btn');
  let currentCat = 'all';
  let currentQuery = '';

  function applyFilters() {
    const filtered = coursesData.filter(c => {
      const matchCat = currentCat === 'all' || c.cat === currentCat;
      const matchQ = c.title.toLowerCase().includes(currentQuery) ||
                     c.desc.toLowerCase().includes(currentQuery);
      return matchCat && matchQ;
    });
    renderCourses(filtered);
  }

  searchInput.addEventListener('input', (e) => {
    currentQuery = e.target.value.toLowerCase().trim();
    applyFilters();
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCat = btn.getAttribute('data-cat');
      applyFilters();
    });
  });
}

// ===== 8. COURSE MODAL =====
function openCourseModal(id) {
  const course = coursesData.find(c => c.id === id);
  if (!course) return;

  const html = `
    <div style="margin-bottom: 8px;">
      <span style="font-size: 2rem;">${course.icon}</span>
    </div>
    <div style="display: inline-block; padding: 4px 14px; background: rgba(124,58,237,0.12); border: 1px solid rgba(124,58,237,0.2); border-radius: 50px; font-size: 0.78rem; font-weight: 700; color: #a78bfa; margin-bottom: 12px;">${course.degree}</div>
    <h2 style="font-family: Outfit, sans-serif; font-size: 1.5rem; font-weight: 800; margin-bottom: 12px; line-height: 1.3;">${course.title}</h2>
    <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.7; margin-bottom: 20px;">${course.desc}</p>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 24px;">
      <div style="text-align: center; padding: 14px; background: var(--bg-tertiary); border-radius: 10px;">
        <div style="font-weight: 700; font-size: 0.95rem;">${course.duration}</div>
        <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 4px;">Duration</div>
      </div>
      <div style="text-align: center; padding: 14px; background: var(--bg-tertiary); border-radius: 10px;">
        <div style="font-weight: 700; font-size: 0.95rem;">${course.seats}</div>
        <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 4px;">Intake</div>
      </div>
      <div style="text-align: center; padding: 14px; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.2); border-radius: 10px;">
        <div style="font-weight: 800; font-size: 0.9rem; color: #10b981;">${course.package}</div>
        <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 4px;">Package</div>
      </div>
    </div>

    <h4 style="font-size: 0.85rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 12px;">Career Paths</h4>
    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px;">
      ${course.careers.map(c => `<span style="padding: 6px 14px; background: rgba(124,58,237,0.1); border: 1px solid rgba(124,58,237,0.2); border-radius: 50px; font-size: 0.8rem; color: #a78bfa;">${c}</span>`).join('')}
    </div>

    <button class="btn-primary full-width" onclick="document.getElementById('modalOverlay').classList.remove('open'); document.getElementById('admissions').scrollIntoView({behavior:'smooth'});">
      <span>Apply for This Program</span>
    </button>
  `;

  document.getElementById('modalContent').innerHTML = html;
  document.getElementById('modalOverlay').classList.add('open');
}

// ===== 9. MODAL =====
function initModal() {
  const overlay = document.getElementById('modalOverlay');
  const closeBtn = document.getElementById('modalClose');

  closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('open');
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') overlay.classList.remove('open');
  });
}

// ===== 10. CHATBOT =====
function initChatbot() {
  const fab = document.getElementById('chatFab');
  const panel = document.getElementById('chatPanel');
  const closeBtn = document.getElementById('chatClose');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');
  const notif = document.getElementById('chatNotif');
  const fabIcon = document.getElementById('chatFabIcon');

  fab.addEventListener('click', () => {
    panel.classList.toggle('open');
    notif.style.display = 'none';
    if (panel.classList.contains('open')) {
      fabIcon.textContent = '✕';
      input.focus();
    } else {
      fabIcon.textContent = '💬';
    }
  });

  closeBtn.addEventListener('click', () => {
    panel.classList.remove('open');
    fabIcon.textContent = '💬';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;
    addMessage(query, 'user');
    input.value = '';
    setTimeout(() => addMessage(getBotReply(query.toLowerCase()), 'bot'), 600);
  });

  function addMessage(text, type) {
    const msgs = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = `chat-msg ${type}-msg`;
    div.innerHTML = text;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function getBotReply(q) {
    if (q.includes('package') || q.includes('salary') || q.includes('lpa') || q.includes('placement')) {
      return '💰 Parul University offers a <strong>highest package of ₹60 LPA</strong> with an average of ₹8.5 LPA. Over 500 companies recruit from our campus every year!';
    } else if (q.includes('course') || q.includes('program') || q.includes('degree')) {
      return '📚 We offer <strong>200+ programs</strong> including B.Tech, MBA, MBBS, B.Pharm, LLB, B.Des and many more. Scroll up to explore all courses!';
    } else if (q.includes('student') || q.includes('how many')) {
      return '🎓 Parul University is home to <strong>1,00,000+ active students</strong> from 50+ countries. It\'s one of the most vibrant campuses in India!';
    } else if (q.includes('fee') || q.includes('tuition') || q.includes('cost')) {
      return '💳 Tuition fees vary by program. B.Tech starts from ₹1.2L/year, MBA from ₹80K/year, and MBBS at competitive rates. Contact admissions for exact figures.';
    } else if (q.includes('admission') || q.includes('apply') || q.includes('how to')) {
      return '📝 Admissions for 2026-27 are <strong>OPEN</strong>! Visit the Admissions section on this page or call <strong>1800-123-1456</strong> (Toll Free).';
    } else if (q.includes('location') || q.includes('address') || q.includes('where')) {
      return '📍 Parul University is located at <strong>P.O. Limda, Waghodia Road, Vadodara, Gujarat – 391760</strong>. A 200+ acre campus!';
    } else if (q.includes('ranking') || q.includes('rank') || q.includes('naac')) {
      return '🏆 Parul University is <strong>NAAC Accredited</strong>, UGC Recognized, and AICTE Approved. We are ranked among the top universities in India!';
    } else if (q.includes('hostel') || q.includes('accommodation') || q.includes('stay')) {
      return '🏨 Yes! We offer <strong>on-campus hostel facilities</strong> for both boys and girls with modern amenities, dining halls, and 24/7 security.';
    } else {
      return '😊 Thanks for reaching out! For specific queries, contact us at <strong>admissions@paruluniversity.ac.in</strong> or call <strong>1800-123-1456</strong>. Our team is happy to help!';
    }
  }
}

// ===== 11. ADMISSION FORM =====
function initAdmissionForm() {
  const form = document.getElementById('admissionForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('aName').value;
    const btn = document.getElementById('submitInquiry');
    btn.disabled = true;
    btn.innerHTML = '<span>Submitting...</span>';

    setTimeout(() => {
      document.getElementById('modalContent').innerHTML = `
        <div style="text-align: center; padding: 20px 0;">
          <div style="font-size: 4rem; margin-bottom: 20px;">🎉</div>
          <h2 style="font-family: Outfit; font-weight: 800; font-size: 1.6rem; margin-bottom: 12px;">Welcome, ${name}!</h2>
          <p style="color: var(--text-secondary); margin-bottom: 28px;">Your inquiry has been submitted. An admissions counselor will contact you within <strong>24 hours</strong>.</p>
          <div style="padding: 20px; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.2); border-radius: 12px; margin-bottom: 24px;">
            <p style="font-weight: 700; color: #10b981; font-size: 1rem;">📞 Need immediate help?</p>
            <p style="color: var(--text-secondary); font-size: 0.88rem; margin-top: 6px;">Call us: <strong>1800-123-1456</strong> (Toll Free, Mon–Sat, 9AM–6PM)</p>
          </div>
          <button class="btn-primary full-width" onclick="document.getElementById('modalOverlay').classList.remove('open')">
            <span>Done</span>
          </button>
        </div>
      `;
      document.getElementById('modalOverlay').classList.add('open');
      form.reset();
      btn.disabled = false;
      btn.innerHTML = '<span>Submit Inquiry</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
    }, 1200);
  });
}

// ===== 12. REVEAL ON SCROLL =====
function initRevealOnScroll() {
  const reveals = document.querySelectorAll('.reveal:not(.visible)');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
}

// ===== 13. SMOOTH SCROLL =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById('navbar').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// Add reveal class to elements for scroll animation
window.addEventListener('load', () => {
  const animatables = document.querySelectorAll('.stat-block, .contact-card, .testimonial-card, .a-step, .facility-chip, .campus-mini-card');
  animatables.forEach(el => el.classList.add('reveal'));
  initRevealOnScroll();
});
