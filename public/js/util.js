///////////////// Show an error when caught /////////////////////
const showError = (element, e) => {
  return console.log(e);
};

///////////// Hide Mobile nav Ham when Clicked ///////////////////
const hamburger = document.querySelector(".hamburger");
const mobilenav = document.querySelector(".mobile-nav");
hamburger.addEventListener("click", () => {
  mobilenav.classList.toggle("hide");
});

//////////////// Convert reddit epoch seconds to browser location current date and time ////////////////
const convertEpoch = (seconds) => {
  const date = new Date(parseInt(`${Math.floor(seconds)}000`));
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${minutes} ${ampm}`;
};

//////////////// create post that does not inlude a thumbnail ///////////////////////
const createNoThumbPost = (post) => {
  const postContainer = document.querySelector(".container");
  const newPost = document.createElement("div");
  const data = post.data;
  newPost.innerHTML = `<div class="card">
    <div class="post-preview">
      <div class="stats-straight">
        <p><span class="bold">Upvotes: </span> ${data.ups}</p>
        <p><span class="bold">Subreddit: </span> r/${data.subreddit}</p>
        <p><span class="bold">Awards: </span>${data.total_awards_received}</p>
      </div>
    </div>
    <div class="card-content">
      <a href="${data.url}" target="_blank"><p><span class="bold"></span>${
    data.title
  }</p><a/>
      <p><span class="bold">Poster: </span>${data.author}</p>
      <p><span class="bold">Source: </span></p>
      <div class="comments">
        <p><a href="https://www.reddit.com${
          data.permalink
        }" target="_blank"><span class="bold">Comments: </span>${
    data.num_comments
  }</a></p>
        <p><span class="bold">Posted: </span>${convertEpoch(
          data.created_utc
        )}</p>
      </div>
    </div>
  </div>`;
  return postContainer.appendChild(newPost);
};
////////// Convert post data returned from reddit and turn each post into a card /////////////////////////
const createPost = (post) => {
  const postContainer = document.querySelector(".container");
  const newPost = document.createElement("div");
  const data = post.data;
  newPost.innerHTML = `<div class="card">
    <div class="post-preview">
    <a href="${data.url_overridden_by_dest}" target="blank">
    <img
    src="${data.thumbnail}"
    alt="No Thumbnail"
  />
</a>
      <div class="stats">
        <p><span class="bold">Upvotes: </span> ${data.ups}</p>
        <p><span class="bold">Subreddit: </span> r/${data.subreddit}</p>
        <p><span class="bold">Awards: </span>${data.total_awards_received}</p>
      </div>
    </div>
    <div class="card-content">
      <a href="${data.url}" target="_blank"><p><span class="bold"></span>${
    data.title
  }</p><a/>
      <p><span class="bold">Poster: </span>${data.author}</p>
      <p><span class="bold">Source: </span></p>
      <div class="comments">
        <p><a href="https://www.reddit.com${
          data.permalink
        }" target="_blank"><span class="bold">Comments: </span>${
    data.num_comments
  }</a></p>
        <p><span class="bold">Posted: </span>${convertEpoch(
          data.created_utc
        )}</p>
      </div>
    </div>
  </div>`;
  return postContainer.appendChild(newPost);
};

//////////////// Create posts, assuming an array of reddit posts are passed in //////////////
const popData = (posts) => {
  const postContainer = document.querySelector(".container");
  postContainer.innerHTML = "";
  if (posts) {
    for (let post of posts) {
      if (post.data.thumbnail === "default" || post.data.thumbnail === "self") {
        createNoThumbPost(post);
      } else if (post.data.thumbnail === "") {
        createNoThumbPost(post);
      } else {
        createPost(post);
      }
    }
    return;
  }

  return showError("No Posts");
};

////////////////////// Get posts from a requested subreddit or subreddits ///////////////////
const getPosts = async (subreddit) => {
  const response = await fetch(`${window.location.href}/${subreddit}`);
  const posts = await response.json();
  return popData(posts);
};

///////// Get top posts when page loads ///////////
const topPosts = async () => {
  try {
    const response = await fetch(`${window.location.href}/all`);
    const data = await response.json();
    return popData(data);
  } catch (e) {
    return showError(e);
  }
};
