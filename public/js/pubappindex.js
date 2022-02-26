const hamburger = document.querySelector(".hamburger");
const mobilenav = document.querySelector(".mobile-nav");

hamburger.addEventListener("click", () => {
  mobilenav.classList.toggle("hide");
});

const showError = (e) => {
  return console.log(e);
};

const popData = (posts) => {
  const postContainer = document.querySelector(".container");
  postContainer.innerText = posts;
};

const topPosts = async () => {
  try {
    const response = await fetch(`${window.location.href}/top`);
    const data = await response.json();
    return popData(data);
  } catch (e) {
    return showError(e);
  }
};

topPosts();
