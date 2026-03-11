const body = document.body;
const lock = (on) => body.style.overflow = on ? 'hidden' : '';

const dropdown = document.querySelector('[data-dropdown]');
if (dropdown) {
  const btn = dropdown.querySelector('button');
  btn.addEventListener('click', () => {
    dropdown.classList.toggle('open');
    btn.setAttribute('aria-expanded', dropdown.classList.contains('open'));
  });
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

const drawer = document.querySelector('.drawer');
const burger = document.querySelector('.burger');
const backdrop = document.querySelector('.drawer-backdrop');
const closeBtn = document.querySelector('.drawer-close');
let lastFocus;
function trapFocus(container, e) {
  const f = container.querySelectorAll('a,button,input,[tabindex]:not([tabindex="-1"])');
  const first = f[0], last = f[f.length - 1];
  if (e.key === 'Tab' && e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  if (e.key === 'Tab' && !e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}
function openDrawer() {
  lastFocus = document.activeElement;
  drawer.classList.add('open'); backdrop.classList.add('open'); lock(true);
  drawer.setAttribute('aria-hidden', 'false'); burger.setAttribute('aria-expanded', 'true');
  drawer.querySelector('a,button')?.focus();
}
function closeDrawer() {
  drawer.classList.remove('open'); backdrop.classList.remove('open'); lock(false);
  drawer.setAttribute('aria-hidden', 'true'); burger.setAttribute('aria-expanded', 'false');
  lastFocus?.focus();
}
burger?.addEventListener('click', openDrawer);
closeBtn?.addEventListener('click', closeDrawer);
backdrop?.addEventListener('click', closeDrawer);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeDrawer(); closeModal(); }
  if (drawer?.classList.contains('open')) trapFocus(drawer, e);
  if (modal?.classList.contains('open')) trapFocus(modalCard, e);
});

document.querySelectorAll('.faq-list details').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (item.open) document.querySelectorAll('.faq-list details').forEach((d) => d !== item && (d.open = false));
  });
});

const modal = document.getElementById('privacy-modal');
const modalCard = modal?.querySelector('.modal-card');
const openers = document.querySelectorAll('.privacy-open');
const closers = document.querySelectorAll('.modal-close,.modal-x');
function openModal() {
  lastFocus = document.activeElement;
  modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); lock(true);
  modal.querySelector('.modal-x')?.focus();
}
function closeModal() {
  if (!modal) return;
  modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); lock(false);
}
openers.forEach((b) => b.addEventListener('click', openModal));
closers.forEach((b) => b.addEventListener('click', closeModal));
modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.style.transform = 'translateY(0)';
  });
}, { threshold: 0.08 });
document.querySelectorAll('.card,.performance-panel,.form-card').forEach((el) => {
  el.style.transform = 'translateY(8px)';
  el.style.transition = 'transform .45s ease';
  io.observe(el);
});

document.querySelectorAll('form.lead-form').forEach((f) => {
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thanks. Your registration is confirmed. Check your email for optional follow-up.');
  });
});
