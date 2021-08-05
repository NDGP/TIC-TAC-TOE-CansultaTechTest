const BLUE_CLASS = 'blue';
const YELLOW_CLASS = 'yellow';
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const board = document.getElementById('board');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.getElementById('winningMessage');
const cellElements = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restartButton');
const shareButton = document.getElementById('socialShare')
const shareBlock = document.getElementById('shareBlock')
const twiterScript = document.getElementById('twiterScript')
shareButton.addEventListener('click', shareClick)
restartButton.addEventListener('click', startGame);

let shareElement = `<div class='share show' id='shareBlock'>
<div class="textbox">Thanks For Playing!</div>
<div class="link-box">
    <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="truen">Tweet</a>
    <div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button_count" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Share</a></div>
    <script id="twiterScript" async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v11.0" nonce="L5CLMsws"></script>
</div>
</div>`


let yellowTurn;

startGame()

function startGame() {
    yellowTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(BLUE_CLASS);
        cell.classList.remove(YELLOW_CLASS);
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true });
    })
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}



function handleClick(e) {
    const cell = e.target;
    const currentClass = yellowTurn ?  YELLOW_CLASS : BLUE_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
 }

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    yellowTurn = !yellowTurn
}

function setBoardHoverClass() {
    board.classList.remove(BLUE_CLASS)
    board.classList.remove(YELLOW_CLASS)
    if (yellowTurn) {
        board.classList.add(YELLOW_CLASS)
    } else {
        board.classList.add(BLUE_CLASS)
    }
}

function checkWin(currentClass) {
  return  WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "Draw!"
    } else {
        winningMessageTextElement.innerText = `${yellowTurn ? 'Yellow' : 'Blue'} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(BLUE_CLASS) || 
        cell.classList.contains(YELLOW_CLASS)
    })
}


function shareClick() {
    fetch('https://platform.twitter.com/widgets.js').then(response => {
        console.log(response)
        winningMessageElement.classList.remove('show')
        window.location.replace('https://twitter.com/share?ref_src=twsrc%5Etfw')
    })
}







