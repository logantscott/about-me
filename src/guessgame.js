import compareNumbers from './compareNumbers.js';

// pick number and declare global variables
let correctNumber = Math.ceil(Math.random() * (20));
const input = document.getElementById('guess');
const button = document.getElementById('guessButton');
const restart = document.getElementById('restartButton');
const message = document.getElementById('guessMessage');
const remaining = document.getElementById('remaining');
const clickcontainer = document.getElementById('container');
const allowedguesses = 4;
const min = 1;
const max = 20;
let low = min - 1;
let high = max + 1;
let guesses = 0;
// test code for number spans
const spans = document.getElementsByClassName('number');

// function called from win/loss, update remaining and disable form
function disabled() {
    remaining.textContent = '0';
    input.value = '';
    input.disabled = true;
    button.disabled = true;
    clickcontainer.disabled = true;
}
// update messsage function
function newMessage(str) { 
    return message.textContent = str; 
}

// initialize DOM
remaining.textContent = allowedguesses;
newMessage('I\'ve picked a number. Can you guess it?');

// console.log(correctNumber);

// guess guessed and button clicked, handle it!
button.addEventListener('click', () => {
    // declare variables
    const guess = Number(input.value);
    const comparison = compareNumbers(guess, correctNumber, low, high);
    // initialize body class
    document.body.className = '';

    // validate the user input to be a number between 1 and 20, return if false
    if (comparison === false) {
        input.select();
        document.body.className = 'invalid';
        return newMessage(`Invalid guess. Pick a number between ${low + 1} and ${high - 1}!`);
    }

    console.log(low - 1 + ' ' + (high + 1));

    // valid guess, add a tally
    guesses++;

    // check for loss condition first
    if (comparison !== 0 && allowedguesses - guesses === 0){
        document.body.className = 'bad';
        newMessage(`My number was ${correctNumber}. You LOSE!`);
        updateSpans(comparison, guess, correctNumber);
        return disabled();
    }
    // guess is valid and user hasn't lost, next check if win, else check lower or higher
    if (comparison === 0) {
        document.body.className = 'good';
        newMessage(`You guessed my number in ${guesses} ${guesses === 1 ? 'guess' : 'guesses'}, it was ${guess}! You WIN!`);
        updateSpans(comparison, guess);
        return disabled();
    } else if (comparison === -1) {
        low = guess;
        newMessage(`${guess} is too low. Guess HIGHER!`);
    } else if (comparison === 1) {
        high = guess;
        newMessage(`${guess} is too high. Guess LOWER!`);
    }

    // update guesses remaining tally
    remaining.textContent = allowedguesses - guesses;
    input.select();
    updateSpans(comparison, guess);
});

// reset game button clicked, handle it!
restart.addEventListener('click', () => {
    // reenable form
    input.removeAttribute('disabled');
    button.removeAttribute('disabled');

    // pick a new number
    correctNumber = Math.ceil(Math.random() * (20));
    // console.log(correctNumber);

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

// https://stackoverflow.com/questions/19655189/javascript-click-event-listener-on-class
for (let i = 0; i < spans.length; i++) {
    //https://stackoverflow.com/questions/42111854/javascript-addeventlistener-on-all-created-li-elements
    spans[i].addEventListener('click', function(e) {
        if (input.disabled === false && e.target.classList.contains('disable') === false) {
            input.value = e.target.textContent;
            button.click();
        }
    });
}

function updateSpans(comparison, guess, loss) {
    spans[guess - 1].classList.add('guessed');
    if (loss) {
        for (let i = 0; i < spans.length; i++) {
            spans[i].classList.add('disable');
            spans[i].disabled = true;
        }
        spans[loss - 1].classList.add('bad');
    }
    if (comparison === -1) {
        for (let i = 0; i < guess; i++) {
            spans[i].classList.add('disable');
            spans[i].disabled = true;
        }
    } else if (comparison === 1) {
        for (let i = guess - 1; i < spans.length; i++) {
            spans[i].classList.add('disable');
            spans[i].disabled = true;
        }
    } else if (comparison === 0) {
        for (let i = 0; i < spans.length; i++) {
            spans[i].classList.add('disable');
            spans[i].disabled = true;
        }
        spans[guess - 1].classList.add('good');
    }
}