console.log("Script.js Initializing..");

let x = 0;
let y = 0;
let battery = 100
let steps = 0
steps++
const index = 15 * y + x;

const ap = document.getElementById("auto");
const stop = document.getElementById("stop");

const board = document.getElementById("board");
for (let i = 0; i < 225; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    board.appendChild(cell);
}
const cells = document.querySelectorAll(".cell");
cells[index].innerHTML = '<img src="assets/robot-svgrepo-com.svg" alt="robot-icon">';

function robot_placement() {
    cells.forEach(cell => {
        cell.innerHTML = "";
    });
    const index = 15 * y + x;
    cells[index].innerHTML = '<img src="assets/robot-svgrepo-com.svg" alt="robot-icon">';
}

function param_update() {
    document.querySelector(".curr").innerHTML = "Current Position : (" + x + "," + y + ")";
    document.querySelector(".battery").innerHTML = "Battery Level : " + --battery;
    document.querySelector(".stp").innerHTML = "Steps Taken : " + steps++;
}

function movement(dir) {
    if (battery > 0) {
        if (dir === 'up' && y > 0) {
            document.querySelector(".dir").innerHTML = "Direction Facing : North";
            y--;
            param_update();
        }
        if (dir === 'down' && y < 14) {
            document.querySelector(".dir").innerHTML = "Direction Facing : South";
            y++;
            param_update();
        }
        if (dir === 'left' && x > 0) {
            document.querySelector(".dir").innerHTML = "Direction Facing : West";
            x--;
            param_update();
        }
        if (dir === 'right' && x < 14) {
            document.querySelector(".dir").innerHTML = "Direction Facing : East";
            x++;
            param_update();
        }
        robot_placement();
    }
    else {
        alert("No Battery!")
    }
} 


document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
        case "w":
            movement('up');
            break;
        case "ArrowDown":
        case "s":
            movement('down');
            break;
        case "ArrowLeft":
        case "a":
            movement('left');
            break;
        case "ArrowRight":
        case "d":
            movement('right');
            break;
    }
});

autopilot();
stopped();
function autopilot() {
    ap.addEventListener("click", () => {
        ap.innerHTML = '<span><img src="assets/activated-robot-svgrepo-com.svg" alt="robot-icon"></span><span>Autopilot Mode</span>'
        ap.lastChild.style.color = 'var(--active-color)'
    })
}
function stopped() {
    stop.addEventListener("click", () => {
        stop.innerHTML = '<span><img src="assets/activated-stop-signs-svgrepo-com.svg" alt="stop-sign"></span><span>STOP</span>'
        stop.lastChild.style.color = 'var(--active-color)'
    })
}

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        cell.style.backgroundColor = 'var(--sc-color)';
    })
});
