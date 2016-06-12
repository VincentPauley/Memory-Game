// 6 Pairs
var pairOne = {
  'location-one' : '',
  'location-two' : ''
}
var pairTwo = {
  'location-one' : '',
  'location-two' : ''
}
var pairThree = {
  'location-one' : '',
  'location-two' : ''
}
var pairFour = {
  'location-one' : '',
  'location-two' : ''
}
var pairFive = {
  'location-one' : '',
  'location-two' : ''
}
var pairSix = {
  'location-one' : '',
  'location-two' : ''
}

// GOLBALS
var selectedCards = 0;

// trigger for card being pressed
$('.card').on('click', function() {
  selectCard($(this));
});

// select card
function selectCard(chosenCard) {

  if(selectedCards == 2) {

  } else {
    selectedCards += 1;
    chosenCard.addClass('selected');
  }
  alert(selectedCards);
}


// reset selected cards and unselect all cards
selectedCards = 0;
$('.card').removeClass('selected');



// scoreboard elements
var visibleCardDisplay = $('#active-Cards > span');

/*

A Card is either:

- hidden
- showing
- already matched

// pseudo

- click and reveal card, if it is the first card keep it showing

- click and reveal second card

- compare with first card

  if(the two cards match) {
    - they remain visible and are removed the class of unknown cards
    - 
  }



*/
