// func to compare guess with correct number
export default function compareNumbers(guess, correctNumber, low, high) {
    if (!Number.isInteger(guess) || !guess || guess >= high || guess <= low) return false;
    if (guess === correctNumber) return 0;
    else if (guess < correctNumber) return -1;
    else if (guess > correctNumber) return 1;
    else return false;
}