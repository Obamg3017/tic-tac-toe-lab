//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.

/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/
let board 
let turn 
let winner  
let tie
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [0, 4, 8],
  [2, 5, 8],
  [2, 4, 6],
]; 
/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.querySelector("h2")
const gameBoard = document.querySelector(".board")
const resetBtnEl = document.querySelector("reset")
/*-------------------------------- Functions --------------------------------*/

function init(){
board = ["", "", "", 
        "", "", "", 
        "", "", ""];
turn = "X";
winner = false; 
tie = false;
render() 
}

function render(){
updateBoard();
updateMessage();
}


function updateBoard(){
   board.forEach((el, ind) => {
    squareEls[ind].textContent = el
   }) 
   
}

function updateMessage(){
   if(!winner && !tie){
        messageEl.textContent = `It is your turn ${turn}`
   } else if(tie){
        messageEl.textContent = "It's a tie!"
   }else {
     messageEl.textContent = "You win!"
   } 
}


function handleClick(event){
    const squareIndex = event.target.id; 
    if (squareIndex[squareIndex] === "X" || squareIndex[squareIndex] === "O") {
        return
    } console.log("This is", squareIndex)
    if(winner){
        return
    }
    placePiece(squareIndex)
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}

function placePiece(index){
    board[index] = turn; 
}

function checkForWinner(){
 winningCombos.forEach((combo)=>{
    let elOne = combo[0]
    let eltwo = combo[1];
    let elthree = combo[2];
  if(board[elOne] && board[elOne] === board[eltwo] && board[elOne] === board[elthree]){
        winner = true;
  }
    
 })

}

function checkForTie(){
    if(winner){
        return 
    } 
    let cellsFilled = true; 
    board.forEach((sqr)=>{
        if(sqr === " "){
            cellsFilled = false;
        }
    }) 
    if(!winner && cellsFilled){
        tie = true
    }
}

function switchPlayerTurn(){
    if(winner){
        return 
    }
    if(turn === "X"){
        turn = "O";
    }else {
        turn = "X";
    }
}


/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((square) => {
  square.addEventListener("click", handleClick)
});

// resetBtnEl.addEventListener("click", ()=>{
//     init()
// })





document.addEventListener("DOMContentLoaded", init);