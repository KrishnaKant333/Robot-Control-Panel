console.log("Script.js Initializing..");
let cells = document.querySelectorAll(".cell");
let ap = document.getElementById("auto");
let up = document.querySelector(".up");

cells.forEach(cell=>{
    cell.addEventListener("click", ()=>{
        cell.setAttribute("style","background-color:var(--sc-color)")
    })
})

ap.addEventListener("click", ()=>{
    ap.innerHTML='<span><img src="assets/activated-robot-svgrepo-com.svg" alt="robot-icon"></span><span>Autopilot Mode</span>'
    ap.lastChild.setAttribute("style",'color:var(--active-color)')
})

up.addEventListener("click",()=>{
    document.querySelector(".")
})