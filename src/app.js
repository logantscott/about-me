import isYes from './is-yes.js'

const button = document.getElementById('quizbutton')

button.addEventListener('click', () => {
    //prompt
    //store result
    //do ifYes
    //get score
    const question1 = prompt("put yes");
    const question2 = prompt("put no");
    const question3 = prompt("put yes");
    let results = 0;
    if(isYes(question1) === true) results++;
    if(!isYes(question2) === true) results++;
    if(isYes(question3) === true) results++;
    console.log(results);
    document.getElementById('quizResults').innerText = `You got ${results} questions correct!`;
})