/* Global Constants */
var clueHoldTime = 1000;      //how long to hold each clue's light/sound
var cluePauseTime = 333;      //how long to pause in between clues
var nextClueWaitTime = 1000;  //how long to wait before starting playback of the clue sequence
var amountofLives = 3;        //the maximum amount of errors a player may make
var patternMaxAmount = 20;    //the maxmium amount of patterns a player can adjust to
var patternMinAmount = 2;     //the minimum amount of patterns a player can adjust to    
var buttonMaxAmount = 9;      //the maximum amount of buttons a player can adjust to
var buttonMinAmount = 2;      //the minimum amount of buttons a player can adjust to

/* Global Variables */
var pattern = [[], [], [], [], [], [], [], [], []];
var progress = 0;
var gamePlaying = false;

// Sound variables
var tonePlaying = false;
var volume = 0.5;               //must be between 0.0 and 1.0

// Counter variables
var guessCount = 0;
var buttons = 3;                //Initial amount of buttons
var lossCount = 0;              //Tracks the amount of incorrect clicks  
var maxTime = 10;               //Time per player attempt
var patternLength = 2;           //Initial size of patternLength
var highScore = 0;              //Initial highScore
var timeLeft;

var interval_count;
var intervalFlag = true;

clearInterval(interval_count);
console.log("Countdown has been reset");

/* Functions */
function startGame() {
  //initialize game variables
  intervalFlag = true;
  clueHoldTime = 1000;
  cluePauseTime = 333;

  pattern[buttons] = [];
  for (let i = 0; i < patternLength; i++) {
    pattern[buttons].push(Math.floor(Math.random() * buttons) + 1);
  }

  progress = 0;
  gamePlaying = true;

  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  playClueSequence();
}

function stopGame() {
  gamePlaying = false;

  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");

  lossCount = 0;
  changeLives();
}

function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}

function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}

function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

//Player has lost the game
function GameOver(btn) {
  clearInterval(interval_count); //Reset the countdown
  
  lostSound();
  lostImage(btn);
  setTimeout(loseGame, 100);
  
  lossCount = 0;
  changeLives();

  progress = 0;
  updateProgress();
}

function loseGame() {
  window.clearInterval(interval_count);
  stopGame();
  alert("Player has lost.");
  
  timeLeft = maxTime;
  document.getElementById("count").innerHTML = timeLeft;
}

function countDown() {
  timeLeft--;
  document.getElementById("count").innerHTML = timeLeft;
  
  //Player has run out of time, or game is stopped
  if (timeLeft == 0 || gamePlaying == false) {
    clearInterval(interval_count);
    GameOver(1);
  }
}

