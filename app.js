const exploreBtn = document.querySelector("#search-btn");
const subreddit = document.querySelector("#subreddit");
const sort = document.querySelector("#sort");
const time = document.querySelector("#time");
const searchSection = document.querySelector("#search");
const feed = document.querySelector("#feed");
const searchBtn = document.querySelector("#searchBtn");
const historyBtn = document.querySelector("#historyBtn");
const historyFeed = document.querySelector("#historyFeed");

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

// Create the post element
const createPost = (post) => {
  const postDiv = document.createElement("div");
  postDiv.classList.add("post");
  postDiv.innerHTML = `
  <div id="post-image">
    <img onError='removeElement(this)' src=${imgCheck(post)}>
  </div>
  <div id="post-content">
    <p id="title"><a class="storableTitle" target="_blank" href="https://www.reddit.com${
      post.permalink
    }">${post.title}</a></p>
    <p id="comments"><a class="storableComment" target="_blank" href="https://www.reddit.com${
      post.permalink
    }" id="permalink">View Comments</a></p>
  </div>
  `;
  feed.appendChild(postDiv);
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
  historyFeed.innerHTML = "";
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

////////////////////////////////////////////////////
////////////////// Store History ///////////////////
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("storableTitle")) {
    const link = e.target.getAttribute("href");
    const title = e.target.parentElement.textContent;
    localStorage.setItem(`${title}`, `${link}`);
  } else if (e.target.classList.contains("storableComment")) {
    const link = e.target.getAttribute("href");
    const title =
      e.target.parentElement.parentElement.childNodes[1].firstChild.textContent;
    localStorage.setItem(`${title}`, `${link}`);
  }
});

// Generate History Posts
historyBtn.addEventListener("click", () => {
  const storedPosts = Object.entries(localStorage);

  clearFeed();

  for (post of storedPosts) {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");
    postDiv.innerHTML = `
    <div id="post-content">
      <p id="title"><a target="_blank" href="${post[1]}">${post[0]}</a></p>
      <p id="comments"><a target="_blank" href="${post[1]}" id="permalink">View Comments</a></p>
    </div>
    `;
    historyFeed.appendChild(postDiv);
  }
});
