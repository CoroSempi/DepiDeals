function toggleNav() {
  var navMenu = document.getElementById("navMenu");
  var icons = document.getElementById("icons");
  navMenu.classList.toggle("show");
  navMenu.style.zIndex = "1";
  icons.classList.toggle("show");
}
