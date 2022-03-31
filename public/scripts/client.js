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
    $("#msg").hide();
    
    //post requests tweet to /tweets
    $(".container form").on("submit", function(event) {
      event.preventDefault();
      const inputText = $("#tweet-text").val();
      const safeText = escape(inputText)
      
      //checks for errors in the input
      if (inputText === "") {
        alert("please enter something")
      } else if (inputText.length > 140) {
        $("#msg").slideDown(300);
      } else {
        $("#msg").slideUp(200);
        $.ajax({
          type: "POST",
          url: "/tweets",
          data: $(this).serialize()
        }).done(function() {
          console.log("success")
          loadTweets()
          window.location.reload();
        });
      }
      
    })
    //cross scriping for unsafe code
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      //console.log(div.innerHTML)
      return div.innerHTML;
    };
    const loadTweets = () => {
      $.get("/tweets").then( function(data){
        console.log(data)
        for (let tweet of data) {
          // calls createTweetElement for each tweet
          let $tweet = createTweetElement(tweet);
          // takes return value and appends it to the tweets container
          $('.allTweets').prepend($tweet).slideDown()
        }
      })
    }
    loadTweets()
  });
}

const createTweetElement = (data) => {
  // adding dynamic elements to the tweet
  let newTweet = `<article>
  <header class="topTweet">
    <div>
      <img src=${data.user.avatars}> 
      <p>${data.user.name}</p>
    </div>
    <p>${data.user.handle}</p>
  </header>
  <div>
    <p>${escape(data.content.text).split('%20').join(' ').split('%21').join('!').split('%2C').join(',').split('%26').join('&')}</p>
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





