const track = document.getElementById('track');
const originalSlides = Array.from(track.children);
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slider = document.getElementById('slider');

let visible = getVisibleSlides();
let index = visible;

function getVisibleSlides() {
  return window.innerWidth <= 792 ? 1 : 3;
}

function buildSlider() {
  visible = getVisibleSlides();
  index = visible;

  track.innerHTML = '';

  const firstClones = originalSlides.slice(0, visible).map(el => el.cloneNode(true));
  const lastClones = originalSlides.slice(-visible).map(el => el.cloneNode(true));

  lastClones.forEach(el => track.appendChild(el.cloneNode(true)));
  originalSlides.forEach(el => track.appendChild(el.cloneNode(true)));
  firstClones.forEach(el => track.appendChild(el.cloneNode(true)));

  update();
}

function getAllSlides() {
  return Array.from(track.children);
}

function update() {
  const width = slider.offsetWidth / visible;
  const allSlides = getAllSlides();

  allSlides.forEach(slide => {
    slide.style.minWidth = width + 'px';
    slide.style.maxWidth = width + 'px';
    slide.style.flex = `0 0 ${width}px`;
  });

  track.style.transition = 'none';
  track.style.transform = `translateX(-${index * width}px)`;
}

function move() {
  const width = slider.offsetWidth / visible;
  track.style.transition = 'transform 0.4s ease';
  track.style.transform = `translateX(-${index * width}px)`;
}

nextBtn.onclick = () => {
  index++;
  move();
};

prevBtn.onclick = () => {
  index--;
  move();
};

track.addEventListener('transitionend', () => {
  const width = slider.offsetWidth / visible;
  const totalSlides = originalSlides.length;

  if (index >= totalSlides + visible) {
    track.style.transition = 'none';
    index = visible;
    track.style.transform = `translateX(-${index * width}px)`;
  }

  if (index <= 0) {
    track.style.transition = 'none';
    index = totalSlides;
    track.style.transform = `translateX(-${index * width}px)`;
  }
});

window.addEventListener('resize', () => {
  buildSlider();
});

buildSlider();

const video = document.getElementById('video');
const btn = document.getElementById('playBtn');

btn.addEventListener('click', () => {
  video.play();
  btn.style.display = 'none';
});