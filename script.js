let boxes = document.querySelectorAll(".box");
let btn = document.querySelector("#reset");
let msg_container = document.querySelector(".msg-container");
let newgame = document.querySelector("#newgame");
let msg = document.querySelector(".msg");
let turnO = true;

const winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msg_container.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (box.innerHTML === "") {
            if (turnO) {
                box.innerHTML = "O";
                turnO = false;
            } else {
                box.innerHTML = "X";
                turnO = true;
            }
            box.disabled = true;
            checkWinner();
        }
    });
});

const disableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
};

const showWinner = (winner) => {
    msg.innerHTML = `CONGRATULATIONS, WINNER ${winner}`;
    msg_container.classList.remove("hide");
    disableBoxes();
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerHTML = "";
    });
};

const checkWinner = () => {
    for (let pattern of winningPattern) {
        let pos1val = boxes[pattern[0]].innerHTML;
        let pos2val = boxes[pattern[1]].innerHTML;
        let pos3val = boxes[pattern[2]].innerHTML;
        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                return;
            }
        }
    }
       // Check for a draw
       if ([...boxes].every(box => box.innerHTML !== "")) {
        msg.innerHTML = `It's a draw!`;
        msg_container.classList.remove("hide");
    }
};

btn.addEventListener('click', resetGame);
newgame.addEventListener('click', resetGame);
