//export func goes here

export default function compareNumbers(guess, correctNumber) {
    if (!Number.isInteger(guess) || !guess || guess > 20 || guess < 1) return false;
    if (guess === correctNumber) {
        console.log('you win!');
        return 0;
    } else if (guess < correctNumber) {
        console.log('Too low. Guess higher.');
        return -1;
    } else if (guess > correctNumber) {
        console.log('Too high. Guess lower.');
        return 1;
    }
}