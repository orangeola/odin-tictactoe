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
                let cloneo = blueCircle.cloneNode(true);
                document.getElementById("item" + index).appendChild(cloneo);
            }
            //return "valid";
            let result = checkForWin(xo);
            if(result === true)
            {
                return "finish";
            }
            else{
                return "valid";
            }
        }
    }

    function checkForWin(xo)
    {
        let diag2 = 0;   
        for(let i = 0; i < 3; i++)
        {
            let total = 0;
            let total2 = 0;
            let diag1 = 0;
            for(let k = 0; k < 3; k++)
            {
                if(board[i][k] === xo)
                {
                    total++;
                }
                if(board[k][i] === xo)
                {
                    total2++;
                }
                if(board[k][k] === xo)
                {
                    diag1++;
                }
                if(i+k === 2)
                {
                    if(board[i][k] === xo)
                    {
                        diag2++;
                    } 
                }
            }
            if(total === 3 || total2 === 3 || diag1 === 3 || diag2 === 3)
            {
                return "finish";
            }
        }
        return false;
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
    const playerBanner = document.getElementById("playerBanner");
    
    (function(){
        let total = 1;
        for(let i = 0; i < 3; i++)
        {
            for(let k = 0; k < 3; k++)
            {
                let temp = "item" + total;
                console.log(temp);
                document.getElementById(temp).addEventListener('click', ()=>{
                let nextTurn = askForMove((i.toString() + k.toString()), playerTurn, temp[4]);
            });
            total++;
            }
        }
    })();

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
                  if(playerTurn === "x")
                  {
                    playerTurn = "o";
                    playerBanner.innerText = "Player 2's turn";
                  }
                  else
                  {
                    playerTurn = "x";
                    playerBanner.innerText = "Player 1's turn";
                  }
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