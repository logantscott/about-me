// func to compare guess with correct number
export default function compareNumbers(guess, correctNumber) {
    if (!Number.isInteger(guess) || !guess || guess > 20 || guess < 1) return false;
    if (guess === correctNumber) return 0;
    else if (guess < correctNumber) return -1;
    else if (guess > correctNumber) return 1;
    else return false;
}