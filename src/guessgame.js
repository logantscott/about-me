import compareNumbers from './compareNumbers.js';

// pick number and declare global variables
let correctNumber = Math.ceil(Math.random() * (20));
const input = document.getElementById('guess');
const button = document.getElementById('guessButton');
const restart = document.getElementById('restartButton');
const message = document.getElementById('guessMessage');
const remaining = document.getElementById('remaining');
let guesses = 0;

// function called from win/loss, update remaining and disable form
function disabled() {
    remaining.textContent = '0';
    input.value = '';
    input.disabled = true;
    button.disabled = true;
}

// update messsage function
function newMessage(str) { 
    return message.textContent = str; 
}

// initialize DOM
remaining.textContent = 4;
newMessage('I\'ve picked a number. Can you guess it?');

console.log(correctNumber);

// guess guessed and button clicked, handle it!
button.addEventListener('click', () => {
    // declare variables
    const guess = Number(input.value);
    const comparison = compareNumbers(guess, correctNumber);

    // initialize body class
    document.body.className = '';

    // validate the user input to be a number between 1 and 20, return if false
    if (comparison === false) {
        input.select();
        document.body.className = 'invalid';
        return newMessage('Invalid guess. Pick a number between 1 and 20!');
    }

    // valid guess, add a tally
    guesses++;

    // check for loss condition first
    if (comparison !== 0 && 4 - guesses === 0){
        document.body.className = 'bad';
        newMessage('You LOSE!');
        return disabled();
    }

    // guess is valid and user hasn't lost, next check if win, else check lower or higher
    if (comparison === 0) {
        document.body.className = 'good';
        newMessage(`You guessed my number in ${guesses} ${guesses === 1 ? 'guess' : 'guesses'}, it was ${guess}! You WIN!`);
        return disabled();
    } else if (comparison === -1) {
        newMessage(`${guess} is too low. Guess HIGHER!`);
    } else if (comparison === 1) {
        newMessage(`${guess} is too high. Guess LOWER!`);
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
    console.log(correctNumber);

    // initialize variables and DOM
    guesses = 0;
    remaining.textContent = 4;
    input.value = '';
    document.body.className = '';
    input.select();
    newMessage('I\'ve picked a number. Can you guess it?');
});