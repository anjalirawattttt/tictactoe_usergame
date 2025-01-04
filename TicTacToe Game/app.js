let boxes  =document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newgameBtn=document.querySelector("#newgameBtn");
let msgContainer=document.querySelector(".msg_container");
let msg=document.querySelector("#msg");
let turn0= true;
let count=0;
const winCombinations=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const resetGame=()=>{
    turn0=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
};



boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turn0){
            box.innerText="0";
            turn0=false;
        }
        else{
            box.innerText="X";
            turn0=true;
        }
        box.disabled=true;
        count++;
        let isWinner=checkWinner();
        if (checkWinner()) {
            return;
        }
        if (count === 9) {
            gameDraw();
        }
    });
});

const gameDraw=()=>{
    msg.innerText=`It's a tie!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};

const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

const showWinner=(winner)=>{
    msg.innerText=`Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};


const checkWinner= () => {
    for (let combination of winCombinations){
        let pos1value=boxes[combination[0]].innerText;
        let pos2value=boxes[combination[1]].innerText;
        let pos3value=boxes[combination[2]].innerText;
        if(pos1value!="" && pos2value!="" && pos3value!="" ){
            if(pos1value==pos2value && pos2value==pos3value){
                showWinner(pos1value);
                return true;
            }
        }
    }
    
};


newgameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
