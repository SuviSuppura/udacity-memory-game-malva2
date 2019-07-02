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
// Checking if the flipped cards match
checkingCards();

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

function checkingCards() {
  let allCards = document.querySelectorAll('.card');
  let openCards = [];
  let moves = document.querySelector('.moves');
  let moveCounter = 0;
  moves.innerHTML = moveCounter;
  let timer = setInterval(setTime, 1000);
  let cardPair = 0;
  let stars = document.querySelector('.stars');

  // Stars
function showStars() {
    if (moveCounter == 2) {
      stars.removeChild(stars.lastElementChild);
    } else if (moveCounter == 12) {
      stars.removeChild(stars.lastElementChild);
    }
};
//replay
let replay = document.querySelector('.fa-repeat');

replay.addEventListener('click', function(e) {
  clearInterval(setTime);
  gameOn();
  checkingCards();
});


allCards.forEach(function(card) {
   card.addEventListener('click', function(e) {
     if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
       openCards.push(card);
       card.classList.add('open', 'show');
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
                  cardPair++;

                }
                else {
                //if cards don't match -> Hide
                    setTimeout(function() {
                      openCards.forEach(function(card) {
                        card.classList.remove('open', 'show');
                      });
                openCards = [];

              }, 1000);

            }
            moveCounter++;
            moves.innerHTML = moveCounter;
            showStars(moveCounter);

          }
          else if (cardPair === 2) {
              allCardsMatch(timer, minutesLabel, secondsLabel, moveCounter, stars);
            }

        }

  });


});

//timer
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;

        function setTime() {
          ++totalSeconds;
          secondsLabel.innerHTML = pad(totalSeconds % 60);
          minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
        }

        function pad(val) {
          var valString = val + "";
          if (valString.length < 2) {
            return "0" + valString;
          } else {
            return valString;
          }
        }




};



//modal
function allCardsMatch (timer, secondsLabel, minutesLabel, moveCounter, stars) {
      // Get the modal
      console.log(moveCounter, stars, secondsLabel, minutesLabel);
      clearInterval(timer);
      let modal = document.querySelector('.modal');
      let seconds = secondsLabel;
      let minutes = minutesLabel;
      let time_results_minutes = document.querySelector('#time_results_minutes');
      let time_results_seconds = document.querySelector('#time_results_seconds');
      let moves_results = document.querySelector('.moves_results');
      let stars_results = document.querySelector('.stars_results');
      modal.style.display = "block";
      moves_results.innerHTML = moveCounter;
      time_results_minutes.innerHTML = minutes;
      time_results_seconds.innerHTML = seconds;
      stars_results.innerHTML = stars;

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
    }
