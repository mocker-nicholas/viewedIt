const hamburger = document.querySelector(".hamburger");
const mobilenav = document.querySelector(".mobile-nav");

hamburger.addEventListener("click", () => {
  mobilenav.classList.toggle("hide");
});

const showError = (e) => {
  return console.log(e);
};

const createPost = (post) => {
  const postContainer = document.querySelector(".container");
  const newPost = document.createElement("div");
  const data = post.data;
  newPost.innerHTML = `<div class="card">
  <div class="post-preview">
    <img
      src="${data.thumbnail}"
      alt="No Thumbnail"
    />
    <div class="stats">
      <p><span class="bold">Upvotes: </span> ${data.ups}</p>
      <p><span class="bold">Awards: </span>${data.total_awards_received}</p>
      <p><span class="bold">Posted: </span></p>
    </div>
  </div>
  <div class="card-content">
    <p><span class="bold">Title: </span>${data.title}</p>
    <p><span class="bold">Poster: </span>${data.author}</p>
    <p><span class="bold">Source: </span></p>
  </div>
</div>`;
  return postContainer.appendChild(newPost);
};

const popData = (posts) => {
  console.log(posts.length);
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
