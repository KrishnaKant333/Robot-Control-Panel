console.log("Script.js Initializing..");

let x = 0;
let y = 0;
let battery = 100
let steps = 0

let isStopped = false;
let isAutoPilot = false;
let autoPilotInterval;

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
    document.querySelector(".curr").innerHTML = `Current Position : (${x}, ${y})`
    document.querySelector(".battery").innerHTML = `Battery Level : ${battery}`
    document.querySelector(".stp").innerHTML = `Steps Taken : ${steps}`
}

function movement(dir) {
    if (isStopped) {
        return;
    }

    switch (battery) {
        case 0: {
            alert("No battery!");
            clearInterval(autoPilotInterval);
            isAutoPilot = false;
            ap.innerHTML = `<span><img src="assets/robot-svgrepo-com.svg" alt="robot-icon"></span><span>Autopilot Mode</span></span>`;
            ap.lastElementChild.style.color = "white";
            break;
        }
        case 20: {
            alert("Low Battery! STOP to recharge");
            break;
        }
    }

    if (battery <= 0) {
        return;
    }

    if (dir === 'up' && y > 0) {
        document.querySelector(".dir").innerHTML = "Direction Facing : North";
        y--;
        battery--;
        steps++;
    }
    else if (dir === 'down' && y < 14) {
        document.querySelector(".dir").innerHTML = "Direction Facing : South";
        y++;
        battery--;
        steps++;
    }
    else if (dir === 'left' && x > 0) {
        document.querySelector(".dir").innerHTML = "Direction Facing : West";
        x--;;
        battery--;
        steps++;
    }
    else if (dir === 'right' && x < 14) {
        document.querySelector(".dir").innerHTML = "Direction Facing : East";
        x++;
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
    }
});

document.addEventListener("keypress", (e) => {
    switch (e.key) {
        case "f":
            autopilot();
            break;
    }
})

autopilot();
start_stop();

function autopilot() {
    ap.addEventListener("click", () => {
        if (isStopped) {
            return;
        }

        if (isAutoPilot) {
            clearInterval(autoPilotInterval);
            isAutoPilot = false;
            ap.innerHTML = `<span><img src="assets/robot-svgrepo-com.svg" alt="robot-icon"></span><span>Autopilot Mode</span></span>`;
            ap.lastElementChild.style.color = "white";
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
    });
}

function start_stop() {
    stop.addEventListener("click", () => {
        isStopped = !isStopped;
        if (isStopped) {
            clearInterval(autoPilotInterval);
            isAutoPilot = false;

            stop.innerHTML = `<span><img src="assets/activated-stop-signs-svgrepo-com.svg" alt="stop"></span><span>STOPPED</span></span>`;
            stop.lastElementChild.style.color = "var(--active-color)";

            ap.innerHTML = `<span><img src="assets/robot-svgrepo-com.svg" alt="robot-icon"></span><span>Autopilot Mode</span></span>`;
            ap.lastElementChild.style.color = "white";
        }
        else {
            stop.innerHTML = `<span><img src="assets/stop-signs-svgrepo-com.svg" alt="stop"></span><span>STOP</span></span>`;
            stop.lastElementChild.style.color = white;
        }
    })
}

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        cell.style.backgroundColor = 'var(--sc-color)';
    })
});
