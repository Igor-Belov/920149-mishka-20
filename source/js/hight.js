let sample = document.querySelector(".cart");
let header = document.querySelector(".page-header");
let sizeHeader = 0;

sizeHeader = sample.offsetHeight - 1;

header.style.setProperty("--height-background", sizeHeader + "px");
