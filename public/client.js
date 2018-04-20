// client-side js
// run by the browser each time your view template referencing it is loaded

(function(){
  console.log('hello world :o');
  
  // Get a random food emoji
  // http://www.unicode.org/emoji/charts/full-emoji-list.html#food_&_drink
  const getFoodmoji = function() {
    var min = 127815;
    var max = 127855;
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  
  // Turn all title-emoji elements into random food emoji
  var titleDecoration = document.getElementsByClassName('title-emoji');
  for (var i = 0; i < titleDecoration.length; i++) {
    titleDecoration.item(i).innerHTML = '&#' + getFoodmoji() + ';';
  }
  
  
  let dreams = [];
  
  // define variables that reference elements on our page
  const dreamsList = document.getElementById('dreams');
  const dreamsForm = document.forms[0];
  const dreamInput = dreamsForm.elements['dream'];
  
  // a helper function to call when our request for dreams is done
  const getDreamsListener = function() {
    // parse our response to convert to JSON
    dreams = JSON.parse(this.responseText);
    
    // iterate through every dream and add it to our page
    dreams.forEach( function(row) {
      appendNewDream(row.dream);
    });
  }
  
  // request the dreams from our app's sqlite database
  const dreamRequest = new XMLHttpRequest();
  dreamRequest.onload = getDreamsListener;
  dreamRequest.open('get', '/getFoodmoji');
  dreamRequest.send();
  
  // a helper function that creates a list item for a given dream
  const appendNewDream = function(dream) {
    const newListItem = document.createElement('li');
    newListItem.innerHTML = dream;
    dreamsList.appendChild(newListItem);
  }
  
  // listen for the form to be submitted and add a new dream when it is
  dreamsForm.onsubmit = function(event) {
    // stop our form submission from refreshing the page
    event.preventDefault();
    
    // get dream value and add it to the list
    dreams.push(dreamInput.value);
    appendNewDream(dreamInput.value);
  
    // reset form 
    dreamInput.value = '';
    dreamInput.focus();
  };
  
})()