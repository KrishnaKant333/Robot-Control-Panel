console.log("Script.js Initializing..");

let grid_size = 15

let x = 0;
let y = 0;
let battery = 100
let steps = 0

let isStopped = false;
let isAutoPilot = false;
let autoPilotInterval;
let stopInterval;

let obstacles = [];
let coordstring;

let i = 0;
let isblocked = false;
let obsInterval;

let nextX, nextY, nextcoordstring;

const index = 15 * y + x;

const ap = document.getElementById("auto");
const stop = document.getElementById("stop");

const board = document.getElementById("board");

const stts = document.getElementById("status");

for (let i = 0; i < grid_size * grid_size; i++) {
    cellx = i % 15;
    celly = Math.floor(i / 15);
    const cell = document.createElement("div");
    cell.classList.add("cell");
    board.appendChild(cell);
    cell.dataset.x = cellx;
    cell.dataset.y = celly;
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
    document.querySelector(".curr").innerHTML = `Current Position : (${x},${y})`
    document.querySelector(".battery").innerHTML = `Battery Level : ${battery}`
    document.querySelector(".stp").innerHTML = `Steps Taken : ${steps}`
}

function repeating_autopilot() {
    clearInterval(autoPilotInterval);
    isAutoPilot = false;
    ap.innerHTML = `<span><img src="assets/robot-svgrepo-com.svg" alt="robot-icon"></span><span>Autopilot Mode</span></span>`;
    ap.lastElementChild.style.color = "white";
    stts.innerHTML = ""
}

function obs(){
    obsInterval = setTimeout(() => {
        stts.innerHTML = `Obstacle encountered!`
    }, 500);
}

function movement(dir) {
    if (isStopped) {
        return;
    }

    switch (battery) {
        case 0: {
            alert("No battery! STOP to recharge.");
            repeating_autopilot()
            break;
        }
        case 20: {
            alert("Low Battery! AutoPilot is Disabled. STOP to Recharge.");
            repeating_autopilot()
            break;
        }
    }

    if (battery <= 0) {
        return;
    }

    if (dir === 'up' && y > 0) {
        nextX = x;
        nextY = y - 1;
        nextcoordstring = `${nextX}-${nextY}`;
        if (obstacles.includes(nextcoordstring)) {
            obs();
            return;
        }
        y--;
        document.querySelector(".dir").innerHTML = "Direction Facing : North";
        battery--;
        steps++;
    }
    else if (dir === 'down' && y < 14) {
        nextX = x;
        nextY = y + 1;
        nextcoordstring = `${nextX}-${nextY}`;
        if (obstacles.includes(nextcoordstring)) {
            obs();
            return;
        }
        y++;
        document.querySelector(".dir").innerHTML = "Direction Facing : South";
        battery--;
        steps++;
    }
    else if (dir === 'left' && x > 0) {
        nextX = x - 1;
        nextY = y;
        nextcoordstring = `${nextX}-${nextY}`;
        if (obstacles.includes(nextcoordstring)) {
            obs();
            return;
        }
        x--;
        document.querySelector(".dir").innerHTML = "Direction Facing : West";
        battery--;
        steps++;
    }
    else if (dir === 'right' && x < 14) {
        nextX = x + 1;
        nextY = y;
        nextcoordstring = `${nextX}-${nextY}`;
        if (obstacles.includes(nextcoordstring)) {
            obs();
            return;
        }
        x++;
        document.querySelector(".dir").innerHTML = "Direction Facing : East";
        battery--;
        steps++;
    }

    robot_placement();
    param_update();

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
        return;
    }
    if (isAutoPilot) {
        repeating_autopilot()
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

    stts.innerHTML = "AutoPilot mode ON."
}


function start_stop() {
    isStopped = !isStopped;
    if (isStopped) {
        clearInterval(autoPilotInterval);
        isAutoPilot = false;

        stop.innerHTML = `<span><img src="assets/activated-stop-signs-svgrepo-com.svg" alt="stop"></span><span>STOPPED</span></span>`;
        stop.lastElementChild.style.color = "var(--active-color)";

        ap.innerHTML = `<span><img src="assets/robot-svgrepo-com.svg" alt="robot-icon"></span><span>Autopilot Mode</span></span>`;
        ap.lastElementChild.style.color = "white";

        stopInterval = setInterval(() => {
            if (battery < 100) {
                battery++;
                document.querySelector(".battery").innerHTML = `Battery Level : ${battery}`
                stts.innerHTML = `Recharging.... Press Enter/Space to START`
            }
            else {
                stts.innerHTML = `Full Charge. Press Enter/Space to START`
            }
        }, 3000);
        stts.innerHTML = `Press Enter/Space to START`
    }
    else {
        stts.innerHTML = ""
        clearInterval(stopInterval);
        stop.innerHTML = `<span><img src="assets/stop-signs-svgrepo-com.svg" alt="stop"></span><span>STOP</span></span>`;
        stop.lastElementChild.style.color = "white";
    }
}

ap.addEventListener("click", autopilot);
stop.addEventListener("click", start_stop);

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        coordstring = `${cell.dataset.x}-${cell.dataset.y}`;
        robocoordstring = `${x}-${y}`;
        // isblocked = !isblocked;
        if (!isblocked) {
            if (i < grid_size * grid_size) {
                if (!obstacles.includes(coordstring)) {
                    obstacles.push(coordstring);
                    console.log(obstacles);
                    i++;
                }
            }
            cell.style.backgroundColor = "var(--sc-color)"
        }
        else {
            cell.style.backgroundColor = "var(--pr-color)"
        }

    })
})
