const cards = document.querySelectorAll('.cards-container');
let score = document.querySelector('#score-value');
let userScore = 0;
let winGame = document.querySelector(".win")
let reset = document.querySelector('.reset')
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let openCards = 0;

function flipCard() {
    if (lockBoard) return;
    if(this === firstCard) return;
    
    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    hasFlippedCard = false;
    secondCard = this;

    checkMatch();
}

function checkMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();

    if(isMatch) {
        userScore++; 
        score.textContent = userScore;
        openCards = openCards + 2;
        if(openCards === cards.length) {
            winGame.innerHTML = "<h2> You Win! </h2>" 
        }
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1200);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}   

function resetGame() {
    setTimeout(() => {
        cards.forEach(card => {
            card.classList.remove('flip');
            card.addEventListener('click', flipCard);
        });
        shuffle();
        openCards = 0;
        userScore = 0;
        score.textContent = userScore;
        winGame.innerHTML = "";
    }, 1000);
}

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}

cards.forEach(card => card.addEventListener('click', flipCard));
reset.addEventListener('click', resetGame);

let myAudio = document.querySelector(".play");
myAudio.addEventListener("click", togglePlay)

let audio = new Audio("./sound/kiss.mp3")
let isPlaying = false;
function togglePlay() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false
        myAudio.textContent = "Play"
    } else {
        audio.play();
        isPlaying = true;
        myAudio.textContent = "Pause"
    }
}

shuffle();