//..............settings box logic................

let settings_button = document.getElementById('settings-icon');
let close_button = document.getElementById('close-icon');
let settings_Box = document.getElementById('settings-box');

function showSettingsBox(){
    settings_Box.style.display = "flex";

}

function hideSettingsBox(){
    settings_Box.style.display= 'none';
}

//.........all style and color changes logic..........

// var r= document.querySelector(':root');
// var rProperties = getComputedStyle(r);
// var rValues = rProperties.getPropertyValue('--primary-font-family');   
// r.style.setProperty('--primary-font-family','spaceMonoBold');
// var rValues = rProperties.getPropertyValue('--primary-font-family');


//..............selecting minutes logic..............

var pomodoroMinutes = 0;
var longBreakMinutes = 0;
var shortBreakMinutes = 0;
var seconds = 0;

var OutputMinutes = document.getElementById('minutes');
var OutputSeconds = document.getElementById('seconds');

var pomodoroInput = document.getElementById('pomodoro');
var shortBreakInput = document.getElementById('short-break');
var longBreakInput = document.getElementById('long-break');

// var testNumber = 5;
// OutputMinutes.innerHTML = '0' + testNumber;

function ApplyChanges(){
   
    changeFonts();
    changeColor();
    hideSettingsBox();
    displayTimerofMinClicks();
}

// Get references to the buttons
var pomodoroButton = document.getElementById('pomodoro-button');
var shortBreakButton = document.getElementById('short-break-button');
var longBreakButton = document.getElementById('long-break-button');

// click event listener to the buttons to make them active and display the time of the various button 
pomodoroButton.addEventListener('click', function() {
    setActiveButton(pomodoroButton);
    pauseCountdown();
    resetCountdown();
    displayTimerofMinClicks();
  });

  shortBreakButton.addEventListener('click', function() {
    setActiveButton(shortBreakButton);
    pauseCountdown();
    resetCountdown();
    displayTimerofMinClicks();
  });

  longBreakButton.addEventListener('click', function() {
    setActiveButton(longBreakButton);
    pauseCountdown();
    resetCountdown();
    displayTimerofMinClicks();
  });

  
  
  /*This function displays the various minutes  */
  function displayTimerofMinClicks(){
    if(pomodoroButton.className == 'active'){
        getPomoMin()
    }
    else if(shortBreakButton.className == 'active'){
        getShortMin()
    }else{
        getLongMin()
    }
  }
   
  /*This function sets the class="active" to the button when click */
  function setActiveButton(button) {
    // Remove 'active' class from all buttons
    var buttons = document.getElementsByClassName('buttons')[0].getElementsByTagName('button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('active');
    }

    // Add 'active' class to the clicked button
    button.classList.add('active');
  }

/* gets the pomodoro minutes from the input field*/
  function getPomoMin(){
    var pomodoroValue = pomodoroInput.value.trim();
    if(pomodoroValue ===""){
        pomodoroValue = 0;
    }
    if(pomodoroValue <= 9){
        pomodoroMinutes = '0' + pomodoroValue;
        OutputMinutes.innerHTML = pomodoroMinutes;
    }
    if(pomodoroValue >9){
        pomodoroMinutes = pomodoroValue;
        OutputMinutes.innerHTML = pomodoroMinutes;
    }
    if(pomodoroValue > 99){
        pomodoroMinutes = pomodoroValue;
        OutputMinutes.innerHTML = pomodoroMinutes;
    }
    if(pomodoroValue > 1000){
        pomodoroMinutes = "1000";
        OutputMinutes.innerHTML = pomodoroMinutes;
    }
  }

  /* gets the short minutes from the input field*/
  function getShortMin(){
    var shortBreakValue = shortBreakInput.value.trim();
    if(shortBreakValue ===""){
        shortBreakValue = 0;
    }
    if(shortBreakValue <= 9){
        shortBreakMinutes = '0' + shortBreakValue;
        OutputMinutes.innerHTML = shortBreakMinutes;
    }
    if(shortBreakValue >9){
        shortBreakMinutes = shortBreakValue;
        OutputMinutes.innerHTML = shortBreakMinutes;
    }
    if(shortBreakValue > 99){
        shortBreakMinutes = shortBreakValue;
        OutputMinutes.innerHTML = shortBreakMinutes;
    }
    if(shortBreakValue > 1000){
        shortBreakMinutes = "1000";
        OutputMinutes.innerHTML = shortBreakMinutes;
    }
  }

  /* gets the long minutes from the input field*/
  function getLongMin(){
    var longBreakValue = longBreakInput.value.trim();
    if(longBreakValue ===""){
        longBreakValue = 0;
    }
    if(longBreakValue <= 9){
        longBreakMinutes = '0' + longBreakValue;
        OutputMinutes.innerHTML = longBreakMinutes;
    }
    if(longBreakValue >9){
        longBreakMinutes = longBreakValue;
        OutputMinutes.innerHTML = longBreakMinutes;
    }
    if(longBreakValue > 99){
        longBreakMinutes = longBreakValue;
        OutputMinutes.innerHTML = longBreakMinutes;
    }
    if(longBreakValue > 1000){
        longBreakMinutes = "1000";
        OutputMinutes.innerHTML = longBreakMinutes;
    }
  }
  

