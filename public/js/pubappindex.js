const hamburger = document.querySelector(".hamburger");
const mobilenav = document.querySelector(".mobile-nav");

hamburger.addEventListener("click", () => {
  mobilenav.classList.toggle("hide");
});

const showError = (e) => {
  return console.log(e);
};

const convertEpoch = (seconds) => {
  const date = new Date(parseInt(`${Math.floor(seconds)}000`));
  return date;
};

console.log(convertEpoch(1645855237.0));

const createPost = (post) => {
  const postContainer = document.querySelector(".container");
  const newPost = document.createElement("div");
  const data = post.data;
  newPost.innerHTML = `<div class="card">
  <div class="post-preview">
    <a href="${data.url_overridden_by_dest}" target="blank"><img
      src="${data.thumbnail}"
      alt="No Thumbnail"
    /></a>
    <div class="stats">
      <p><span class="bold">Upvotes: </span> ${data.ups}</p>
      <p><span class="bold">Upvotes: </span> r/${data.subreddit}</p>
      <p><span class="bold">Awards: </span>${data.total_awards_received}</p>
    </div>
  </div>
  <div class="card-content">
    <a href="${data.url}" target="_blank"><p><span class="bold"></span>${data.title}</p><a/>
    <p><span class="bold">Poster: </span>${data.author}</p>
    <p><span class="bold">Source: </span></p>
    <div class="comments">
    <p><span class="bold">Comments: </span>${data.num_comments}</p>
    <p><span class="bold">Posted: </span></p>
    </div>
  </div>
</div>`;
  return postContainer.appendChild(newPost);
};

const popData = (posts) => {
  if (posts) {
    for (let post of posts) {
      createPost(post);
    }
    return;
  }

  return showError("No Posts");
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
