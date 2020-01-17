import compareNumbers from './compareNumbers.js';

// pick number and declare global variables
const input = document.getElementById('guess');
const guessButton = document.getElementById('guessButton');
const restartButton = document.getElementById('restartButton');
const message = document.getElementById('guessMessage');
const remaining = document.getElementById('remaining');
const spans = document.getElementsByClassName('number');

const allowedguesses = 4;
const min = 1;
const max = 20;

let low = min - 1;
let high = max + 1;
let guesses = 0;
let correctNumber = Math.ceil(Math.random() * (max));

// initialize DOM
remaining.textContent = allowedguesses;
newMessage('I\'ve picked a number. Can you guess it?');

// guess guessed and button clicked, handle it!
guessButton.addEventListener('click', () => {
    // get user input and compare against computer
    const guess = Number(input.value);
    const compareResult = compareNumbers(guess, correctNumber, low, high);

    // initialize body class - clears background color
    document.body.className = '';
    
    validateUserInput(compareResult);

    // valid guess, add a tally
    guesses++;

    checkForLoss(compareResult, guess);
    checkForMatch(compareResult, guess);

    // update guesses remaining tally
    remaining.textContent = allowedguesses - guesses;
    input.select();
    updateSpans(compareResult, guess);
});

// validate the user input to be a number between 1 and 20, return if false
function validateUserInput(compareResult) {
    if (compareResult === false) {
        input.select();
        document.body.className = 'invalid';
        return newMessage(`Invalid guess. Pick a number between ${low + 1} and ${high - 1}!`);
    }
}

// check for loss condition first
function checkForLoss(compareResult, guess) {
    if (compareResult !== 0 && allowedguesses - guesses === 0){
        document.body.className = 'bad';
        newMessage(`My number was ${correctNumber}. You LOSE!`);
        updateSpans(compareResult, guess, correctNumber);
        return disabled();
    }
}

// guess is valid and user hasn't lost, next check if win, else check lower or higher
function checkForMatch(compareResult, guess) {
    if (compareResult === 0) {
        document.body.className = 'good';
        newMessage(`You guessed my number in ${guesses} ${guesses === 1 ? 'guess' : 'guesses'}, it was ${guess}! You WIN!`);
        updateSpans(compareResult, guess);
        return disabled();
    } else if (compareResult === -1) {
        low = guess;
        newMessage(`${guess} is too low. Guess HIGHER!`);
    } else if (compareResult === 1) {
        high = guess;
        newMessage(`${guess} is too high. Guess LOWER!`);
    }
}

// reset game button clicked, handle it!
restartButton.addEventListener('click', () => {
    // reenable form
    input.removeAttribute('disabled');
    guessButton.removeAttribute('disabled');

    // pick a new number
    correctNumber = Math.ceil(Math.random() * (20));

    // initialize variables and DOM
    low = min - 1;
    high = max + 1;
    guesses = 0;
    remaining.textContent = allowedguesses;
    input.value = '';
    document.body.className = '';
    input.select();
    newMessage('I\'ve picked a number. Can you guess it?');

    // initialize number select
    for (let i = 0; i < spans.length; i++) {
        spans[i].classList.remove('disable');
        spans[i].removeAttribute('disabled');
        spans[i].classList.remove('good');
        spans[i].classList.remove('bad');
        spans[i].classList.remove('guessed');
    }
});

// https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
// Execute a function when the user releases a key on the keyboard
input.addEventListener('keyup', function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
        event.preventDefault();
      // Trigger the button element with a click
        guessButton.click();
    }
});

// function called from win/loss, update remaining and disable form
function disabled() {
    remaining.textContent = '0';
    input.value = '';
    input.disabled = true;
    guessButton.disabled = true;
}

// update guess result message
function newMessage(str) { 
    return message.textContent = str; 
}

// https://stackoverflow.com/questions/19655189/javascript-click-event-listener-on-class
for (let i = 0; i < spans.length; i++) {
    //https://stackoverflow.com/questions/42111854/javascript-addeventlistener-on-all-created-li-elements
    spans[i].addEventListener('click', function(e) {
        if (input.disabled === false && e.target.classList.contains('disable') === false) {
            input.value = e.target.textContent;
            guessButton.click();
        }
    });
}

function updateSpans(compareResult, guess, loss) {
    spans[guess - 1].classList.add('guessed');
    if (loss) {
        for (let i = 0; i < spans.length; i++) {
            spans[i].classList.add('disable');
            spans[i].disabled = true;
        }
        spans[loss - 1].classList.add('bad');
    }
    if (compareResult === -1) {
        for (let i = 0; i < guess; i++) {
            spans[i].classList.add('disable');
            spans[i].disabled = true;
        }
    } else if (compareResult === 1) {
        for (let i = guess - 1; i < spans.length; i++) {
            spans[i].classList.add('disable');
            spans[i].disabled = true;
        }
    } else if (compareResult === 0) {
        for (let i = 0; i < spans.length; i++) {
            spans[i].classList.add('disable');
            spans[i].disabled = true;
        }
        spans[guess - 1].classList.add('good');
    }
}