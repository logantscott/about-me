import isYes from './is-yes.js'

const button = document.getElementById('quizbutton')

button.addEventListener('click', () => {
    const testq = prompt("put yes");

    if(isYes(testq)) alert('yay!');
})