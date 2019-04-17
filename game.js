//Global Variables - Grab the cards from the DOM
const cards                 = document.querySelectorAll('.memory-card');
const TOTAL_COUPLES_COUNT   = 6;
const playAgain             = document.querySelector('.replay');
const winnerText            = document.querySelector('.winner-text');
const timerMinutes          = document.querySelector('.minutes');
const timerSeconds          = document.querySelector('.seconds');
randomizeCards();

//Audio Files
let winnerSound = new Audio('sounds/winner.wav');

//Cards Variables
let flippedCount    = 0;
let lockBoard       = false;
let hasFlippedCard  = false;
var firstCard, secondCard;
let timerTime       = 00;
let isRunning       = false;
let interval;

//Game Function's
function flipTheCard() {
    if(this.classList.contains('flipped')) return;
    if (lockBoard) return;
    this.classList.add('flipped');
    if (this === firstCard) return;

    if (!hasFlippedCard) {
        //First Click
        hasFlippedCard = true;
        firstCard = this;
        console.log('first card');
        return;
    } 
    //Second Click  
    secondCard = this;
    console.log('second card');
    //Check if The cards are matched
     checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        resetBoard();
        //It's a Match
        flippedCount++;
    } else {
        //Not a Match
        unFlippedCard();
    }
    if (flippedCount === TOTAL_COUPLES_COUNT) {
        //Winner
        replayButton();
        winnerSound.play();
        console.log('Winner');
        clearInterval(interval);
    }
}

function unFlippedCard() {
    //Not a Match
    lockBoard = true;
    // wrongSound.play();
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 700);

}

function replayButton() {
    playAgain.style.display  = 'block';
    winnerText.style.display = 'block';
    userRating();
}

function resetBoard() {
    hasFlippedCard  = false;
    lockBoard       = false;
    firstCard       = null;
    secondCard      = null;
}

function resetTheGame() {
    hasFlippedCard         = false;
    lockBoard              = false;
    firstCard              = null;
    secondCard             = null;
    flippedCount           = 0;
    timerTime              = 00;
    timerSeconds.innerHTML = '00';
    timerMinutes.innerHTML = '00';
}

function randomizeCards() {
    cards.forEach(card => {
        randomNum = Math.floor(Math.random() * 12);
        card.style.order = randomNum;
    });
}

function restartTheTimer() {
    if(!isRunning) return;
    isRunning = false;
}

function startTimer() {
    if(isRunning) return;
    isRunning = true;
    interval  = setInterval(incrementTimer, 1000);
}

function padding(number){
    return (number < 10) ? '0' + number : number;
}

function incrementTimer () {
    timerTime++;
    
    const numOfMinutes     = Math.floor(timerTime / 60);
    const numOfSeconds     = timerTime % 60;

    timerSeconds.innerHTML = padding(numOfSeconds);
    timerMinutes.innerHTML = padding(numOfMinutes);  
}


function userRating() {
    if (timerTime <= 25 ) {
        winnerText.innerHTML = 'You Rock! 🤙'; 
    }
    if (timerTime >= 26 && timerTime <= 59) {
        winnerText.innerHTML = 'To Slow! 😣'; 
    } 
    if (timerTime >= 60) {
        winnerText.innerHTML = 'REALLY Slow! 😑'; 
    }
}



//My Event Listener's
playAgain.addEventListener('click', function () {
    for (var i = 0; i < cards.length; i++) {
        cards[i].classList.remove('flipped');
    }
    randomizeCards();
    resetTheGame();
    restartTheTimer();
    playAgain.style.display  = 'none';
    winnerText.style.display = 'none';
});

cards.forEach(card => card.addEventListener('click', flipTheCard));

cards.forEach(card => card.addEventListener('click', startTimer));