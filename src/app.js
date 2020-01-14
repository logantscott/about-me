import { isYes, isNo } from './is-yes.js';

const button = document.getElementById('quizbutton');
const quizmsg = document.getElementById('quizResults');

button.addEventListener('click', () => {

    //prompt & store result
    const uname = prompt("What is your name?") || "Human";
    const ready = confirm(`${uname}, are you ready to take this quiz?`);
    if(!ready) return;
    const question1 = prompt(`${uname}, put yes`);
    const question2 = prompt(`${uname}, put no`);
    const question3 = prompt(`${uname}, put yes`);
    alert('See below for your results!');
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    quizmsg.style.display = 'block';    //do ifYes and total the results
    let results = 0;
    let questions = 0;
    isYes(question1) ? results++ : questions++;
    isNo(question2) ? results++ : questions++;
    isYes(question3) ? results++ : questions++;
    //total questions asked
    questions = questions + results;

    //display results
    console.log(results);

    if (results / questions >= .7) {
        quizmsg.className = 'good';
        quizmsg.innerText = `${uname}, you got ${results} out of ${questions} questions correct! You scored ${(results / questions).toFixed(2) * 100}%. Good job!`;
    } else {
        quizmsg.className = 'bad';
        quizmsg.innerText = `${uname}, you got ${results} out of ${questions} questions correct. You scored ${(results / questions).toFixed(2) * 100}%. You can do better.`;
    };
});