localStorage.setItem("timer", "focus");
localStorage.setItem("notify", "false");

const startButton = document.getElementById("start");
const skipButton = document.getElementById("skip");
const saveButton = document.getElementById("save");
const settingsButton = document.getElementById("settings");
const notifyBox = document.getElementById("notifications");
const overlay = document.getElementById("overlay");
const bell = document.querySelector("audio");
const header = document.querySelector("h1");

let time, liveTimer;
let isStarted = false;

startButton.addEventListener("click", () => {
    if(startButton.textContent != "reset"){
        bell.play();
    };

    let mode = localStorage.getItem("timer");
    skipButton.style = "display: none";
    setTime();

    if (!isStarted) {
        liveTimer = setInterval(updateCountdown, 1000);
        header.textContent = mode;
        
        if (mode === "focus") {
            document.querySelector("body").style = "background-color: rgb(219, 255, 223)"
            startButton.textContent = "reset";
        } else {
            document.querySelector("body").style = "background-color: rgb(219, 253, 255)"
            startButton.textContent = "skip";
        }
        isStarted = true;
    } else {
        clearInterval(liveTimer);
        header.textContent = "pomodoro-timer";
        document.querySelector("body").style = "background-color: white";
        localStorage.setItem("timer", "focus");
        time = document.getElementById("focusTime").value * 60;
        startButton.textContent = "start focus";

        updateText();
        isStarted = false;
    }
});

skipButton.addEventListener("click", () => {
    header.textContent = "pomodoro-timer";
    document.querySelector("body").style = "background-color: white";

    localStorage.setItem("timer", "focus");
    time = document.getElementById("focusTime").value * 60;

    const minutes = Math.floor(time / 60);
    const seconds = time % 60 < 10 ? "0" + (time % 60) : time % 60;
    document.getElementById("time").textContent = `${minutes}:${seconds}`;

    skipButton.style = "display: none";
    startButton.textContent = "start focus";
});

saveButton.addEventListener("click", () => {
    if (!isStarted){
        startText();
    }

    if(document.getElementById("notifications").checked == true){
        if (!Notification) {
            alert('Desktop notifications not available in your browser. Try another browser.');
            document.getElementById("notifications").checked = false;
            return;
        }

        if (Notification.permission !== 'granted'){
            Notification.requestPermission();
        }

        localStorage.setItem("notify", "true");
    } else {
        localStorage.setItem("notify", "false");
    }


    document.getElementById("modal").style.display = "none";
    document.getElementById("overlay").style.display = "none";
});

settingsButton.addEventListener("click", () => {
    document.getElementById("modal").style.display = "block";
    document.getElementById("overlay").style.display = "block";
});

overlay.addEventListener("click", () => {
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
        bell.play();
        let mode = localStorage.getItem("timer");
        header.textContent = mode + " time ended";
        document.querySelector("body").style = "background-color: white";
        isStarted = false;

        if(localStorage.getItem("notify") === "true"){
            if (mode === "focus") {
                let notification = new Notification('focus time is over!');
            } else {
                let notification = new Notification('break time is over!');
            }
        }

        if (mode === "focus") {
            startButton.textContent = "start break";
            skipButton.style = "display: inline";
            localStorage.setItem("timer", "break");
        } else {
            startButton.textContent = "start focus";
            localStorage.setItem("timer", "focus");
        }
        clearInterval(liveTimer);
        startButton.style = "display: inline";
    }
}