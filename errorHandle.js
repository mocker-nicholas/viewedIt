function removeElement(element) {
  element.remove();
}

function imgCheck(post){
  if(!post.preview){
    console.log(post.thumbnail)
  } else {
    return post.preview.images[0].source.url;
  }
}