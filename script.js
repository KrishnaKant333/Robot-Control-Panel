console.log("Script.js Initializing..");

const grid_size = 15

let x = 0;
let y = 0;
let battery = 100
let steps = 0
let direction = "--";

let isStopped = false;
let isAutoPilot = false;
let autoPilotInterval;
let stopInterval;

let obstacles = [];
let coordstring;
let robocoordstring;

const ap = document.getElementById("auto");
const stop = document.getElementById("stop");

const board = document.getElementById("board");

const stts = document.getElementById("status");

for (let i = 0; i < grid_size * grid_size; i++) {
    const cellx = i % 15;
    const celly = Math.floor(i / 15);
    const cell = document.createElement("div");
    cell.classList.add("cell");
    board.appendChild(cell);
    cell.dataset.x = cellx;
    cell.dataset.y = celly;
}

const cells = document.querySelectorAll(".cell");
robot_placement();

function robot_placement() {
    cells.forEach(cell => {
        cell.innerHTML = "";
    });
    const index = grid_size * y + x;
    cells[index].innerHTML = '<img src="assets/robot-svgrepo-com.svg" alt="robot-icon">';
    cells[index].classList.add("trail");
}

function param_update() {
    document.querySelector(".curr").innerHTML = `Current Position : (${x},${y})`
    document.querySelector(".battery").innerHTML = `Battery Level : ${battery}`
    document.querySelector(".dir").innerHTML = `Direction Facing : ${direction}`
    document.querySelector(".stp").innerHTML = `Steps Taken : ${steps}`
}

function statusbar(msg) {
    stts.innerHTML = msg;
}

function stop_autopilot() {
    clearInterval(autoPilotInterval);
    isAutoPilot = false;
    ap.innerHTML = `<span><img src="assets/robot-svgrepo-com.svg" alt="robot-icon"></span><span>Autopilot Mode</span></span>`;
    ap.lastElementChild.style.color = "white";
}

function movement(dir) {
    if (isStopped) {
        return;
    }

    if (battery <= 0) {
        statusbar("Battery Dead. Stop to Recharge.")
        return;
    }
    let nextX = x;
    let nextY = y;

    if (dir === 'up') {
        nextY--;
        direction = "North";
    }
    else if (dir === 'down') {
        nextY++;
        direction = "South";
    }
    else if (dir === 'left') {
        nextX--;
        direction = "West";
    }
    else if (dir === 'right') {
        nextX++;
        direction = "East";
    }

    if (nextX < 0 || nextX >= grid_size || nextY < 0 || nextY >= grid_size) {
        statusbar("Wall Boundary reached!");
        stop_autopilot();
        return;
    }

    const nextcoordstring = `${nextX}-${nextY}`;
    if (obstacles.includes(nextcoordstring)) {
        statusbar("Obstacle Encountered!");
        stop_autopilot();
        return;
    }

    const prevIndex = grid_size * y + x;
    cells[prevIndex].classList.add("Trail");
    x = nextX;
    y = nextY;
    battery--;
    steps++;
    robot_placement();
    param_update();
    statusbar("");
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
        case "f":
            autopilot();
            break;
        case " ":
        case "Enter":
            start_stop();
            break;
    }
});

function autopilot() {
    if (isStopped) {
        return;
    }
    if (battery <= 20) {
        statusbar("Low Battery. AutoPilot Mode Disabled.");
        return;
    }
    if (isAutoPilot) {
        stop_autopilot();
        statusbar("AutoPilot OFF.")
        return;
    }
    isAutoPilot = true;
    ap.innerHTML = `<span><img src="assets/activated-robot-svgrepo-com.svg" alt="robot-icon"></span><span>Autopilot Mode</span></span>`;
    ap.lastElementChild.style.color = "var(--active-color)";

    let directions = ['right', 'down', 'left', 'up'];
    let currDirection = Math.floor(Math.random() * 4);
    let moveCount = 0;

    autoPilotInterval = setInterval(() => {
        movement(directions[currDirection]);
        moveCount++;
        if (moveCount == 3) {
            moveCount = 0;
            currDirection = (currDirection + 1) % 4;
        }
    }, 500);

    statusbar("AutoPilot Mode ON.");
}

function disabled_ap() {
    ap.innerHTML = `<span><img src="assets/disabled-robot-svgrepo-com.svg" alt="robot-icon"></span><span>Autopilot Mode</span></span>`
    ap.lastElementChild.style.color = `#757575`;
}


function start_stop() {
    isStopped = !isStopped;
    if (isStopped) {
        stop_autopilot();

        stop.innerHTML = `<span><img src="assets/activated-stop-signs-svgrepo-com.svg" alt="stop"></span><span>STOPPED</span></span>`;
        stop.lastElementChild.style.color = "var(--active-color)";
        statusbar("Robot Stopped. Press Enter/Space to START.");
        disabled_ap();

        stopInterval = setInterval(() => {
            if (battery < 100) {
                battery++;
                param_update();
                statusbar("Recharging...");
            }
            else {
                stts.innerHTML = `Full Charge. Press Enter/Space to START.`
            }
        }, 2000);
    }
    else {
        statusbar("");
        clearInterval(stopInterval);
        stop.innerHTML = `<span><img src="assets/stop-signs-svgrepo-com.svg" alt="stop"></span><span>STOP</span></span>`;
        stop.lastElementChild.style.color = "white";
        stop_autopilot();
    }
}

ap.addEventListener("click", autopilot);
stop.addEventListener("click", start_stop);

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        coordstring = `${cell.dataset.x}-${cell.dataset.y}`;
        robocoordstring = `${x}-${y}`;
        if (coordstring === robocoordstring) {
            return;
        }
        if (obstacles.includes(coordstring)) {
            const obstacleIndex = obstacles.indexOf(coordstring);
            obstacles.splice(obstacleIndex, 1);
            cell.classList.remove("obstacle");
        }
        else {
            obstacles.push(coordstring);
            cell.classList.remove("trail");
            cell.classList.add("obstacle");
        }
    });
});

param_update();
