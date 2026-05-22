console.log("Script.js Initializing..");
let ap = document.getElementById("auto");
let up = document.querySelector(".up");
let down = document.querySelector(".down");
let left = document.querySelector(".left");
let right = document.querySelector(".right");

const board = document.getElementById("board");

for (let i = 0; i < 225; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    board.appendChild(cell);
}

const cells = document.querySelectorAll(".cell");
cells.forEach(cell=>{
    cell.addEventListener("click", ()=>{
        cell.style.backgroundColor = 'var(--sc-color)'; 
    })
})

ap.addEventListener("click", ()=>{
    ap.innerHTML='<span><img src="assets/activated-robot-svgrepo-com.svg" alt="robot-icon"></span><span>Autopilot Mode</span>'
    ap.lastChild.style.color = 'var(--active-color)'
})

up.addEventListener("click",()=>{
    document.getElementById("robot").style.transform = 'translateY(-var(--cell-height))';
})

down.addEventListener("click",()=>{
    document.getElementById("robot").style.transform = 'translateY(var(--cell-height))';
})

left.addEventListener("click",()=>{
    document.getElementById("robot").style.transform = 'translateX(-var(--cell-height))';
})

right.addEventListener("click",()=>{
    document.getElementById("robot").style.transform = 'translateX(var(--cell-height))';
})