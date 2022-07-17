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
    let filled = 0;
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
        filled++;
        if(board[location[0]][location[1]] === "empty")
        {
            board[location[0]][location[1]] = xo;
            if(xo === "x")
            {
                document.getElementById("item" + index).appendChild(redEx.cloneNode(true));
            } 
            else
            {
                document.getElementById("item" + index).appendChild(blueCircle.cloneNode(true));
            }
            if(checkForWin(xo) === true)
            {
                return "finish";
            }
            else{
                if(filled === 9)
                {
                    return "tie"
                }
                else
                {
                    return "valid";
                }
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
                return true;
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

    function emptyGrid()
    {
        filled = 0;
        for(let i = 0; i < 3; i++)
        {
            for(let k = 0; k < 3; k++)
            {
                board[i][k] = "empty";
            }
        }
    }

    return {initPlayers, makeMove, emptyGrid}
})();

const gameFlow = (() => {
    let playerTurn = "x";
    let finished = false;
    let presentAI = false;

    const mainMenu = document.getElementById("mainMenu");
    const twoPlayer = document.getElementById("two");
    const onePlayer = document.getElementById("one");
    const banban = document.getElementById("banner");
    const grid = document.getElementById("gridContainer");
    const playerBanner = document.getElementById("playerBanner");

    const gridButton1 = document.getElementById("gridB1");
    const gridButton2 = document.getElementById("gridB2");
    
    (function(){
        let total = 1;
        for(let i = 0; i < 3; i++)
        {
            for(let k = 0; k < 3; k++)
            {
                let temp = "item" + total;
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
                  playerBanner.style.color = "lightgreen";
                  finished = true;
                  if(playerTurn === "x")
                  {
                    playerBanner.innerText = "Player 1 wins!";
                  }
                  else
                  {
                    playerBanner.innerText = "Player 2 wins!";
                  }
                  break;
                case "valid":
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
                case "tie":
                  finished = true;
                  playerBanner.style.color = "brown";
                  playerBanner.innerText = "Tie!";
                  break;
            } 
        }
    }

    twoPlayer.addEventListener('click', optionTwoPlayer);
    onePlayer.addEventListener('click', optionOnePlayer);
    gridButton1.addEventListener('click', restart);
    gridButton2.addEventListener('click', menu);

    function optionTwoPlayer(){
        menuTransition();
        gameBoard.initPlayers("human", "x", "human", "o");
    }

    function optionOnePlayer(){
        let newButtons = document.getElementsByClassName("secondChoice");
        newButtons[0].style.display = "flex";
        newButtons[1].style.display = "flex";
    }

    function restart()
    {
        playerBanner.style.color = "black";
        gameBoard.emptyGrid();
        const allGridItems = document.getElementsByClassName("gridItem"); 
        for(const item in allGridItems)
        {
            for(let i = 0; i < allGridItems.length; i++)
            {
                allGridItems[i].textContent = "";
            }
        }

        playerTurn = "x";
        finished = false;
        if(!presentAI)
        {
            playerBanner.innerText = "Player 1's turn";
        }
    }

    function menu()
    {
        location.reload();
    }

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
})();