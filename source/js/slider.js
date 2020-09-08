let pageslider = document.querySelector(".page-header");

if (pageslider.classList.contains("js-slider")) {

let buttons = document.querySelector(".slider__buttons-slider");
let button_right = document.querySelector(".slider__button:nth-of-type(2)");
let button_left = document.querySelector(".slider__button:nth-of-type(1)");
let slide = document.querySelectorAll(".slider__item");
let submit = slide.length - 1;
let nslide = 0;

buttons.classList.add("slider__buttons-slider--on");

for (nslide; nslide <= submit; nslide++) {
  if(slide.item(nslide).classList.contains("slider__item--active")) {
    break;
  }
}

button_left.addEventListener("click", function () {
  slide.item(nslide).classList.remove("slider__item--active");
  if (nslide > 0) {
    nslide--;
    slide.item(nslide).classList.add("slider__item--active");
  } else {
    nslide = submit;
    slide.item(nslide).classList.add("slider__item--active");
  }
});

button_right.addEventListener("click", function () {
  slide.item(nslide).classList.remove("slider__item--active");
  if (nslide < submit) {
    nslide++;
    slide.item(nslide).classList.add("slider__item--active");
  } else {
    nslide = 0;
    slide.item(nslide).classList.add("slider__item--active") ;
  }
});
};
