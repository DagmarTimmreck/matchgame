var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready(function() {
  $game = $('#game');
  MatchGame.renderCards(MatchGame.generateCardValues(), $game);
});


/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function() {
  var values = [];
  for (var i = 1; i <= 8; i++) {
    values.push(i);
    values.push(i);
  }
  var shuffled = [];
  while (values.length > 0){
    var index = Math.floor(Math.random()*values.length);
    shuffled.push(values[index]);
    values.splice(index, 1);
  }
  return shuffled;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  $game.data('flippedCards', []);
  $game.empty();
  for (var i = 0; i < 16; i++) {
    var $card = MatchGame.createCard(cardValues[i]);
    $game.append($card);

  }
};

MatchGame.createCard = function(value) {
  var colors = ['green', 'red', 'yellow', 'black', 'orange', 'brown', 'indigo', 'grey'];
  var $card = $('<div class="card"><div>');
  $card.data('value', value);
  $card.data('flipped', false);
  $card.data('color', colors[value - 1]);
  $card.on('click', function() {
    MatchGame.flipCard($card, $game);
  });
  return $card;
}

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if ($card.data('flipped')) {
    return;
  }
  MatchGame.flip($card);
  var flipped = $game.data('flippedCards');
  flipped.push($card);
  if (flipped.length === 2) {
    var $anotherCard = flipped[0];
    if ($card.data('value') === $anotherCard.data('value')) {
      MatchGame.matched($card);
      MatchGame.matched($anotherCard);

    } else {
      window.setTimeout(function () {
        MatchGame.unflip($card);
        MatchGame.unflip($anotherCard);
      }, 500);
    }
    $game.data('flippedCards', []);
  }
};

MatchGame.flip = function($card) {
  $card.css('background-color', $card.data('color'));
  $card.text($card.data('value'));
  $card.data('flipped', true);
}

MatchGame.unflip = function($card) {
  $card.css('background-color', 'rgb(32, 64, 86)');
  $card.empty();
  $card.data('flipped', false);
}

MatchGame.matched = function($card) {
  $card.css('background-color', 'rgb(153, 153, 153)');
  $card.css('color', 'grey');
}
