$(document).ready(function($) {

  // establish original guess queue
  let guesses = 8;  

  // alphabet var to loop over for button generation
  let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  let alphabetUpper = arrayToUppercase(alphabet);

  function arrayToUppercase(array) {
    let arrayUpper = array.map(function(elem, index) {
      return elem.toUpperCase();
    })
    return arrayUpper;
  }


  // filter words > 3
  let filteredWords = [];
  commonWords.forEach( function(word, index) {
    if (word.length > 3) {
      filteredWords.push(word);
    }
  });

  let wordsUpper = arrayToUppercase(filteredWords);

  let word = '';
  let wordChars = '';
  let $guessDisplay = '';
  let $empty = [];

  function startNewGame(){
    // select random word from filtered array
    word = _.sample(wordsUpper);
    // split characters into array
    wordChars = word.split('');
    console.log(word);
    console.log(wordChars);  
    // generate blanks per letter of word
    $guessDisplay = $('.guesses').find('h1');
    $empty = Array(wordChars.length).fill('_');
    $guessDisplay.text($empty.join(' '));
    // console.log($empty);
    $('.chosen').removeClass('chosen');
  };

  startNewGame();

  // turns left div
  let $turnsLeft = $(`<h2>${guesses}</h2>`);
  $turnsLeft.appendTo('.turns-left');


  function updateDisplay(value) {
    $turnDisplay = $('.turns-left').find('h2');
    $turnDisplay.text(value);    
  }


  // generate keyboard
  function generateKeyboard () {
    for (var i = 0; i < alphabetUpper.length; i++) {
      let $charBtn = $('<input type="button" class="btn" />');
      $charBtn.val(alphabetUpper[i]);
      $charBtn.appendTo('.container');
    }
  }
  generateKeyboard();


  let letterGuessed = '';
  // bind guess function to click event on btn
  let $clickBtn = $('.btn');

  // bind function
  $clickBtn.click(function guess(event) {
    letterGuessed = event.target.value;
    $(event.target).addClass('chosen');
    $(event.target).unbind('click');
    
    if (wordChars.includes(letterGuessed)) {
      guessCorrect();
    } else {
      guessIncorrect();
    }

    console.log(letterGuessed);
    return letterGuessed;
  });




  // function to run if guess is incorrect
  let $loserDiv = $('<h4 class="loser animated fadeInDownBig">Womp womp. Better luck next time!</h4>');
  
  function guessIncorrect() {
    guesses = guesses - 1;
    if (guesses <= 0) {
      guesses = guesses - 1;
      $loserDiv.appendTo('.guesses');
      setTimeout(function(){ $playNewGame.appendTo('.guesses'); }, 2000);
      $playNewGame.addClass('pulse');
    } else {
      console.log('guesses left:', guesses);
      updateDisplay(guesses);
    }
  }


  let  $playNewGame = $("<a href='#' class='play-again animated fadeInDown'>Play Again &#8674;</a>");
  
  $playNewGame.click(function() {
    event.preventDefault();
    newGame(event);
    console.log('link clicked play button')
  });




  let $winnerDiv = $('<h4 class="winner animated fadeInDownBig">You smart! You loyal! You a genius!</h4>');
  // function to run if guess is correct
  function guessCorrect() {
    wordChars.forEach( function(element, index, array) {
      if (element === letterGuessed) {
        console.log('guess correct index', index);
        $empty[index] = letterGuessed;
        $guessDisplay.text($empty.join(' '));

        if (_.includes($empty, '_', [fromIndex=0]) === false) {
          $winnerDiv.appendTo('.guesses');
          $guessDisplay.addClass('animated jello');
          setTimeout(function(){ $playNewGame.appendTo('.guesses'); }, 2000);
          $playNewGame.addClass('pulse');
        }
      } 
    });
    console.log('guesses left:', guesses);
    updateDisplay(guesses);
  }



  function newGame() {
    updateDisplay(8);
    $playNewGame.detach();
    $winnerDiv.detach();
    $loserDiv.detach();
    startNewGame();
    // todo: remove animation classes from text
  }


  // setup key presses
  $('body').on( "keyup", function(event) {
    // guess(event);
    console.log(event.which, event.type);
    console.log(String.fromCharCode(event.which));
  });

});
