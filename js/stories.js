"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

function isFavorite(id){
  
  for(let char of currentUser.favorites){
    if(char.storyId ===id){
      return 'UnFavorite';
    }
    
    
  }

   return 'Favorite';
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */


 function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);
  
  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        <a class="Favorite">${isFavorite(story.storyId)}</a>
        <a class="Remove">Remove</a>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}



async function getAddStory(storyAuthor, storyURL, storyTitle){
  
 

  let newStory = await storyList.addStory(currentUser,
    {title: storyTitle.value, author: storyAuthor.value, url: storyURL.value});

    
    getAndShowStoriesOnStart();





}
