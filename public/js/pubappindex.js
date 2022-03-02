////// Load basic top post data as homepage //////////
topPosts();

////// Add event listener links to pass in that category to server //////////
const sports = document.getElementById("sports");
sports.addEventListener("click", async (e) => {
  return changeCat("sports");
});

const news = document.getElementById("news");
news.addEventListener("click", async (e) => {
  return changeCat("news");
});
