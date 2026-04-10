const track = document.getElementById('track');
const slides = Array.from(track.children);
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const visible = 3;
let index = visible;

// клонируем
const firstClones = slides.slice(0, visible).map(el => el.cloneNode(true));
const lastClones = slides.slice(-visible).map(el => el.cloneNode(true));

lastClones.forEach(el => track.prepend(el));
firstClones.forEach(el => track.append(el));

const allSlides = Array.from(track.children);

function update() {
  const slider = document.getElementById('slider');
  const width = slider.offsetWidth / visible;

  allSlides.forEach(slide => {
    slide.style.minWidth = width + 'px';
  });

  track.style.transition = 'none';
  track.style.transform = `translateX(-${index * width}px)`;
}

function move() {
  const slider = document.getElementById('slider');
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
  const slider = document.getElementById('slider');
  const width = slider.offsetWidth / visible;

  if (index >= slides.length + visible) {
    track.style.transition = 'none';
    index = visible;
    track.style.transform = `translateX(-${index * width}px)`;
  }

  if (index <= 0) {
    track.style.transition = 'none';
    index = slides.length;
    track.style.transform = `translateX(-${index * width}px)`;
  }
});

window.addEventListener('resize', update);

update();

const video = document.getElementById('video');
const btn = document.getElementById('playBtn');

btn.addEventListener('click', () => {
  video.play();
  btn.style.display = 'none'; // скрыть кнопку
});
