"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

function navSubmitClick(evt) {
  evt.preventDefault();
  console.debug("submitClick", evt);
  hidePageComponents();
  $newStories.show();
}

$submitButton.on("click", navSubmitClick);

function navFavoritesClick(evt) {
  evt.preventDefault();

  hidePageComponents();
  for (let char of currentUser.favorites) {
    let newLi = document.createElement("li");
    console.log(char);

    newLi.innerHTML = `
    <li id="${char.storyId}">
      <a href="${char.url}" target="a_blank" class="story-link">
        ${char.title}
      </a>

      <small class="story-author">by ${char.author}</small>
      <small class="story-user">posted by ${char.username}</small>
      <a class="Favorite">${isFavorite(char.storyId)}</a>
      <a class="Remove">Remove</a>
    </li>
  `;

    $favoritesList.append(newLi);
  }

  $favoritesList.show();
}

$favoritesButton.on("click", navFavoritesClick);

function navStorySubmitClick(evt) {
  evt.preventDefault();

  console.debug("navStorySubmitClick", evt);

  const storyAuthor = document.getElementById("author-name");
  const storyURL = document.getElementById("story-url");
  const storyTitle = document.getElementById("story-title");

  getAddStory(storyAuthor, storyURL, storyTitle);

  $newStories.hide();
  $allStoriesList.show();
}

$storySubmit.on("click", navStorySubmitClick);

 async function favoriteStory(evt) {
  console.log(evt.target.innerText);

  
  if (evt.target.innerText === "Favorite") {

    console.log(evt.target.parentElement.id);
    addFavorite(evt.target.parentElement.id);
    evt.target.innerText = "UnFavorite";
  } 
  
  
  else if (evt.target.innerText === "UnFavorite") {
    removeFavorite(evt.target.parentElement.id);

    evt.target.innerText = "Favorite";
  }
  else if(evt.target.innerText === "Remove"){
    console.log(evt.target.parentElement);
    removeStory(evt.target.parentElement.id);

    
    evt.target.parentElement.innerHTML = '';
  }

  
}

$allStoriesList.on("click", favoriteStory);

$favoritesList.on("click",favoriteStory);
