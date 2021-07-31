export default class GameView { 
    constructor(root) {
        this.root = root;
        this.root.innerHTML = `
            <div class="header">
                <div class="header__turn")>
                    X's turn
                </div>
                <div class="header__status">
                    In Progress
                </div>
                <button type="button" class="header__restart">
                    <i class="material-icons">refresh</i>
                </button>
            </div>
            <div class="board">
                <div class="board__tile board__tile--winner" data-index="0">o</div>
                <div class="board__tile" data-index="1">o</div>
                <div class="board__tile" data-index="2">o</div>
                <div class="board__tile" data-index="3">o</div>
                <div class="board__tile" data-index="4">o</div>
                <div class="board__tile" data-index="5">o</div>
                <div class="board__tile" data-index="6">o</div>
                <div class="board__tile" data-index="7">o</div>
                <div class="board__tile" data-index="8">o</div>
            </div>
        `;

        this.onTileClick = undefined;
        this.onRestartClick = undefined;


       
        this.root.querySelectorAll(".board__tile").forEach(tile => {
            tile.addEventListener("click", () => {
                    this.onTileClick(tile.dataset.index);
            });
        });
    }
}