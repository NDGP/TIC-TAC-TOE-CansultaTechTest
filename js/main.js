import Game from "./Game.js";
import GameView from "./GameView.js";


let game = new Game();
let gameView = new GameView(document.getElementById("app"));

GameView.onTileClick = function (i) {
    console.log(`Tile Clicked: ${i}`)
};

GameView.onRestartClick = function () {
    
};