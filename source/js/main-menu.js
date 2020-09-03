let button = document.querySelector(".js-button-toggle-nav");
let menu = document.querySelector(".js-site-list");
let cart = document.querySelector(".main-navigation__cart");
let search = document.querySelector(".main-navigation__search");

button.classList.add ("button-toggle-nav--on");
menu.classList.add ("main-navigation__list-site--off");
cart.classList.add ("main-navigation__cart--off");
search.classList.add ("main-navigation__search--off");

button.addEventListener("click", function () {
  button.classList.toggle ("button-toggle-nav--close");
  menu.classList.toggle ("main-navigation__list-site--off");
  cart.classList.toggle ("main-navigation__cart--off");
  search.classList.toggle ("main-navigation__search--off");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (!menu.classList.contains("main-navigation__list-site--off")) {
      evt.preventDefault();
      menu.classList.add("main-navigation__list-site--off");
      cart.classList.add ("main-navigation__cart--off");
      search.classList.add ("main-navigation__search--off");
    }
  }
});