/* Function logics for starting the timmer, pausing, resuming and restarting */
let countdownInterval;
    let countdownMinutes = 0;
    let countdownSeconds = 0;
    let isCountdownRunning = false;

    
    function startCountdown() {

      if (isCountdownRunning) return; // Prevent multiple countdowns

      if(pomodoroButton.className == 'active'){
        time = pomodoroMinutes
    }
    else if(shortBreakButton.className == 'active'){
        time = shortBreakMinutes
    }else{
        time = longBreakMinutes
    }
      const minutes = parseInt(time, 10);
      
        pauseTimer()
      if (isNaN(minutes) || minutes <= 0) {
        alert('Please enter a valid number of minutes.');
        return;
      }

      countdownMinutes = minutes;
      countdownSeconds = 0;

      isCountdownRunning = true;
     
      
      countdownInterval = setInterval(updateCountdown, 1000);
      
      const startButton = document.getElementById('start');
      startButton.style.display = 'none';
      const pauseButton = document.getElementById('pause');
      pauseButton.style.display = 'block';

    }

    function updateCountdown() {
        
      if (countdownSeconds === 0) {
        if (countdownMinutes === 0) {
          stopCountdown();
          return;
        }
        countdownSeconds = 59;
        countdownMinutes--;
      } else {
        countdownSeconds--;
      }

      const countdownDisplayMinutes = document.getElementById('minutes');
      countdownDisplayMinutes.textContent = `${countdownMinutes}`;
      const countdownDisplaySeconds = document.getElementById('seconds');
      countdownDisplaySeconds.textContent = `${countdownSeconds < 10 ? '0' : ''}${countdownSeconds}`
    }

    function stopCountdown() {
      clearInterval(countdownInterval);
      isCountdownRunning = false;
      const restartButton = document.getElementById('restart');
        restartButton.style.display = 'block';
        const pauseButton = document.getElementById('pause');
        pauseButton.style.display = 'none';
        
    }

    function pauseCountdown() {
        if (!isCountdownRunning) return; // Prevent pausing when not running
  
        clearInterval(countdownInterval);
        isCountdownRunning = false;

       
        const resumeButton = document.getElementById('resume');
        resumeButton.style.display = 'block';
        const pauseButton = document.getElementById('pause');
        pauseButton.style.display = 'none';
        pauseTimer()
      }
  
      function resumeCountdown() {
        if (isCountdownRunning) return; // Prevent resuming when already running
  
        isCountdownRunning = true;
        countdownInterval = setInterval(updateCountdown, 1000);
        pauseTimer()
        const resumeButton = document.getElementById('resume');
        resumeButton.style.display = 'none';
        const pauseButton = document.getElementById('pause');
        pauseButton.style.display = 'block';
  
      }

      function restartTimer(){
        startCountdown()
        const restartButton = document.getElementById('restart');
        restartButton.style.display = 'none';
        const pauseButton = document.getElementById('pause');
        pauseButton.style.display = 'block';
      }

      function resetCountdown() {
        

        clearInterval(countdownInterval);
        isCountdownRunning = false;
        
        if( isCountdownRunning = false){
          pauseTimer();
        }
  
        const countdownDisplayMinutes = document.getElementById('minutes');
        const countdownDisplaySeconds = document.getElementById('seconds');
        countdownDisplayMinutes.textContent = '00';
        countdownDisplaySeconds.textContent = '00';

        
         
        
        
      }
      /*logic for the progressive circlar bar */
      //circle start
      let progressBar = document.querySelector('.e-c-progress');
      let indicator = document.getElementById('e-indicator');
      let pointer = document.getElementById('e-pointer');
      let length = Math.PI * 2 * 100;
      progressBar.style.strokeDasharray = length;
  
      function update(value, timePercent) {
      var offset = - length - length * value / (timePercent);
      progressBar.style.strokeDashoffset = offset; 
      pointer.style.transform = `rotate(${360 * value / (timePercent)}deg)`; 
      };
    

      
      let intervalTimer;
      let timeLeft;
      let wholeTime;
      let isPaused = false;
      let isStarted = false;
  
  
  
      function timer (seconds){ //counts time, takes seconds
      let remainTime = Date.now() + (seconds * 1000);
      displayTimeLeft(seconds);
      
      intervalTimer = setInterval(function(){
          timeLeft = Math.round((remainTime - Date.now()) / 1000);
          if(timeLeft < 0){
          clearInterval(intervalTimer);
          isStarted = false;
         
          displayTimeLeft(wholeTime);
         
          return ;
          }
          displayTimeLeft(timeLeft);
      }, 1000);
      
      }
  
      function pauseTimer(event){
        if(pomodoroButton.className == 'active'){
            var pomodoroValue = pomodoroInput.value.trim();
            wholeTime = pomodoroValue * 60;
        }
        else if(shortBreakButton.className == 'active'){
           var shortBreakValue = shortBreakInput.value.trim()
           wholeTime = shortBreakValue * 60
        }else{
            var longBreakValue = longBreakInput.value.trim()
            wholeTime = longBreakValue * 60
        } 
      
      
      if(isStarted === false){
          timer(wholeTime);
          isStarted = true;
      }else if(isPaused){
          timer(timeLeft);
          isPaused = isPaused ? false : true
      }else{
          clearInterval(intervalTimer);
          isPaused = isPaused ? false : true ;
      }
      }
      function displayTimeLeft (timeLeft){ //displays time on the input
      update(timeLeft, wholeTime);
      }
     

