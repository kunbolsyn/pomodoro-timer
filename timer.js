localStorage.setItem("timer", "focus");
const startButton = document.getElementById("start");
const skipButton = document.getElementById("skip");
let time, liveTimer;
let isStarted = false;

startButton.addEventListener("click", () => {
    let mode = localStorage.getItem("timer");

    if (mode === "focus") {
        time = document.getElementById("focusTime").value * 60;
    } else {
        time = document.getElementById("breakTime").value * 60;
    }

    if(!isStarted){
        liveTimer = setInterval(updateCountdown, 1000);
        startButton.textContent = "reset";
        isStarted = true;
    } else {
        clearInterval(liveTimer);
        if (mode === "focus") {
            time = document.getElementById("focusTime").value * 60;
        } else {
            time = document.getElementById("breakTime").value * 60;
        }
        const minutes = Math.floor(time / 60);
        const seconds = time % 60 < 10 ? "0" + (time % 60) : time % 60;
        document.getElementById("time").textContent = `${minutes}:${seconds}`;

        startButton.textContent = "start focus";
        isStarted = false;
    }
});

skipButton.addEventListener("click", () => {
    let mode = localStorage.getItem("timer");
    time = document.getElementById("focusTime").value * 60;

    const minutes = Math.floor(time / 60);
    const seconds = time % 60 < 10 ? "0" + (time % 60) : time % 60;
    document.getElementById("time").textContent = `${minutes}:${seconds}`;

    skipButton.style.transform = "scale(1)";
    startButton.textContent = "start focus";
});

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60 < 10 ? "0" + (time % 60) : time % 60;

    document.getElementById("time").textContent = `${minutes}:${seconds}`;
    if(time > 0){
        time--;
    } else {
        let mode = localStorage.getItem("timer");

        if(mode === "focus"){
            startButton.textContent = "start break";
            skipButton.style.transform = "scale(1)";
            localStorage.setItem("timer", "break");
        } else {
            startButton.textContent = "start focus";
            localStorage.setItem("timer", "focus");
        }
        clearInterval(liveTimer);
        startButton.style.transform = "scale(1)";
    }
}