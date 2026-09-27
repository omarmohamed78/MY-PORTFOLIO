/* ============================================================
   OMAR MOHAMED — script.js v3
   ============================================================ */

/* 1 ── LOADER */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('off'), 700);
});

/* 2 ── YEAR */
document.getElementById('yr').textContent = new Date().getFullYear();

/* 3 ── NAVBAR */
const nav = document.getElementById('navbar');
const highlightNav = () => {
  nav.classList.toggle('on', window.scrollY > 60);
  // active link
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 160) current = s.id; });
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('act', l.getAttribute('href') === '#' + current);
  });
};
window.addEventListener('scroll', highlightNav, { passive: true });

/* 4 ── TYPED TEXT */
const phrases = [
  'Full Stack .NET Developer',
  'Front-End Specialist',
  'ASP.NET Core Developer',
  'PHP & MySQL Developer',
  'Problem Solver 🚀',
];
let pi = 0, ci = 0, del = false;
const el = document.getElementById('typed');
function type() {
  const p = phrases[pi];
  el.textContent = del ? p.slice(0, --ci) : p.slice(0, ++ci);
  if (!del && ci === p.length) { del = true; setTimeout(type, 1800); return; }
  if (del && ci === 0)         { del = false; pi = (pi + 1) % phrases.length; }
  setTimeout(type, del ? 50 : 90);
}
type();

/* 5 ── SCROLL REVEAL */
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const d = parseInt(e.target.dataset.delay || 0);
    setTimeout(() => e.target.classList.add('show'), d);
    ro.unobserve(e.target);
  });
}, { threshold: 0.1 });
document.querySelectorAll('[data-reveal]').forEach(el => ro.observe(el));

/* 6 ── SKILL BARS */
const so = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('.sk-prog').forEach(b => {
      b.style.width = b.dataset.w + '%';
    });
    so.unobserve(e.target);
  });
}, { threshold: 0.3 });
const skillsRow = document.querySelector('#skills .row');
if (skillsRow) so.observe(skillsRow);

/* 7 ── COUNTERS */
function countUp(el) {
  const target = +el.dataset.target;
  const dur = 2000, step = target / (dur / 16);
  let cur = 0;
  const t = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = Math.round(cur);
    if (cur >= target) clearInterval(t);
  }, 16);
}
const co = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('.st-num').forEach(countUp);
    co.unobserve(e.target);
  });
}, { threshold: 0.5 });
const statsEl = document.getElementById('stats');
if (statsEl) co.observe(statsEl);

/* 8 ── CONTACT FORM */
function send() {
  const name  = document.getElementById('fn').value.trim();
  const email = document.getElementById('fe').value.trim();
  const msg   = document.getElementById('fm').value.trim();
  const box   = document.getElementById('fmsg');
  const btn   = document.querySelector('.ct-form .hb-primary');

  if (!name || !email || !msg) {
    box.textContent = '⚠️ Please fill in all required fields.';
    box.className = 'fmsg err'; return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    box.textContent = '⚠️ Please enter a valid email address.';
    box.className = 'fmsg err'; return;
  }

  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
    box.textContent = '✅ Message sent! I\'ll get back to you within 24 hours.';
    box.className = 'fmsg ok';
    ['fn','fe','fs','fm'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
  }, 1600);
}

/* 9 ── CLOSE MOBILE MENU ON LINK CLICK */
document.querySelectorAll('.nav-link').forEach(a => {
  a.addEventListener('click', () => {
    const c = document.getElementById('nm');
    if (c.classList.contains('show'))
      bootstrap.Collapse.getInstance(c)?.hide();
  });
});