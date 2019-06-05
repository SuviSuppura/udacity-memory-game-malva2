 /*
  * Create a list that holds all of your cards
  */
 // array of cards
 let cards = ['fa-diamond', 'fa-diamond',
              'fa-paper-plane-o', 'fa-paper-plane-o',
              'fa-anchor', 'fa-anchor',
              'fa-bolt', 'fa-bolt',
              'fa-cube', 'fa-cube',
              'fa-anchor', 'fa-anchor',
              'fa-leaf', 'fa-leaf',
              'fa-bicycle', 'fa-bicycle'];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 function generateCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
  }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
      }

      return array;
  }
//generates the cards to the game
function gameOn() {
  let deck = document.querySelector('.deck');
  let cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card);
  });
//place the cards to the html
  deck.innerHTML = cardHTML.join('');

}
// Play the game
gameOn();

//stars array
let stars = ['fa-star', 'fa-star', 'fa-star'];

//generates the stars to the game
function generateStar(star) {
 return `<li><i class="fa ${stars}"></i></li>`;
 }
//show stars in the game
showStars();

 function showStars(stars) {
  if (moveCounter == 8) {
      return stars[1,2,3];
      }
      else if (moveCounter > 8 || moveCounter < 12) {
          return stars[1,2];
      }
      else if (moveCounter > 12) {
        return stars[1];
        }
    }

 let allStars = document.querySelectorAll('.stars');
 allStars.innerHTML = stars;

// replay button
var replay = document.querySelector('.fa fa-repeat');
replay.addEventListener('click', function(e) {
  gameOn();
});

//Timer
var time = 0;
cards[i].addEventListener('click', function() {
  if (!timer) {
    startTimer();
  }
});

function startTimer() {
  timer = setInterval(function() {
    if (openCards.length < 16) {
      time++;
      cosole.log(time);
    };
  });

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 let allCards = document.querySelectorAll('.card');
 let openCards = [];

 //moves
let moves = 0;
let moveCounter = document.querySelector('.moves');


allCards.forEach(function(card) {
   card.addEventListener('click', function(e) {
     if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
       openCards.push(card);
       card.classList.add('open', 'show');
       //adds moves
       moveCounter +- 1;
       moves.innerHTML = moveCounter;
      // if cards match leave them open
           if (openCards.length == 2) {
               if (openCards[0].dataset.card == openCards[1].dataset.card) {
                  openCards[0].classList.add('match');
                  openCards[0].classList.add('open');
                  openCards[0].classList.add('show');

                  openCards[1].classList.add('match');
                  openCards[1].classList.add('open');
                  openCards[1].classList.add('show');

                  openCards = [];

                } else {
                //if cards don't macth Hide
                    setTimeout(function() {
                      openCards.forEach(function(card) {
                        card.classList.remove('open', 'show');
                      });
                openCards = [];

              }, 1000);
            }
          }
        }
  });
  // allCardsMatch(card, openCards);
  /*function allCardsMatch () {
     card = openCards[16];
    if (card.classList.contains('open') && card.classList.contains('show') && card.classList.contains('match')) {
        //modal??
   }*/
});
