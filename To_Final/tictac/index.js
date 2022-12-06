
let  gameText = document.getElementById ("gameText")
let grids = Array.from (document.getElementsByClassName ("square"))



function refreshPage() {
    window.location.reload();
}



const O = "O"
const X = "X"
let currentPlayer = X 
let spots = Array(9).fill(null)
let count_plays = 0




const winningConditions=[

    ['0','1','2'],
    ['3','4','5'],
    ['6','7','8'],

    ['0','3','6'],
    ['1','4','7'],
    ['2','5','8'],

    ['0','4','8'],
    ['2','4','6'],

]



const startGame = ()=> {
    grids.forEach(square => square.addEventListener("click", squareClick))
}



let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-square')




function squareClick(e) {
    const id = e.target.id
   
    if(!spots[id] && count_plays < 9){
        spots[id] = currentPlayer
        e.target.innerText = currentPlayer

       if(playerWin() !==true){
        gameText.innerHTML = `Winner is ${currentPlayer}`
        count_plays = 10
        let winning_squares = playerWin()

        winning_squares.map(square => grids[square].style.backgroundColor = winnerIndicator)
        return
       }
       count_plays++


        currentPlayer = currentPlayer == X ? O : X
    }

    if(count_plays === 9) {
        gameText.innerHTML = "Tie"
    }
}

function playerWin() {
    for (const condition of winningConditions) {
        let [a,b,c] = condition

        if(spots[a] && (spots[a] == spots[b] && spots[a] == spots[c])) {
            return [a,b,c]
        }
    }
    return true
}


startGame()