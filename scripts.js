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



// the array 'pairs' now contains 12 unique pairs, and the cards on screen. assign each card a unique value
var cardPairings = {

}

  // perhaps create an array for current matches, then check equlity between other arrays in pairs

var currentPairAttempt = [];

/* click handler for selected cards */
$('.card').on('click', function() {

  /* Put card Number selected in variable */
  var cardNumber = $(this).attr('id').substr(5);
  console.log('Selected Card: ' + cardNumber);

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
  handleSelectedCount();
  // no need for else logic, cannot select more than 2, selected ones will be dealth with
});


function handleSelectedCount() {
  if(selectedCardCount == 2) {
    /* log out value of array */
    selectedCardCount = 0;
    checkMatch();
  }
}

/* no logic here yet, but eventually will check for matches */
function checkMatch() {
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
