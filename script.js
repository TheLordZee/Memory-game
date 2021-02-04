const gameContainer = document.getElementById("game");
const score = document.querySelector('#tries');
let count = 0;
let tries = 0;
let lowScore = localStorage.getItem("low-score");
let start = document.querySelector('#start-btn');

if (lowScore) {
    document.getElementById("best-score").innerText = lowScore;
}

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let numCards = COLORS.length;

let cardsFlipped = 0;

function shuffle(array) {

  let counter = array.length;
  while (counter > 0) {

    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;

  }

  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {

  for (let color of colorArray) {

    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.classList.add('norm');
    newDiv.classList.add('ready');
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);

  }

}

start.addEventListener('click', function(e){

  console.log(e.target.parentElement);
  e.target.parentElement.remove();

});

function flipCard(card){
  if(card.classList.contains('norm')){
    card.classList.toggle('norm');
    card.classList.toggle('smol');
    setTimeout(function(){
      card.classList.toggle('smol');   
      card.classList.toggle('norm');
    }, 1000)
  }else{
    card.classList.toggle('smol');
    card.classList.toggle('norm');
  }
}
  


function flipping(targetClass){

  if(targetClass[0].classList[0] !== targetClass[1].classList[0]){

    tries++;
    score.innerText = tries;
    
    setTimeout(function(){

      setTimeout(function(){
        
         for(let i of targetClass){
           flipCard(i);
            i.style.backgroundColor = 'white';
            i.classList.add('ready');
        } 

        targetClass[1].classList.remove('flip');
        targetClass[0].classList.remove('flip');
        

        count = 0;

      }, 1000);

    }, 3000); 

  }else if(targetClass[0].classList[0] === targetClass[1].classList[0]){

      tries++;
      cardsFlipped += 2;
      score.innerText = tries;

      for(let card of targetClass){
        card.classList.add('complete');
      }

      targetClass[1].classList.remove('flip');
      targetClass[0].classList.remove('flip');
      count = 0;
  }

}

function handleCardClick(event) {

  if(event.target.classList.contains('ready') && count < 2){
    console.log(event.target.classList);
    
    let clicked = event.target;
    clicked.classList.remove('ready');

    console.log("you just clicked", event.target);

    if(count < 2){
      count++;
      clicked.classList.add('flip')
      flipCard(clicked);
      clicked.style.backgroundColor = clicked.classList[0];
      if(count === 2){
        let flipped = document.querySelectorAll('.flip')
        flipping(flipped);
      }
    }
    
  }

  if (cardsFlipped === numCards) endGame();

}

let restart = document.querySelector('#restart-btn');

restart.addEventListener('click', function(){

  location.reload();

});

function endGame(){
  let lowScore = +localStorage.getItem("low-score") || Infinity;

  if (tries < lowScore) {

    localStorage.setItem("low-score", tries);
    document.querySelector('#new-best').style.display = 'flex';

  }

  document.querySelector('#end-game').style.display = 'flex';
  document.querySelector('#final-best').innerText = lowScore;
  document.querySelector('#end-score').innerText = tries;
}
createDivsForColors(shuffledColors);