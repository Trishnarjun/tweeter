/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function() {
  // loops through tweets
  $(() => {
    //$('.allTweets').append($tweet);
    $(".container form").on("submit", function(event) {
      event.preventDefault();
      const inputText = $("#tweet-text").val();
      if (inputText === "") {
        alert("please enter something")
      } else if (inputText.length > 140) {
        alert("please enter less the 140 chr")
      } else {
        
        $.ajax({
          type: "POST",
          url: "/tweets",
          data: $(this).serialize()
        }).done(function() {
          console.log("success")
          loadTweets()
        });
      }
    })
    const loadTweets = () => {
      $.get("/tweets").then( function(data){
        console.log(data)
        for (let tweet of data) {
          let $tweet = createTweetElement(tweet);
          $('.allTweets').prepend($tweet)
        }
      })
    }
    loadTweets()
  });
  
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
}

const createTweetElement = (data) => {
  let newTweet = `<article>
  <header class="topTweet">
    <div>
      <img src=${data.user.avatars}> 
      <p>${data.user.name}</p>
    </div>
    <p>${data.user.handle}</p>
  </header>
  <div>
    <p>${data.content.text}</p>
  </div>
  <footer class="bottomTweet">  
    <p>${timeago.format(data.created_at)} </p>
    <div class="interaction">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`

return newTweet

};

renderTweets();





