import compareNumbers from './compareNumbers.js';

let correctNumber = Math.floor(Math.random() * (20)) + 1;
const response = document.getElementById('guessresponse');
const button = document.getElementById('guessbutton');
//const button2 = document.getElementById('guessbutton');
const input = document.getElementById('guess');
const restart = document.getElementById('restart');
const remaining = document.getElementById('remaining');
remaining.textContent = 4;
let guesses = 0;

function disabled() {
    remaining.textContent = '0';
    input.disabled = true;
    button.disabled = true;
}

button.addEventListener('click', () => {
    const guess = Number(document.getElementById('guess').value);
    const comparison = compareNumbers(guess, correctNumber);

    console.log(compareNumbers(guess, correctNumber));

    //validate the user input to be a number between 1 and 20, return if false
    if (comparison === false) {
        document.body.className = 'warning';
        return response.textContent = 'Enter a number between 1 and 20...';
    }

    //valid guess, add a tally
    guesses++;

    //check for loss condition first
    if (comparison !== 0 && 4 - guesses === 0){
        document.body.className = 'bad';
        response.textContent = 'You have 0 guesses remaining! YOU LOSE!';
        return disabled();
    }

    //so far guess is valid and user hasn't lost, next check if win, else check lower or higher
    if (comparison === 0) {
        document.body.className = 'good';
        response.textContent = 'You guessed it! You WIN!';
        return disabled();
    } else if (comparison === -1) {
        response.textContent = 'Guess is too low. Higher!';
    } else if (comparison === 1) {
        response.textContent = 'Guess is too high. Lower!';
    }

    //update guesses remaining tally
    remaining.textContent = 4 - guesses;
});

// button2.addEventListener('click', () => {
//     const guess = Number(document.getElementById('guess').value);

//     // console.log(`Correct Number: ${correctNumber}`);
//     // console.log(`Guess: ${guess}`);
//     guesses++;
//     if (guesses <= 4 && guess !== correctNumber) {
//         if (guesses === 4) {
//             document.body.className = 'bad';
//             response.textContent = 'You have 0 guesses remaining! YOU LOSE!';
//             return disabled();
//         } else if (guess < 1 || guess > 20) {
//             response.textContent = 'Enter a number between 1 and 20...';
//             guesses--;
//             return;
//         } else if (guess > correctNumber) {
//             response.textContent = 'Guess is too high. Lower!';
//         } else if (guess < correctNumber) {
//             response.textContent = 'Guess is too low. Higher!';
//         } else {
//             response.textContent = 'Enter a NUMBER...';
//             guesses--;
//             return;
//         }
//     } else if (guesses <= 4 && guess === correctNumber) {
//         document.body.className = 'good';
//         response.textContent = 'You guessed it! You WIN!';
//         return disabled();
//     } else { //is it even possible to get here? Hacker.
//         response.textContent = 'How did you get here??';
//         document.body.className = 'bad';
//         return disabled();
//     }

//     //update guesses remaining tally
//     remaining.textContent = 4 - guesses;
// });

restart.addEventListener('click', () => {
    input.removeAttribute('disabled');
    button.removeAttribute('disabled');
    correctNumber = Math.floor(Math.random() * (20)) + 1;
    guesses = 0;
    remaining.textContent = 4;
    input.value = '';
    document.body.className = '';
});