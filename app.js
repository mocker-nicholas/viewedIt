const exploreBtn = document.querySelector("#search-btn");
const subreddit = document.querySelector("#subreddit");
const sort = document.querySelector("#sort");
const searchSection = document.querySelector("#search");
const feed = document.querySelector("#feed");

// Show an error
const showError = (elmt, msg) => {
  let errorBox = document.createElement("div");
  errorBox.textContent = `${msg}`;
  errorBox.classList.add("error");
  searchSection.appendChild(errorBox);

  setTimeout(() => {
    errorBox.remove();
  }, 3000);
};

const search = (subreddit, sort) => {
  return fetch(
    `https://www.reddit.com/r/${subreddit}/${sort}/.json?count=20&t=day&limit=5`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data.data.children.map((data) => data.data);
    })
    .catch((err) => console.log(err));
};

exploreBtn.addEventListener("click", (e) => {
  if (document.querySelectorAll(".error")[0]) {
    document.querySelectorAll(".error")[0].remove();
  }

  if (!subreddit.value) {
    showError(subreddit, "Please enter a subreddit");
    return;
  }

  search(subreddit.value, sort.value).then((results) => {
    results.forEach((post) => {
      const postDiv = document.createElement("div");
      console.log(post);
      postDiv.classList.add("post");
      postDiv.innerHTML = `
        <img src="${post.thumbnail}">
        <p><a target="_blank" href="${post.url}">${post.title}</a></p>
      `;
      feed.appendChild(postDiv);
    });
  });
});
