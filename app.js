var wakeuptime = 7;
var noon = 12;
var lunchtime = 12;
var naptime = lunchtime + 2;
var partytime;
var evening = 18;
var oneSecond = 1000;
var countdownEl = document.getElementById('countdown');
var currentRoundEl = document.getElementById('currentRound');
var restCountdown = document.getElementById('restCountdown');
let timeRest;
let timeRound;
let counter;
 mySound = new Audio('boxing-bell.mp3');
//Creates the clock
var showCurrentTime = function() {
  var clock = document.getElementById('clock');
  var currentTime = new Date();

  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();
  var meridian = "AM";

  //set hours
  if (hours >= noon) {
    meridian = "PM";
  }
  if (hours > noon) {
    hours = hours - 12;
  }

  //set minutes
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  //set seconds
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  // put together the string that displays the time
  var clockTime = hours + ':' + minutes + ':' + seconds + " " + meridian;
  clock.innerText = clockTime;
};


//Getting the clock to increment on its own and change out messages
// and pictures
var updateClock = function() {
  var time = new Date().getHours();

  var messageText;
  var image = "https://i.insider.com/5d15e8c827b65233b11ff379?width=1400&format=jpeg&auto=webp";
  var timeEventJS =
  document.getElementById("timeEvent");
  var fighter = image;

  showCurrentTime();
};
updateClock();

// getting the colock to increment once a seconds
setInterval(updateClock, oneSecond);




// assign buttons to variables
var startTimerButton =
document.getElementById("startTimerButton");
var stopTimerButton =
document.getElementById("stopTimerButton");
var resetbutton =
document.getElementById("resetTimerButton");

let startingMinutes;

document.getElementById('lenOfRounds').addEventListener('change', e => {
    var startingRoundMinutes = +e.target.value;
    timeRound = startingRoundMinutes * 60;
  });

document.getElementById('noOfRounds').addEventListener('change', e => {
    var roundNumbervar = +e.target.value;
    roundNumber = roundNumbervar;
});

document.getElementById('lenOfRest').addEventListener('change', e => {
  var startingRestMinutes = +e.target.value;
  timeRest = startingRestMinutes;
});




//Overhead timer function all other timer function called from here
function controlTimer() {
  counter = roundNumber;

  if (counter > 0) {
    displayRounds();
  }
  else {
    clearInterval();
    currentRoundEl.innerHTML = `${counter}: Rounds left`;
  }
};

//shows round number and calls for rest timer
function displayRounds() {
  currentRoundEl.innerHTML = `${roundNumber}: Rounds left`;
  displayRestTimer();
}

//shows rest time and calls work timer
function displayRestTimer() {
  timeRest1 = timeRest;
  intervalRest = setInterval(() => {

      var seconds = timeRest1;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      countdownEl.innerHTML = `00:${seconds}`;

      if (timeRest1 <= 0) {
        clearInterval(intervalRest);
        displayRoundTimer();
      }  else {
        timeRest1--;
      }
    }, oneSecond)
};







// shows work time once time equals zero decrement roundNumber and start process
//over
function displayRoundTimer() {

    timeRound1 = timeRound;
    intervalRound = setInterval(() => {

      var minutes = Math.floor(timeRound1 / 60);
      var seconds = timeRound1 % 60;

      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      countdownEl.innerHTML = `${minutes}:${seconds}`;

      if (timeRound1 <= 0) {
        mySound.play();
        clearInterval(intervalRound);
        roundNumber--;
        controlTimer();
      } else {
        timeRound1--;
      }
    }, oneSecond)
};


//event listeners added to all three buttons
startTimerButton.addEventListener('click', () => {
  startTimerButton.disabled = true;
  controlTimer();
});


stopTimerButton.addEventListener('click', () => {
  clearInterval(intervalRound);
  clearInterval(intervalRest);
  startTimerButton.disabled = false;
});


resetTimerButton.addEventListener('click', () => {
  clearInterval(intervalRound);
  clearInterval(intervalRest);
  startTimerButton.disabled = false;
  document.getElementById('lenOfRounds').value = '';
  document.getElementById('noOfRounds').value = '';
  document.getElementById('lenOfRest').value = '';
  countdownEl.innerHTML = '00:00';
  currentRoundEl.innerHTML = '0: ROUNDS LEFT';
});
