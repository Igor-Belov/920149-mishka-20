let pagepopup = document.querySelector(".page-header");

if (pagepopup.classList.contains("js-popup")) {

let button_buy = document.querySelector(".js-buy");
let target_zone = document.querySelector(".protucts-catalog__list");
let popup = document.querySelector(".form-size");
let type_page = document.querySelector(".page__body");

button_buy.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.add("form-size--on");
});

if(type_page.classList.contains("js-catalog")) {
  target_zone.addEventListener("click", function (evt) {
    var target_click = evt.target;
    console.log(target_click);
    if (target_click.classList.contains("js-buy")) {
      evt.preventDefault();
      if (!popup.classList.contains("form-size--on")) {
        popup.classList.add("form-size--on");
      }
    }
  });
};

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (popup.classList.contains("form-size--on")) {
      evt.preventDefault();
      popup.classList.remove("form-size--on");
    }
  }
});

popup.addEventListener("click", function (evt) {
  if (event.target == this) {
    popup.classList.remove("form-size--on");
  }
});
};
