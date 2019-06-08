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
// Stars
showStars();
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

                } else {
                //if cards don't macth Hide
                    setTimeout(function() {
                      openCards.forEach(function(card) {
                        card.classList.remove('open', 'show');
                      });
                openCards = [];

              }, 1000);
            }
            moveCounter++;
            moves.innerHTML = moveCounter;
          }
        }


        //if (openCards.length == 16) {
          //allCardsMatch();
        //}
  });
  let time = document.querySelector('.time_spent');
  let timeSpent = 0;

  card.addEventListener('click', function() {
      if (!timer) {
          startTimer();
        }
      });

  function startTimer() {
      timer = setInterval(function() {
        if (openCards.length < 16) {
            time++;
        time_spent.innerHTML = time;
          }
        });
    };
});
}


function allCardsMatch () {
      modal.style.display = "block";
     }



let stars = document.querySelectorAll('.stars');

function showStars(moveCounter) {
    if (moveCounter == 4) {
        return stars.innerHTML = stars.removeChild(stars.children[0]);
           }
    else if (moveCounter == 6) {
        return stars.innerHTML = stars.removeChild(stars.children[0]);
           }
       };

//replay
let replay = document.querySelector('.fa-repeat');
replay.addEventListener('click', function(e) {
gameOn();
checkingCards();
});


// Get the modal
let modal = document.querySelector('.modal');
let time_results = document.querySelector('.time_results');
let move_results = document.querySelector('.move_results');
let stars_results = document.querySelector('.stars_results');
// Get the button that opens the modal
//var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
//var span = document.getElementsByClassName("close")[0];

 //When the user clicks on the button, open the modal
//btn.onclick = function() {
  //modal.style.display = "block";
//}

// When the user clicks on <span> (x), close the modal
//span.onclick = function() {
  //modal.style.display = "none";
//}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
