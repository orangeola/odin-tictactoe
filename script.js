const Player = (player, xo) => {
    let playerType = player;
    let piece = xo;

    const getPiece = () => {
        return piece;
    }

    const getType = () => {
        return playerType;
    }

    return {
        getPiece, getType
    }
}

const gameBoard = (() => {
    let board = [
        ["empty", "empty", "empty"],
        ["empty", "empty", "empty"],
        ["empty", "empty", "empty"]
    ]
    let player1;
    let player2;

    const blueCircle = document.createElement("img");
    blueCircle.src = "pictures/blueO.png";
    let redEx = document.createElement("img");
    redEx.src = "pictures/redX.png";

    function makeMove(location, xo, index)
    {
        if(board[location[0]][location[1]] === "empty")
        {
            board[location[0]][location[1]] = xo;
            if(xo === "x")
            {
                let clonex = redEx.cloneNode(true);
                document.getElementById("item" + index).appendChild(clonex);
            } 
            else
            {
                document.getElementById("item" + index).appendChild(blueCircle);
            }
        }
        //check if array slot is empty 
        //if not, return invalid
        //if empty, set slot in array to letter
        //attach img to child of index
    }

    function initPlayers(name1, piece1, name2, piece2)
    {
        if((name1 === "human" || name1 === "ai") &&  
        (name2 === "human" || name2 === "ai") &&
        (piece1 === "x" || piece1 === "o") && 
        (piece2 === "x" || piece2 === "o"))
        {
            this.player1 = Player(name1, piece1);
            this.player2 = Player(name2, piece2);
        }
    }
    return {player1, player2, initPlayers, makeMove, board}
})();

const gameFlow = (() => {
    let playerTurn = "x";
    let finished = false;

    const mainMenu = document.getElementById("mainMenu");
    const twoPlayer = document.getElementById("two");
    const onePlayer = document.getElementById("one");
    const banban = document.getElementById("banner");
    const grid = document.getElementById("gridContainer");
    
    (function(){
        let total = 1;
        for(let i = 0; i < 3; i++)
        {
            for(let k = 0; k < 3; k++)
            {
                let temp = "item" + total;
                console.log(temp);
                document.getElementById(temp).addEventListener('click', ()=>{
                let nextTurn = gameBoard.makeMove((i.toString() + k.toString()), playerTurn, temp[4]);
            });
            total++;
            }
        }
    })();

    /*
    gridItem1.addEventListener('click', ()=>{
        gridItem1.appendChild(blueCircle);
    });*/

    function askForMove(location, xo, index) {
        if(finished === false)
        {
            let result = gameBoard.makeMove(location, xo, index);
            switch(result) {
                case "finish":
                  // code block
                  break;
                case "valid":
                  // set player tag at top to 1 -> 2 or reverse
                  // set playerTurn to other letter x->o
                  break;
                case "invalid":
                  // do nothing pretty much
                  break;
              } 
        }
    }

    twoPlayer.addEventListener('click', optionTwoPlayer);
    onePlayer.addEventListener('click', optionOnePlayer);

    function menuTransition(){
        setTimeout(function(){ 
            mainMenu.style.display = "none";
            grid.style.display = "grid"
        }, 700);
        mainMenu.classList.add("hidden");
        onePlayer.classList.add("noClick");
        twoPlayer.classList.add("noClick");
        setTimeout(function(){ 
            banban.classList.add("visible");
            grid.classList.add("visible");
        }, 720);
    }

    function optionTwoPlayer(){
        menuTransition();
        gameBoard.initPlayers("human", "x", "human", "o");
    }

    function optionOnePlayer(){
        alert("Under Construction") ;
    }
})();