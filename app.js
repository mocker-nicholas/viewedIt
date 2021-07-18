const exploreBtn = document.querySelector('#explore-btn');
const subreddit = document.querySelector('#subreddit');
const sort = document.querySelector('#sort')
const searchSection = document.querySelector('#search')

// Show an error
const showError = (elmt, msg) => {
  let errorBox = document.createElement('div')
  elmt.style.borderColor = 'var(--red-salsa)'
  elmt.style.outline = 'var(--red-salsa)'
  errorBox.textContent = `${msg}`
  errorBox.classList.add('error')
  searchSection.prepend(errorBox);
}

exploreBtn.addEventListener('click', (e) => {
  subreddit.style.borderColor = null
  subreddit.style.outline = null
  if(searchSection.children[0].classList.contains('error')){
    searchSection.children[0].remove();
  }
  if(!subreddit.value){
    showError(subreddit, 'Please list a subreddit')
  }
})