//...................selecting fonts logic..............

var currentFont = "kumbhBold";
var kumbhFont = document.getElementById('kumbh-font');
var robotoFont = document.getElementById('roboto-font');
var spacemonoFont = document.getElementById('spacemono-font');

function chooseKumbh(){
    kumbhFont.classList.add('active-font');
    robotoFont.classList.remove('active-font');
    spacemonoFont.classList.remove('active-font');
    currentFont = "kumbhBold";
    // console.log(currentFont);
}

function chooseRoboto(){
    kumbhFont.classList.remove('active-font');
    robotoFont.classList.add('active-font');
    spacemonoFont.classList.remove('active-font');
    currentFont = "robotoSlabBold";
    // console.log(currentFont);
}

function chooseSpacemono(){
    kumbhFont.classList.remove('active-font');
    robotoFont.classList.remove('active-font');
    spacemonoFont.classList.add('active-font');
    currentFont = "spaceMonoBold";
    // console.log(currentFont);
}



function changeFonts(){
    var r= document.querySelector(':root');   
    r.style.setProperty('--primary-font-family',currentFont);
}

//................selecting colors logic................

var currentColor = "rgba(248, 112, 112, 1)";
var fadedCurrentColor = "rgb(247, 171, 171";
var orangeColor = document.getElementById('orange');
var greenColor = document.getElementById('green');
var purpleColor = document.getElementById('purple');

function chooseOrange(){
    orangeColor.classList.add('active-color');
    greenColor.classList.remove('active-color');
    purpleColor.classList.remove('active-color');
    currentColor = "rgba(248, 112, 112, 1)";
    fadedCurrentColor = "rgb(247, 171, 171";
}

function chooseGreen(){
    orangeColor.classList.remove('active-color');
    greenColor.classList.add('active-color');
    purpleColor.classList.remove('active-color');
    currentColor = "rgba(112, 243, 248, 1)";
    fadedCurrentColor = "rgb(150, 238, 241)";
}

function choosePurple(){
    orangeColor.classList.remove('active-color');
    greenColor.classList.remove('active-color');
    purpleColor.classList.add('active-color');
    currentColor = "rgba(216, 129, 248, 1)";
    fadedCurrentColor = "rgb(235, 180, 255)";
}

function changeColor(){
    var rc= document.querySelector(':root');   
    rc.style.setProperty('--primary-color',currentColor);
    rc.style.setProperty('--faded-primary-color',fadedCurrentColor);
}