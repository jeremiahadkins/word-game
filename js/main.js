$(document).ready(function($) {

  // establish original guess queue
  let guesses = 8;  

  // alphabet var to loop over for button generation
  let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  // filter words > 3
  let filteredWords = [];
  commonWords.forEach( function(word, index) {
    if (word.length > 3) {
      filteredWords.push(word);
    }
  });



  // select random word from filtered array
  let word = _.sample(filteredWords);

  // split characters into array
  let wordChars = word.split('');
  
  console.log(word);
  console.log(wordChars);  



  // turns left div
  let $turnsLeft = $(`<h2>Guesses left: ${guesses}</h2>`);
  $turnsLeft.appendTo('.turns-left');


  function updateDisplay(value) {
    $turnDisplay = $('.turns-left').find('h2');
    $turnDisplay.text('Guesses left: ' + value);    
  }



  // generate blanks per letter of word
    let $guessDisplay = $('.guesses').find('h1');
    let $blank = Array(wordChars.length).fill('_');
    $guessDisplay.text($blank.join(' '));
    console.log($blank);



  // generate keyboard
  function generateKeyboard () {
    for (var i = 0; i < alphabet.length; i++) {
      let $charBtn = $('<input type="button" class="btn" />');
      $charBtn.val(alphabet[i]);
      $charBtn.appendTo('.container');
    }
  }
  generateKeyboard();

  // bind guess function to click event on btn
  let $clickBtn = $('.btn');
  $clickBtn.click(function guess(event) {
    let letterGuessed = event.target.value;
    
    if (wordChars.includes(letterGuessed)) {
      guessCorrect();
    } else {
      guessIncorrect();
    }

    console.log(letterGuessed);
    return letterGuessed;
  });



  // function to run if guess is incorrect
  function guessIncorrect() {
    guesses = guesses - 1;
    if (guesses <= 0) {
      updateDisplay('YOU LOSER');
    } else {
      console.log('guesses left:', guesses);
      updateDisplay(guesses);
    }
  }



  // function to run if guess is correct
  function guessCorrect() {
    console.log('guesses left:', guesses);
    updateDisplay(guesses);
  }

});
