import "./parallax.js";
import "./rain.js";

// Initialize parallax effect after DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
  const scene = document.querySelector(".parallax");
  const parallaxInstance = new Parallax(scene);
});
