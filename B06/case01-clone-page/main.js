const navMenu = document.getElementById("navMenu");

window.onscroll = function() {onScroll()};

function onScroll() {
  if (document.documentElement.scrollTop > 10) {
    navMenu.style.paddingTop = "10px";
    navMenu.style.paddingBottom = "10px";
    navMenu.classList.add("scroll-active");
  } else {
    navMenu.style.paddingTop = "17px";
    navMenu.style.paddingBottom = "17px";
    navMenu.classList.remove("scroll-active");
  }
}