const exploreBtn = document.querySelector("#search-btn");
const subreddit = document.querySelector("#subreddit");
const sort = document.querySelector("#sort");
const time = document.querySelector("#time");
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

// Search for a subreddit
const search = (subreddit, sort, time) => {
  return fetch(
    `https://www.reddit.com/r/${subreddit}/${sort}/.json?count=20&t=${time}&limit=50`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data.data.children.map((data) => data.data);
    })
    .catch((err) => console.log(err));
};

// Generate the feed
const generateFeed = () => {
  if (document.querySelectorAll(".error")[0]) {
    document.querySelectorAll(".error")[0].remove();
  }

  if (!subreddit.value) {
    showError(subreddit, "Please enter a subreddit");
    return;
  }

  clearFeed();

  search(subreddit.value, sort.value, time.value).then((results) => {
    results.forEach((post) => {
      createPost(post);
    });
  });
};

// Clear the feed
const clearFeed = () => {
  feed.innerHTML = "";
};

// Create the post element
const createPost = (post) => {
  const postDiv = document.createElement("div");
  console.log(post);
  postDiv.classList.add("post");
  postDiv.innerHTML = `
  <div id="post-image">
    <img onError='removeElement(this)' src=${imgCheck(post)}>
  </div>
  <div id="post-content">
    <p id="title"><a target="_blank" href="${post.url}">${post.title}</a></p>
    <p id="comments"><a target="_blank" href="https://www.reddit.com${post.permalink}" id="permalink">View Comments</a></p>
  </div>
  `;
  feed.appendChild(postDiv);
};

////////////////////////////////////////////////////
////////////////// Generate Feed ///////////////////
exploreBtn.addEventListener("click", (e) => {
  generateFeed();
});

subreddit.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    generateFeed();
  }
});
