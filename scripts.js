/* GLOBALS */
var i;
var index; // need two 'i's for nested array purposes
var selectedCardCount = 0;

// 24 cards, 24 numbers defined in this array, randomly assigned to 12 pairs later on
var numberArray = [];

/* push the amount of cards into the number array */
for(i=1;i<25;i++) {
  numberArray.push(i);
}

/* this array will store the pairs */
var pairs = [];


/* make twelve pairs of random numbers from the array */
for(index=0;index<13;index++) {

  /* vars used to build the arrays in each loop */
  var pair = '';
  var one;
  var two;

  /* grab 2 numbers from the array and push JSON object into pairs array */
  for(i=0;i<2;i++) {
    /* randomly assign a number from the array index */
    var randomArrayIndex = Math.floor(Math.random() * numberArray.length);
    // grab random number item from array
    var randomItem = numberArray[randomArrayIndex];
    // remove that item
    numberArray.splice(randomArrayIndex, 1);
    /* add to either first or second pair */
    if (i == 0) {
      one = randomItem;
    } else {
      two = randomItem;
      pair = [one, two];
      pairs.push(pair);
    }
  }
}

/* log out pairs array during development */
console.log(pairs);
console.log(numberArray.length);


/* place all 24 cards on screen */
var cardCount = 24;

for(i=0;i<cardCount;i++) {
  $('#play-area').append('<div class=\'card\' id=\'card-' + (i + 1) + '\'></div>');

  // start new row
  if(i == 7 || i == 15) {
    $('#play-area').append('<br />');
  }
}

/* put numbers into card pairings */
for(i=0;i<pairs.length;i++) {
  var firstOfPair = pairs[i][0],
      secondOfPair = pairs[i][1];

  $('#card-' + firstOfPair).append('<p>' + (i + 1) + '</p>');
  $('#card-' + secondOfPair).append('<p>' + (i + 1) + '</p>');
}

/* -----------------------------------------
 locic for user actions
 ---------------------- */

/* stores the cards currently selected by player, 2 cards max */
var currentPairAttempt = [];

/* click handler for selected cards */
$('.card').on('click', function() {
  /* ensure card has is not already part of a matched set */
  if(!$(this).hasClass('matched-card')) {
    /* Put card Number selected in variable */
    var cardNumber = $(this).attr('id').substr(5);

    /* only two cards can be selected */
    if(selectedCardCount < 2) {
      /* check and ensure that card is not already selected */
      if($(this).hasClass('selected-card')) {
        alert('this card is already selected!');
      } else {
          $(this).addClass('selected-card');
          selectedCardCount += 1; // increment card count
          // push selection into array
          currentPairAttempt.push(cardNumber);
      }
    }
    checkCurrentSelections();
  }
});


function checkCurrentSelections() {
  if(selectedCardCount == 2) {
    /* pull out numbers from the attempt array */
    var attemptFirstSelection = currentPairAttempt[0],
        attemptSecondSelection = currentPairAttempt[1];

    /* check attempt pair against the matches array */
    for(i=0;i<pairs.length;i++) {
      var match = false,
          matchCase = 0;
      /* pull numbers out of each actual pair */
      var firstActual = pairs[i][0],
          secondActual = pairs[i][1];

      if((attemptFirstSelection == firstActual || attemptFirstSelection == secondActual) && (attemptSecondSelection == firstActual || attemptSecondSelection == secondActual)) {
        /* We have a match! */
        console.log('pair ' + i + ' is a match!!!');
        match = true;
        matchCase = i;
        break;
      } else {
        /* not a match */
      }
    }
    /* call appropriate function weather the selection was correct or not */
    if(match) {
      handleMatch(matchCase, currentPairAttempt);
    } else {
      handleNoMatch();
    }
    selectedCardCount = 0;
  }
}

function handleMatch(matchingPair, matchingPairNumbers) {
  console.log('MATCH!!! ' + matchingPair + ' is a match!');

  var cardOne = 'card-' + matchingPairNumbers[0],
      cardTwo = 'card-' + matchingPairNumbers[1]

  $('#' + cardOne).addClass('matched-card');
  $('#' + cardTwo).addClass('matched-card');


  /* remove matching pair from pairs array */
  pairs.splice(matchingPair, 1);

  reset();
}

function handleNoMatch() {
  console.log('no match :(');
  reset();
}




/* no logic here yet, but eventually will check for matches */
function reset() {
  console.log('current match attempt: ' + currentPairAttempt);
  // clear selected pair array
  currentPairAttempt = [];
  // flip cards back over
  setTimeout(clearCards, 1000);
}

/* flip all cards back over */
function clearCards() {
  $('.card').removeClass('selected-card');
}

/* OPEN ITEMS

- game-breaking bug where you can click more than two items while the check match is running, it screws everything up.  Need to make items unclickable!

*/
