
let resultWord = undefined;

function getWord() {

    const URL = "http://localhost:8080/game/word";

    fetch(URL)
        .then((response) => {
            if(response.ok === false) {
                throw new Error("Word Response Error: " + response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Word: " + data.toLowerCase());
            resultWord = data.toLowerCase();
            
            // Start Game
            window.addEventListener("keydown", game);            

        })
        .catch((error) => {
            console.error(error);
        });

}




function enterHandler() {

    if(currentWord.length < resultWord.length) {
        alert("Must enter word with 5 character!");
        return;
    }

    validateStep();

    currentWord = "";
    gameStep++;

    if(gameStep === 6) {
        playAgain();
    }

}

function removeCharacterGUI(step) {

    let parentElement = document.getElementById("row-" + step);
    let childElement = parentElement.children[currentWord.length-1];

    childElement.removeChild(childElement.children[0]);

}

function backspaceHandler() {

    if(currentWord.length === 0) {
        return;
    }

    removeCharacterGUI(gameStep);

    currentWord = currentWord.slice(0, -1);
    // console.log(currentWord);

}

function printLetterGUI(step, row, value) {

    let parentElement = document.getElementById("row-" + step);
    let childElement = parentElement.children[row];

    childElement.innerHTML = "<span class='value'>" + value + "</span>";

}

function filterKeys(key) {

    let letterCheck = (key >= "a" && key <= "z");
    return letterCheck;

}

function handleKeyDown(key) {

    if(currentWord.length === resultWord.length) {
        return;
    }

    if(filterKeys(key) === false) {
        return;
    }

    currentWord += key;

    printLetterGUI(gameStep, currentWord.length - 1, key);
    

    // console.log(currentWord);
    
}

// Yellow
function containsChar(step, row) {

    let parentElement = document.getElementById("row-" + step);
    let childElement = parentElement.children[row];

    childElement.style.backgroundColor = "yellow";
    childElement.style.opacity = 0.9;

}

// Green
function rightPosition(step, row) {

    let parentElement = document.getElementById("row-" + step);
    let childElement = parentElement.children[row];

    childElement.style.backgroundColor = "green";
    childElement.style.opacity = 0.9;

}

// Red
function notContain(step, row) {

    let parentElement = document.getElementById("row-" + step);
    let childElement = parentElement.children[row];

    childElement.style.backgroundColor = "red";
    childElement.style.opacity = 0.9;

}

function validateStep() {

    let result = resultWord;
    let currentResult = currentWord;

    let idx = 0;
    let trueCount = 0;
    for(let item of currentResult) {
                
        let flag = false;

        // Yellow
        if(result.includes(item) === true) {

            // console.log("[" + item + "]" + " not right position!")

            containsChar(gameStep, idx);
            flag = true;

        }

        // Green
        if(result.includes(item) === true && currentResult[idx] === result[idx]) {

            // console.log("[" + item + "]" + " right position!")
            
            rightPosition(gameStep, idx);
            flag = true;

            trueCount++;

        }

        // Red
        if(flag === false) {
            // console.log("[" + item + "]" + " does not contained!")

            notContain(gameStep, idx);

        }

        idx++;

        // console.log("----------------------------------------------------------------------");
        
    }

    if(trueCount === resultWord.length) {
        win();
        return;
    }

    // console.log(trueCount);

}

function win() {
    gameStatus = false;    
    playAgain();
}

function playAgain() {

    let button = document.getElementsByClassName("button")[0];
    button.style.visibility = "visible";

    button.addEventListener("click", () => {
        location.reload();
    });

}


let gameStatus = true;
let currentWord = "";
let gameStep = 0;

function game(event) {

    if(gameStep === 6 || gameStatus === false) {
        gameStatus === false;
        alert("Game is over, try again!");
        playAgain();
        return;
    }

    if(gameStatus === true) {

        switch (event.key) {
            case "Backspace":
                backspaceHandler();            
                break;
        
            case("Enter"):
                enterHandler();
                break;

            default:
                handleKeyDown(event.key);
                break;
        }
        
    }
    
}


getWord();



