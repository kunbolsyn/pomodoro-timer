localStorage.setItem("timer", "focus");
const startButton = document.getElementById("start");
const skipButton = document.getElementById("skip");
const saveButton = document.getElementById("save");
const settingsButton = document.getElementById("settings");
const overlay = document.getElementById("overlay");
let time, liveTimer;
let isStarted = false;

startButton.addEventListener("click", () => {
    let mode = localStorage.getItem("timer");
    skipButton.style.transform = "scale(0)";
    setTime();

    if (!isStarted) {
        liveTimer = setInterval(updateCountdown, 1000);
        if (mode === "focus") {
            startButton.textContent = "reset";
        } else {
            startButton.textContent = "skip";
        }
        isStarted = true;
    } else {
        clearInterval(liveTimer);
        localStorage.setItem("timer", "focus");
        time = document.getElementById("focusTime").value * 60;
        startButton.textContent = "start focus";

        updateText();
        isStarted = false;
    }
});

skipButton.addEventListener("click", () => {
    localStorage.setItem("timer", "focus");
    time = document.getElementById("focusTime").value * 60;

    const minutes = Math.floor(time / 60);
    const seconds = time % 60 < 10 ? "0" + (time % 60) : time % 60;
    document.getElementById("time").textContent = `${minutes}:${seconds}`;

    skipButton.style.transform = "scale(0)";
    startButton.textContent = "start focus";
});

saveButton.addEventListener("click", () => {
    if (!isStarted){
        startText();
    }

    document.getElementById("modal").style.display = "none";
    document.getElementById("overlay").style.display = "none";
});

settingsButton.addEventListener("click", () => {
    document.getElementById("modal").style.display = "block";
    document.getElementById("overlay").style.display = "block";
});

overlay.addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    saveButton.click();
});

function startText() {
    setTime();
    updateText();
}

function setTime() {
    let mode = localStorage.getItem("timer");
    if (mode === "focus") {
        time = document.getElementById("focusTime").value * 60;
    } else {
        time = document.getElementById("breakTime").value * 60;
    }
}

function updateText() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60 < 10 ? "0" + (time % 60) : time % 60;
    document.getElementById("time").textContent = `${minutes}:${seconds}`;
}

function updateCountdown() {
    updateText();
    if (time > 0) {
        time--;
    } else {
        let mode = localStorage.getItem("timer");
        isStarted = false;

        if (mode === "focus") {
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