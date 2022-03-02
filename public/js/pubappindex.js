////// Load basic top post data as homepage //////////
topPosts();

////// Add event listener links to pass in that category to server //////////
const sports = document.getElementById("sports");
sports.addEventListener("click", async (e) => {
  return getPosts("sports");
});

const news = document.getElementById("news");
news.addEventListener("click", async (e) => {
  return getPosts("worldnews");
});

const entertainment = document.getElementById("entertainment");
entertainment.addEventListener("click", async (e) => {
  return getPosts("entertainment");
});
