console.log("Script.js Initializing..");

let x = 0;
let y = 0;
const index = 15*y + x;

let ap = document.getElementById("auto");

const board = document.getElementById("board");
for (let i = 0; i < 225; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    board.appendChild(cell);
}
const cells = document.querySelectorAll(".cell");
cells[index].innerHTML = '<img src="assets/robot-svgrepo-com.svg" alt="robot-icon">';

function robot_placement(){
    cells.forEach(cell=>{
        cell.innerHTML="";
    });
    const index = 15*y + x;
    cells[index].innerHTML = '<img src="assets/robot-svgrepo-com.svg" alt="robot-icon">';
    document.querySelector(".curr").innerHTML = "Current Position : ("+x+","+y+")";
}

function movement(dir){
    if(dir === 'up' && y>0)
        y--;
    if(dir === 'down' && y<14)
        y++;
    if(dir === 'left' && x>0)
        x--;
    if(dir === 'right' && x<14)
        x++;
    robot_placement();
}

cells.forEach(cell=>{
    cell.addEventListener("click", ()=>{
        cell.style.backgroundColor = 'var(--sc-color)'; 
    })
});


ap.addEventListener("click", ()=>{
    ap.innerHTML='<span><img src="assets/activated-robot-svgrepo-com.svg" alt="robot-icon"></span><span>Autopilot Mode</span>'
    ap.lastChild.style.color = 'var(--active-color)'
})