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
    let board = ["empty", "empty", "empty", 
    "empty", "empty", "empty", 
    "empty", "empty", "empty"];
    let player1;
    let player2;
    let difficulty;

    //for minmax
    let aiPlayer;
    let humanPlayer;

    const blueCircle = document.createElement("img");
    blueCircle.src = "pictures/blueO.png";
    let redEx = document.createElement("img");
    redEx.src = "pictures/redX.png";

    function makeMove(xo, index)
    {
        if(board[index] === "empty")
        {
            board[index] = xo;
            if(xo === "x")
            {
                document.getElementById("item" + index).appendChild(redEx.cloneNode(true));
            } 
            else
            {
                document.getElementById("item" + index).appendChild(blueCircle.cloneNode(true));
            }
            
            return checkForWin();
        }
    }

    function checkForWin()
    {
        let xo = "x";
        if (
            (board[0] === xo && board[1] === xo && board[2] === xo) ||
            (board[3] === xo && board[4] === xo && board[5] === xo) ||
            (board[6] === xo && board[7] === xo && board[8] === xo) ||
            (board[0] === xo && board[3] === xo && board[6] === xo) ||
            (board[1] === xo && board[4] === xo && board[7] === xo) ||
            (board[2] === xo && board[5] === xo && board[8] === xo) ||
            (board[0] === xo && board[4] === xo && board[8] === xo) ||
            (board[2] === xo && board[4] === xo && board[6] === xo)
            ){
                return "x";
        } 
        xo = "o";
        if (
            (board[0] === xo && board[1] === xo && board[2] === xo) ||
            (board[3] === xo && board[4] === xo && board[5] === xo) ||
            (board[6] === xo && board[7] === xo && board[8] === xo) ||
            (board[0] === xo && board[3] === xo && board[6] === xo) ||
            (board[1] === xo && board[4] === xo && board[7] === xo) ||
            (board[2] === xo && board[5] === xo && board[8] === xo) ||
            (board[0] === xo && board[4] === xo && board[8] === xo) ||
            (board[2] === xo && board[4] === xo && board[6] === xo)
            ){
                return "o";
        }
        
        let filled = 0;
        for(let i = 0; i < board.length; i++)
        {
            if(board[i] !== "empty")
            {
                filled++;
            }
        }
            
        if(filled === 9)
        {
            return "tie";
        }
        else
        {
            return "valid";
        }
    }

    function initPlayers(name1, piece1, name2, piece2, difficulty)
    {
        this.difficulty = difficulty;
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
        board.fill("empty");
    }

    function robotCalc(playerTurn)
    {
        if(this.difficulty === "easy")
        {
            let validSpaces = [];
            for(let i = 0; i < board.length; i++)
            {
                if(board[i] === "empty")
                {
                    validSpaces.push(i);
                }
            }
            let result = Math.floor(Math.random() * validSpaces.length);
            return validSpaces[result];
        }
        else if(this.difficulty === "normal")
        {
            alert("Under Construction");
        }
        else
        {
            if(this.player1.getType() === "ai")
            {
                aiPlayer = this.player1;
                humanPlayer = this.player2;
            }
            else
            {
                aiPlayer = this.player2;
                humanPlayer = this.player1;
            }
            let bestScore = -Infinity;
            let move;
            for (let i = 0; i < 9; i++) {
                if(board[i] === "empty") {
                    board[i] = aiPlayer.getPiece();
                    let score = minimax(board, 0, false);
                    board[i] = "empty";
                    if (score > bestScore) {
                        bestScore = score;
                        move = i;
                    }
                }
            }
            return move;
        }
    }

    function minimax(board, depth, isMaximizing) {
        let result = checkForWin();
        if(result !== "valid")
        {
            if(result === aiPlayer.getPiece())
            {
                return 1;
            } 
            else if(result === humanPlayer.getPiece())
            {
                return -1; 
            }
            else 
            {
                return 0;
            }
            
        }

        if(isMaximizing)
        {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if(board[i] === "empty"){
                    board[i] = aiPlayer.getPiece();
                    let score = minimax(board, depth+1, false);
                    board[i] = "empty";
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if(board[i] === "empty"){
                    board[i] = humanPlayer.getPiece();
                    let score = minimax(board, depth+1, true);
                    board[i] = "empty";
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    return {initPlayers, makeMove, emptyGrid, robotCalc, player1, player2, board}
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
    const spOptions1 = document.querySelectorAll('#secondChoice > .secondButton');
    const spOptions2 = document.querySelectorAll('#thirdChoice > .secondButton');

    const gridButton1 = document.getElementById("gridB1");
    const gridButton2 = document.getElementById("gridB2");
    
    (function(){
        let total = 0;
        for(let i = 0; i < 9; i++)
        {
                let temp = "item" + total;
                document.getElementById(temp).addEventListener('click', ()=>{
                askForMove(playerTurn, temp[4]);
            });
            total++;
        }
    })();

    function robotTurn()
    {
        askForMove(playerTurn, gameBoard.robotCalc(playerTurn));
    }

    function askForMove(xo, index) {
        if(finished === false)
        {
            let result = gameBoard.makeMove(xo, index);
            switch(result) {
                case "x":
                  playerBanner.style.color = "lightgreen";
                  finished = true;
                  playerBanner.innerText = "Player 1 wins!";
                  break;
                case "o":
                  playerBanner.style.color = "lightgreen";
                  finished = true;
                  playerBanner.innerText = "Player 2 wins!";
                  break;
                case "valid":
                  if(playerTurn === "x")
                  {
                    playerTurn = "o";
                    playerBanner.innerText = "Player 2's turn";
                    if(gameBoard.player2.getType() === "ai")
                    {
                        robotTurn();
                    }
                  }
                  else
                  {
                    playerTurn = "x";
                    playerBanner.innerText = "Player 1's turn";
                    if(gameBoard.player1.getType() === "ai")
                    {
                        robotTurn();
                    }
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

    for(let i = 0; i < spOptions1.length; i++)
    {
        spOptions1[i].addEventListener('click', ()=>{
            for(let k = 0; k < spOptions1.length; k++)
            {
                if(spOptions1[k].classList.contains("chosen"))
                {
                    spOptions1[k].classList.remove("chosen");
                }
            }
            spOptions1[i].classList.add("chosen");
            checkMoreOptions();
        })
    }

    for(let i = 0; i < spOptions2.length; i++)
    {
        spOptions2[i].addEventListener('click', ()=>{
            for(let k = 0; k < spOptions2.length; k++)
            {
                if(spOptions2[k].classList.contains("chosen"))
                {
                    spOptions2[k].classList.remove("chosen");
                }
            }
            spOptions2[i].classList.add("chosen");
            checkMoreOptions();
        })
    }

    function checkMoreOptions()
    {
        let counter = 0;
        let difficulty;
        let order;
        for(let i = 0; i < spOptions1.length; i++)
        {
            if(spOptions1[i].classList.contains("chosen"))
                {
                    counter++;
                    difficulty = spOptions1[i].id;
                    break
                }
        }
        for(let i = 0; i < spOptions2.length; i++)
        {
            if(spOptions2[i].classList.contains("chosen"))
                {
                    counter++;
                    order = spOptions2[i].id;
                    break;
                }
        }
        if(counter === 2)
        {
            onePlayerChosen(difficulty, order);
        }
    }
    
    function optionTwoPlayer(){
        menuTransition();
        gameBoard.initPlayers("human", "x", "human", "o", "none");
    }

    function optionOnePlayer(){
        let newButtons = document.getElementById("secondChoice");
        newButtons.style.display = "flex";
        let newerButtons = document.getElementById("thirdChoice");
        newerButtons.style.display = "flex";
    }

    function onePlayerChosen(difficulty, order){
        menuTransition();
        playerBanner.innerText = "Robots are evil";
        presentAI = true;
        if(order === "playx"){
            gameBoard.initPlayers("human", "x", "ai", "o", difficulty);
        } else {
            gameBoard.initPlayers("ai", "x", "human", "o", difficulty);
            robotTurn();
        }
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
        if(gameBoard.player1.getType() === "ai")
        {
            robotTurn();
        } 
        else
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