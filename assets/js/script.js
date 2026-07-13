// Mobile nav toggle
const navToggle = document.querySelector('[data-nav-toggle]');
const navList = document.querySelector('[data-nav-list]');

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    navList.classList.toggle('is-open');
  });

  navList.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => navList.classList.remove('is-open'));
  });
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach((el) => io.observe(el));

// Header border on scroll
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (header) header.style.borderBottomColor = 'var(--line)';
});

/*-----------------------------------------*\
  CAROUSEL — auto-slide + manual controls
\*-----------------------------------------*/

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const dotsWrap = carousel.querySelector('.carousel-dots');
  const prevBtn = carousel.querySelector('.carousel-nav.prev');
  const nextBtn = carousel.querySelector('.carousel-nav.next');

  if (!track || slides.length <= 1) return;

  let index = 0;
  let autoTimer = null;
  const AUTO_DELAY = 4200;

  let dots = [];
  if (dotsWrap) {
    slides.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });
  }

  function render() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    render();
    resetAuto();
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function startAuto() {
    autoTimer = setInterval(next, AUTO_DELAY);
  }
  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  if (nextBtn) nextBtn.addEventListener('click', next);
  if (prevBtn) prevBtn.addEventListener('click', prev);

  carousel.addEventListener('mouseenter', () => clearInterval(autoTimer));
  carousel.addEventListener('mouseleave', startAuto);

  let startX = 0;
  track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) { dx > 0 ? prev() : next(); }
  }, { passive: true });

  render();
  startAuto();
});
