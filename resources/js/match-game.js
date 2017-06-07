$(document).ready(function() {
  var cardValues = MatchGame.generateCardValues();
  $game = $('#game');
  MatchGame.renderCards(cardValues, $game);
});

var MatchGame = {
};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var cardValues = [];
  var alreadyTaken;
  var random;
  var index;
  for (var i=0; i<16;i++) {
    alreadyTaken = true;
    while (alreadyTaken) {
      random = Math.floor(Math.random()*8) +1;
      index = cardValues.indexOf(random);
      alreadyTaken = (index > -1);
      if (alreadyTaken) {
        index = cardValues.indexOf(random, index + 1);
        alreadyTaken = (index > -1);
      }
    }
    cardValues.push(random);
  }
  return cardValues;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  $game.data('flippedCards', []);
  var colors = ['green', 'red', 'yellow', 'black', 'orange', 'brown', 'indigo', 'grey'];
  $game.empty();
  cardValues.forEach (function(value){
    var $card = $('<div class="card"></div>');
    $card.data('value', value);
    $card.data('flipped', false);
    $card.data('color', colors[value-1]);
    $game.append($card);
    $card.on('click', function(){
      MatchGame.flipCard($card, $game);
    });
  });
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if ($card.data('flipped')){
    return;
  }
  $card.text($card.data('value'));
  $card.css('background-color', $card.data('color'));
  $card.data('flipped', true);
  if ($game.data('flippedCards').length === 1) {
    var $anotherCard = $game.data('flippedCards')[0];
    if ($anotherCard.data('value') === $card.data('value')){
      $card.css('background-color', 'lightgrey');
      $card.css('color', 'darkgrey');
      $anotherCard.css('background-color', 'lightgrey');
      $anotherCard.css('color', 'darkgrey');
    }
    else {
      MatchGame.flipBack($card);
      MatchGame.flipBack($anotherCard);
    }
    $game.data('flippedCards', []);
  }
  else {
    $game.data('flippedCards').push($card);
  }
};

MatchGame.flipBack = function($card) {
  window.setTimeout(function() {
    $card.css('background-color', 'blue');
    $card.text("");
    $card.data('flipped', false);
  }, 500);
}
