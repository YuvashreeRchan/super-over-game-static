const strikeButton = document.getElementById("strike");
const resetButton = document.getElementById("reset");

const $team1Score = document.getElementById("score-team1");
const $team1Wickets = document.getElementById("wickets-team1");

const $team2Score = document.getElementById("score-team2");
const $team2Wickets = document.getElementById("wickets-team2");

const strikeAudio = new Audio("http://bit.ly/so-ball-hit");
const gameOverAudio = new Audio("http://bit.ly/so-crowd-cheer");

let team1Score = 0;
let team1Wickets = 0;

let team2Score = 0;
let team2Wickets = 0;

let team1Balls = 0;
let team2Balls = 0;

let turn = 1;

const possibleOutcomes = [0, 1, 2, 3, 4, 6, "W"];


function updateScore() {
    $team1Score.textContent = team1Score;
    $team1Wickets.textContent = team1Wickets;
    $team2Score.textContent = team2Score;
    $team2Wickets.textContent = team2Wickets;
}

function gameOver() {
    gameOverAudio.play();
    if (team1Score > team2Score) alert("Team 1 wins");
    if (team2Score > team1Score) alert("Team 2 wins");
    if (team2Score === team1Score) alert("It is a draw");
}


resetButton.onclick = () => {
    window.location.reload();
};

strikeButton.onclick = () => {

    strikeAudio.pause();
    strikeAudio.currentTime = 0;
    strikeAudio.play();

    const randomElement =possibleOutcomes[Math.floor(Math.random() * possibleOutcomes.length)];

    if (turn === 1) 
    {
        team1Balls++;
        document.querySelector(`#team1-superover div:nth-child(${team1Balls})`).textContent = randomElement;
    
        if (randomElement === "W")
        {
            team1Wickets++;
        } 
        else {
            team1Score += randomElement;
        }
        if (team1Balls === 6 || team1Wickets === 2) turn = 2;
    }

    if (turn === 2) 
    {
        team2Balls++;
        document.querySelector(`#team2-superover div:nth-child(${team2Balls})`).textContent = randomElement;
        if (randomElement === "W") {
            team2Wickets++;
        }
        else {
            team2Score += randomElement;
        }
        if (team2Balls === 6 ||team2Wickets === 2 ||team2Score > team1Score){
            turn = 3;
            gameOver();
        }
    }

    
    updateScore();
};