/* GLOBALS */
var i;
var selectedCardCount = 0;

/* place all 24 cards on screen */
var cardCount = 24;

for(i=0;i<cardCount;i++) {
  $('#play-area').append('<div class=\'card\' id=\'card-' + (i + 1) + '\'></div>');

  // start new row
  if(i == 7 || i == 15) {
    $('#play-area').append('<br />');
  }
}

/* click handler for selected cards */
$('.card').on('click', function() {

  /* only two cards can be selected */
  if(selectedCardCount < 2) {
    /* check and ensure that card is not already selected */
    if($(this).hasClass('selected-card')) {
      alert('this card is already selected!');
    } else {
        $(this).addClass('selected-card');
        selectedCardCount += 1;
    }
  }
  handleSelectedCount();
  // no need for else logic, cannot select more than 2, selected ones will be dealth with
  console.log(selectedCardCount);
});


function handleSelectedCount() {
  if(selectedCardCount == 2) {
    selectedCardCount = 0;
    checkMatch();
  }
}

/* no logic here yet, but eventually will check for matches */
function checkMatch() {
  setTimeout(clearCards, 1000);
}

/* flip all cards back over */
function clearCards() {
  $('.card').removeClass('selected-card');
}
