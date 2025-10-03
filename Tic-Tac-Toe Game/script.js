const ticMarksCon = document.getElementById('ticMarksCon');
const messageCon = document.getElementById('messageCon');
const ticBoxes = document.querySelectorAll('.tic-box');
const p1WinCount = document.getElementById("playerOneWins");
const p2WinCount = document.getElementById("playerTwoWins");

const boxesArray = Array.from(ticBoxes);

let playerOneWins = parseInt(localStorage.getItem("POneWins")) || 0;
let playerTwoWins = parseInt(localStorage.getItem("PTwoWins")) || 0;
p1WinCount.textContent = playerOneWins.toString();
p2WinCount.textContent = playerTwoWins.toString();

let gameOver = false;
let currentPlayer = "O";
let targetBox ;
let currentIndex;

let marks = ["","","","","","","","",""];
const winningMarks = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


const handleClick = (event) => {
   if(gameOver) return;
   targetBox = event.target
   currentIndex = boxesArray.indexOf(targetBox)
   console.log(currentIndex)
   fillBox()
}


const fillBox = () => {
    boxesArray.forEach((item,index)=>{
      if(item !== targetBox || item.textContent !== "" ) return;
      marks[index] = currentPlayer;
      item.textContent = currentPlayer;
      checkWins();
      if(!gameOver){
         currentPlayer = currentPlayer === "O" ? "X" : "O";
      }

})}

const checkWins = () => {
    for(const item of winningMarks){
        const [a,b,c] = item;
        if(marks[a] !== '' && marks[a] === marks[b] && marks[a] === marks[c] ) {
            if(marks[a]==='O'){
                messageCon.textContent = "Player 1 Wins"
                playerOneWins += 1;
                p1WinCount.textContent = playerOneWins.toString();
                gameOver = true;
                localStorage.setItem("POneWins",playerOneWins);
            }else{
                messageCon.textContent = "Player 2 Wins"
                playerTwoWins += 1;
                p2WinCount.textContent = playerTwoWins.toString();
                gameOver = true;
                localStorage.setItem("PTwoWins",playerTwoWins);
            }
            return;
        }
    }

    if(marks.every(mark=>mark !== "")){
        messageCon.textContent = "Match Draw"
        gameOver = true;
    }
}

const restart = () => {
    boxesArray.forEach(item=>{
        item.textContent = ""
    })
    marks = ["","","","","","","","",""];
    messageCon.textContent = "";
    gameOver = false;
}

const clearGame = () => {
    localStorage.removeItem("POneWins");
    localStorage.removeItem("PTwoWins")
    playerOneWins=0;
    playerTwoWins=0;
    p1WinCount.textContent = "0";
    p2WinCount.textContent = "0";
    boxesArray.forEach(item=>{
        item.textContent = ""
    })
    marks = ["","","","","","","","",""];
    messageCon.textContent = "";
    gameOver = false;
}