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
  <img
    src="https://images.unsplash.com/photo-1645817744713-3f005cbd7deb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
    alt=""
  />
  <div class="card-content">
    <p>Title: ${data.title}</p>
    <p>Poster:${data.author_fullname}</p>
    <p>Source:</p>
    <div class="stats">
      <span>Upvotes: ${data.ups} </span>
      <span>Awards: ${data.total_awards_recieved}</span>
      <span>Posted: </span>
    </div>
  </div>
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
