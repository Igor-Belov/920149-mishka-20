let button = document.querySelector(".js-button-toggle-nav");
let menu = document.querySelector(".js-site-list");

button.classList.add ("button-toggle-nav--on");
menu.classList.add ("main-navigation__list-site--off");

button.addEventListener("click", function () {
  button.classList.toggle ("button-toggle-nav--close");
  menu.classList.toggle ("main-navigation__list-site--off");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (!menu.classList.contains("main-navigation__list-site--off")) {
      evt.preventDefault();
      menu.classList.add("main-navigation__list-site--off");
    }
  }
});
