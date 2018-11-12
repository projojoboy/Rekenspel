const myProblem = document.getElementById('problem');
const myScore = document.getElementById('questionAmount');
const myLevel = document.getElementById('level');
const myFeedback = document.getElementById('feedback');
const myTitle = document.getElementById('title');
const myGood = document.getElementById('amountGood');
const myWrong = document.getElementById('amountWrong');

var feedbackColor = document.getElementById("feedback");
var problemColor = document.getElementById("problem");
var answerColor = document.getElementById("answer");
var nothingColor = document.getElementById("Wrong");
var nothing2Color = document.getElementById("nothing2");
var nothing3Color = document.getElementById("nothing3");
var timeColor = document.getElementById("Good");
var levelColor = document.getElementById("level");
var levelShowColor = document.getElementById("levelShow");
var scoreColor = document.getElementById("questionAmount");
var scoreishColor = document.getElementById("scoreish");
var myAnswer = document.getElementById("answerText");

var audioWrong = new Audio('Wrong.mp3');
var audioCorrect = new Audio('Correct.mp3');
var audioVrolijk = new Audio('Vrolijk.mp3');
var audioCheater = new Audio('Cheater.wav');

var antwoord = document.getElementById('answerText');
var score = 0;
var good = 0;
var wrong = 0;
var answer;
var level = 1;

createProblem();

var x;

function changecolors() {
    x = 1;
    setInterval(change, 500);
}

function change() {
    if (x === 1) {
        colorBackground = "#ff0066";
        var problem = "<span style='color: green'>Je hebt gewonnen!!!!</span>";
        myTitle.innerHTML = "<span style='color: red;'>Rekenen is niks voor Sjollema</span>";
        myProblem.innerHTML = problem;
        problemColor.style.backgroundColor = "purple";
        nothingColor.style.backgroundColor = "yellow";
        nothing2Color.style.backgroundColor = "black";
        nothing3Color.style.backgroundColor = "green";
        answerColor.style.backgroundColor = "orange ";
        feedbackColor.style.backgroundColor = "blue";
        timeColor.style.backgroundColor = "white";
        levelColor.style.backgroundColor = "pink";
        levelShowColor.style.backgroundColor = "pink";
        scoreColor.style.backgroundColor = "red";
        scoreishColor.style.backgroundColor = "red";
        x = 2;
    } else {
        colorBackground = "green";
        var problem = "<span style='color: purple'>Je hebt gewonnen!!!!</span>";
        myTitle.innerHTML = "<span style='color: blue;'>Rekenen is niks voor Sjollema</span>";
        myProblem.innerHTML = problem;
        problemColor.style.backgroundColor = "white";
        nothingColor.style.backgroundColor = "brown";
        nothing2Color.style.backgroundColor = "pink";
        nothing3Color.style.backgroundColor = "yellow";
        answerColor.style.backgroundColor = "red";
        feedbackColor.style.backgroundColor = "gray";
        timeColor.style.backgroundColor = "pink";
        levelColor.style.backgroundColor = "purple";
        levelShowColor.style.backgroundColor = "purple";
        scoreColor.style.backgroundColor = "blue";
        scoreishColor.style.backgroundColor = "blue";
        x = 1;
    }

    document.body.style.background = colorBackground;
}

function createProblem() {
  let first = getNumber();
  let second = getNumber();
  let third = getNumber();
  switch(level) {
    case 1:
    var problem = String(first) + "*" + String(second) + "=";
    myProblem.innerHTML = problem;
    answer = first*second;
    break;

    case 2:
    var problem = String(first) + "*" + "X =" + String(first*second);
    myProblem.innerHTML = problem;
    answer = second;
    break;

    case 3:
    var problem = String(first) + "*" + String(second) + "+" + String(third) + "=";
    myProblem.innerHTML = problem;
    answer = first*second+third;
    break;

    case 4:
    var problem = String(first) + "*" + String(second) + "+" + "X" + "=" + String(first*second+third);
    myProblem.innerHTML = problem;
    answer = third;
    break;
  }
}

function getNumber() {
  return Math.floor(Math.random()*9)+1;
}

function getLevel() {
  if(score >= 0){ level = 1}
  if(score >= 10){ level = 2}
  if(score >= 20){ level = 3}
  if(score >= 30){ level = 4}
  if(score >= 40){
    myAnswer.disabled = true;
    audioVrolijk.play();
    change();
    changecolors();
  }
}

function scoreUp() { // Score omhoog
  score += 1;
  good += 1;
}

function scoreDown() { // Score omlaag
    score += 1;
    wrong += 1;
}
function controlAnswer() {
    console.log(antwoord.value, answer);
    if(antwoord.value != ""){
      if(antwoord.value == answer) { // Als je antwoord goed is
        scoreUp();
        getLevel();
        audioCorrect.play();
        console.log("Score =", score);
        antwoord.value = "";
        myFeedback.innerHTML = "<span style='color: green'>Good boii, u did good!</span>";
        createProblem();
      }
      else { // Als je antwoord fout is
        scoreDown();
        audioWrong.play();
        console.log("Score =", score);
        getLevel();
        antwoord.value = "";
        myFeedback.innerHTML = "<span style='color: red;'>Not quite yet there m8...</span>";
        createProblem();
      }
    }
}

antwoord.addEventListener('keyup',(evt)=>{
  if(evt.keyCode == 13){
    controlAnswer();
    myScore.innerHTML = score;
    myLevel.innerHTML = level;
    myGood.innerHTML = good;
    myWrong.innerHTML = wrong;
  }
});

function cheat(){
  score = 9999;
  console.log("Cheat activated");
  myScore.innerHTML = score;
  audioCheater.play();
}
