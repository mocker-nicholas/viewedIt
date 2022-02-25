const hamburger = document.querySelector(".hamburger");
const mobilenav = document.querySelector(".mobile-nav");

hamburger.addEventListener("click", () => {
  mobilenav.classList.toggle("hide");
});
