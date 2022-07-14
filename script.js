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

twoPlayer.addEventListener('click', optionTwo);

function optionTwo(){
    mainMenu.classList.add("hidden");
    onePlayer.classList.add("noClick");
    twoPlayer.classList.add("noClick");
    setTimeout(function(){ 
        banban.classList.add("visible");
        mainMenu.style.display = "none";
    }, 700);
}

onePlayer.addEventListener('click', () => {
    alert("a");
})