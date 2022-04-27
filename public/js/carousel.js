const allCarouselSlides_el = document.querySelectorAll(
  ".carousel .slider .slider-item"
);
const carouselFader_el = document.querySelector(".carousel .fader");

let currentNumber = 0,
  intervalId = 0;

const displayToCarousel = () => {
  const translateX = "translateX(" + -(currentNumber * 100) + "%)";

  allCarouselSlides_el.forEach(
    (slideItem) => (slideItem.style.transform = translateX)
  );

  carouselFader_el.innerHTML = faderItemsMarkupData[currentNumber];
};

const slideToNext = () => {
  currentNumber =
    currentNumber + 1 === allCarouselSlides_el.length ? 0 : ++currentNumber;

  displayToCarousel();
};
const slideToPrev = () => {
  currentNumber =
    currentNumber === 0 ? allCarouselSlides_el.length - 1 : --currentNumber;

  displayToCarousel();
};

const stop = () => {
  clearInterval(intervalId);
};

const start = () => {
  intervalId = setInterval(slideToNext, 6000);
};

const playPauseImage_el = document.querySelector(
  ".carousel .carousel-controls #pause-play"
);

const displayToggleImg = (ctx) => {
  playPauseImage_el.src = `./__________img/carousel/slider-${ctx}.png`;
  playPauseImage_el.alt = `slider ${ctx}`;
  playPauseImage_el.dataset.toggle = ctx;
};

document
  .querySelector(".carousel .carousel-controls #prev")
  .addEventListener("click", () => {
    stop();
    start();
    slideToPrev();
    displayToggleImg("pause");
  });
document
  .querySelector(".carousel .carousel-controls #next")
  .addEventListener("click", () => {
    stop();
    start();
    slideToNext();
    displayToggleImg("pause");
  });

playPauseImage_el.addEventListener("click", ({ target }) => {
  const { toggle } = target.dataset;

  if (toggle === "pause") {
    stop();
    displayToggleImg("play");
  } else if (toggle === "play") {
    start();
    displayToggleImg("pause");
  }
});

start();
