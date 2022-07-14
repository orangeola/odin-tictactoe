const gameBoard = (() => {
    let player1;
    let player2;
    const yell = () => {
        alert("aa");
    }
    return {yell};
})();

const Player = () => {
}

const mainMenu = document.getElementById("mainMenu");
const twoPlayer = document.getElementById("two");
const onePlayer = document.getElementById("one");
const banban = document.getElementById("banner");
const grid = document.getElementById("gridContainer");

twoPlayer.addEventListener('click', optionTwo);

function optionTwo(){
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

onePlayer.addEventListener('click', () => {
    alert("a");
})