function playClueSequence() {
  timeLeft = maxTime;
  guessCount = 0;
  let delay = nextClueWaitTime;
  for (let i = 0; i <= progress; i++) {
    console.log("play single clue: " + pattern[buttons][i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[buttons][i]);
    delay += clueHoldTime;
    delay += cluePauseTime;

    //Waiting time is reduced by 5% after every iteration to make it increasingly difficult
    cluePauseTime = cluePauseTime / 1.05;
    clueHoldTime = clueHoldTime / 1.05;
  }
  
  //Ensures only one instance of countdown occuring.
  if (intervalFlag == true || gamePlaying == false) {
    window.interval_count = window.setInterval(countDown, 1000);
  }
  intervalFlag = false;
}

function winGame() {
  window.clearInterval(interval_count);
  highScore = pattern[buttons].length;

  stopGame();
  alert("Player has won!");

  progress = 0;
  updateProgress();
  timeLeft = maxTime;
  document.getElementById("count").innerHTML = timeLeft;
  patternLength++;
}

function guess(btn) {
  console.log("User selected: " + btn);

  if (!gamePlaying) {
    return;
  }

  if (btn == pattern[buttons][guessCount]) {
    timeLeft = maxTime;

    if (guessCount == progress) {
      if (guessCount == pattern[buttons].length - 1) {
        winSound();
        winImage(btn);

        setTimeout(winGame, 100);
        
        lossCount = 0;
        changeLives();
      } else {
        progress++;
        updateProgress();
        
        if (progress > highScore) {
          highScore = progress;
          updateHighScore();
        }

        playClueSequence();
      }
    } else {
      guessCount++;
    }
  } else {
    lossCount++;
    changeLives();

    if (lossCount == amountofLives) {
      GameOver(btn);
    }
  }
}

//Adjust number of buttons
function changeButtons() {
  for (let i = 1; i <= buttons; i++) {
    document.getElementById("button" + i).classList.remove("hidden");
  }

  for (let i = buttons + 1; i <= buttonMaxAmount; i++) {
    document.getElementById("button" + i).classList.add("hidden");
  }
}

function buttonCountDec() {
  if (buttons > buttonMinAmount) {
    buttons--;
    document.getElementById("buttonCounter").innerHTML = buttons;
    console.log("Buttons: " + buttons);

    changeButtons();
  }
}

function buttonCountInc() {
  if (buttons < buttonMaxAmount) {
    buttons++;
    document.getElementById("buttonCounter").innerHTML = buttons;
    console.log("Buttons: " + buttons);

    changeButtons();
  }
}

function changeLives() {
  document.getElementById("lives").innerHTML = 3 - lossCount;
}

//Adjust the number of patterns
function patternCountDec() {
  if (patternLength > patternMinAmount) {
    patternLength--;
    document.getElementById("patternCounter").innerHTML = patternLength;
    console.log("patternLength: " + patternLength);
  }
}

function patternCountInc() {
  if (patternLength < patternMaxAmount) {
    patternLength++;
    document.getElementById("patternCounter").innerHTML = patternLength;
    console.log("patternLength: " + patternLength);
  }
}

function updateHighScore() {
  document.getElementById("highScore").innerHTML = highScore;
}

function updateProgress() {
  document.getElementById("currentScore").innerHTML = progress;
}


/* Functions related to winning and losing */
function winImage(btn) {
  document.getElementById("button" + btn).style.backgroundImage =
    "url('https://cdn.glitch.global/d83d7301-b8aa-4211-9af6-e8af89bb596b/winImage.png?v=1650677058977')";
  setTimeout(resetBackground, 1000, btn);
}

function lostImage(btn) {
  document.getElementById("button" + btn).style.backgroundImage =
    "url('https://cdn.glitch.global/d83d7301-b8aa-4211-9af6-e8af89bb596b/lostImage.png?v=1650677061082')";
  setTimeout(resetBackground, 1000, btn);
}

function resetBackground(btn) {
  document.getElementById("button" + btn).style.backgroundImage = "none";
}

//Audio functions
function startSound() {
  startAudio.play();
}

function winSound() {
  winAudio.play();
}

function lostSound() {
  lostAudio.play();
}

//Volume functions
function volumeLevelDec(){
  if(volume > 0.15){
    volume -= 0.1;
    document.getElementById("volumeLevel").innerHTML = volume;
  }
}

function volumeLevelInc(){
  if(volume < .9){
    volume += 0.1;
    document.getElementById("volumeLevel").innerHTML = volume;
  }
}

// Sound Synthesis Functions
const freqMap = {
  1: 150,
  2: 200,
  3: 250,
  4: 300,
  5: 350,
  6: 400,
  7: 450,
  8: 500,
  9: 550
};

function playTone(btn, len) {
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  tonePlaying = true;
  setTimeout(function() {
    stopTone();
  }, len);
}

function startTone(btn) {
  if (!tonePlaying) {
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    tonePlaying = true;
  }
}

function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}

//Page Initialization
//Init Sound Synthesizer
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);

/* Audio files */
var startAudio = new Audio("https://cdn.glitch.global/d83d7301-b8aa-4211-9af6-e8af89bb596b/startGame.mp3?v=1650679023478");
var winAudio = new Audio("https://cdn.glitch.global/d83d7301-b8aa-4211-9af6-e8af89bb596b/BigSuccess.mp3?v=1650676749855");
var lostAudio = new Audio("https://cdn.glitch.global/d83d7301-b8aa-4211-9af6-e8af89bb596b/Negative.mp3?v=1650676752293");