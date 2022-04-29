const navMenu = document.getElementById("navMenu");

window.onscroll = function() {onScroll()};

function onScroll() {
  if (document.documentElement.scrollTop > 10) {
    navMenu.classList.add("scroll-active");
  } else {
    navMenu.classList.remove("scroll-active");
  }
}