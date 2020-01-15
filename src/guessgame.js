import compareNumbers from './compareNumbers.js';

// pick number and declare global variables
let correctNumber = Math.ceil(Math.random() * (20));
const input = document.getElementById('guess');
const button = document.getElementById('guessButton');
const restart = document.getElementById('restartButton');
const response = document.getElementById('guessResponse');
const remaining = document.getElementById('remaining');
let guesses = 0;

// initialize DOM
remaining.textContent = 4;
response.textContent = 'I\'ve picked a number. Can you guess it?';

// called from return for win/loss, update guesses and disable form
function disabled() {
    remaining.textContent = '0';
    input.value = '';
    input.disabled = true;
    button.disabled = true;
}

// guess guessed and button clicked, handle it!
button.addEventListener('click', () => {
    // declare variables
    const guess = Number(input.value);
    const comparison = compareNumbers(guess, correctNumber);

    // initialize body class
    document.body.className = '';

    // console.log(compareNumbers(guess, correctNumber));
    
    // validate the user input to be a number between 1 and 20, return if false
    if (comparison === false) {
        input.select();
        document.body.className = 'invalid';
        return response.textContent = 'Invalid guess. Pick a number between 1 and 20!';
    }

    // valid guess, add a tally
    guesses++;

    // check for loss condition first
    if (comparison !== 0 && 4 - guesses === 0){
        document.body.className = 'bad';
        response.textContent = 'You have no guesses remaining! YOU LOSE!';
        return disabled();
    }

    // guess is valid and user hasn't lost, next check if win, else check lower or higher
    if (comparison === 0) {
        document.body.className = 'good';
        response.textContent = `You guessed my number in ${guesses} guesses, it was ${guess}! You WIN!`;
        return disabled();
    } else if (comparison === -1) {
        response.textContent = `${guess} is too low. Guess HIGHER!`;
    } else if (comparison === 1) {
        response.textContent = `${guess} is too high. Guess LOWER!`;
    }

    // update guesses remaining tally
    remaining.textContent = 4 - guesses;
    input.select();
});

// reset game button clicked, handle it!
restart.addEventListener('click', () => {
    // reenable form
    input.removeAttribute('disabled');
    button.removeAttribute('disabled');

    // pick a new number
    correctNumber = Math.ceil(Math.random() * (20));

    // initialize variables and DOM
    guesses = 0;
    remaining.textContent = 4;
    input.value = '';
    document.body.className = '';
    input.select();
    response.textContent = 'I\'ve picked a number. Can you guess it?';
});