/* FALLEN HORIZONS: links, mobile navigation, and progress animations. */

// 1. Edit these URLs to update all registration and community buttons.
const REGISTRATION_URL = 'https://craftora.tech/hackathons/fallen-horizons-hackathon';
const COMMUNITY_URL = 'https://chat.whatsapp.com/Gnkqhpx2OVAHygY6t2zgDB';

function configureLinks(selector, url) {
  document.querySelectorAll(selector).forEach((link) => {
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
}

configureLinks('[data-register]', REGISTRATION_URL);
configureLinks('[data-community]', COMMUNITY_URL);

// 2. Open and close the mobile navigation.
const menuButton = document.querySelector('.menu');
const navigation = document.querySelector('nav');

function setMenuOpen(isOpen) {
  navigation.classList.toggle('open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? '✕' : '☰';
}

menuButton.addEventListener('click', () => {
  setMenuOpen(!navigation.classList.contains('open'));
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenuOpen(false));
});

// 3. Update both the top progress bar and the corner scroll indicator.
const topProgressBar = document.querySelector('.progress');
const cornerProgressFill = document.querySelector('.corner-rail i');
const cornerProgressNumber = document.querySelector('.corner-number');

function updateScrollProgress() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0
    ? (window.scrollY / scrollableHeight) * 100
    : 0;
  const roundedProgress = Math.max(0, Math.min(100, Math.round(progress)));

  topProgressBar.style.width = `${progress}%`;
  cornerProgressFill.style.height = `${roundedProgress}%`;
  cornerProgressNumber.textContent = `${roundedProgress}%`;
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });
window.addEventListener('resize', updateScrollProgress);
updateScrollProgress();

// 4. Play a short visual introduction. This is a timed animation,
//    not a measurement of downloaded assets or network loading progress.
const introLoader = document.querySelector('#intro-loader');
const loadingPercent = document.querySelector('#loading-percent');
const loadingFill = document.querySelector('#loading-fill');
const loadingTrack = document.querySelector('.loading-track');
const loadingMessage = document.querySelector('#loading-message');
const pageSections = document.querySelectorAll('main, header, footer');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const INTRO_DURATION_MS = 2600;
const INTRO_TIMEOUT_MS = 4000;
const INTRO_FADE_MS = 450;
let introAnimationFrame = 0;
let introClosed = false;

function setIntroProgress(percent) {
  loadingPercent.textContent = `${percent}%`;
  loadingFill.style.width = `${percent}%`;
  loadingTrack.setAttribute('aria-valuenow', String(percent));
}

function finishIntro() {
  // Skip, Escape, animation completion, and the timeout can all call this.
  if (introClosed) return;

  introClosed = true;
  cancelAnimationFrame(introAnimationFrame);
  setIntroProgress(100);
  introLoader.classList.add('leaving');
  document.body.classList.remove('intro-active');
  pageSections.forEach((section) => { section.inert = false; });

  setTimeout(() => {
    introLoader.hidden = true;
  }, INTRO_FADE_MS);
}

if (!prefersReducedMotion) {
  introLoader.hidden = false;
  document.body.classList.add('intro-active');
  pageSections.forEach((section) => { section.inert = true; });
  const introStartTime = performance.now();

  function animateIntro(currentTime) {
    const elapsedTime = currentTime - introStartTime;
    const percent = Math.max(0, Math.min(100, Math.floor(
      (elapsedTime / INTRO_DURATION_MS) * 100
    )));
    setIntroProgress(percent);

    if (percent < 40) {
      loadingMessage.textContent = 'OPENING YOUR HORIZON';
    } else if (percent < 80) {
      loadingMessage.textContent = 'PREPARING THE ARENA';
    } else {
      loadingMessage.textContent = 'READY TO BUILD';
    }

    if (percent >= 100) {
      finishIntro();
    } else {
      introAnimationFrame = requestAnimationFrame(animateIntro);
    }
  }

  introAnimationFrame = requestAnimationFrame(animateIntro);
  // Ensure visitors can reach the page even if the animation is interrupted.
  setTimeout(finishIntro, INTRO_TIMEOUT_MS);
}

document.querySelector('#skip-intro').addEventListener('click', finishIntro);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setMenuOpen(false);
    finishIntro();
  }
});
