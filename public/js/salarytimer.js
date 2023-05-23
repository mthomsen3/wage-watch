const timeDisplay = document.querySelector("#timeDisplay");
const moneyDisplay = document.querySelector("#moneyDisplay");
const lapTimeDisplay = document.querySelector("#lapTimeDisplay");
const startButton = document.querySelector("#startButton");
const lapButton = document.querySelector("#lapButton");
const pauseButton = document.querySelector("#pauseButton");
const resetButton = document.querySelector("#resetButton");

const salaryInput = document.querySelector(".salaryInput");
const yearAverageHourly = document.getElementById('yearAverageHourly')
const fortyHourWeekHourly = document.getElementById('fortyHourWeekHourly')

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let laps = 1;
let lastLap = { hrs: 0, mins: 0, secs: 0, tms: 0, ms: 0 };
let hrs = 0;
let mins = 0;
let secs = 0;
let ms = 0;
let money = 0;
let selectedAvg = 0;
let tmsly = 0;

document.getElementById("home").onclick = function () {
    location.href = "/";
};

startButton.addEventListener("click", () => {
    if (paused) {
        paused = false;
        if (yearAverageHourly.checked) {
            // # work tms (ten millisec) in 1 year
            // ms/year = 31540000000 source=google query=milliseconds per year
            selectedAvg = 3154000000;
            
        } else if (fortyHourWeekHourly.checked) {
            // # work tms (ten millisec) in 40H x 50W
            // ms/2000 hours = 7200000000
            selectedAvg = 720000000;
        } else {
            selectedAvg = 0;
        }
        salary = salaryInput.value;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 1);
    }
});

lapButton.addEventListener("click", () => {
    if (!paused) {
        paused = false;
        addLap();
    }
});

pauseButton.addEventListener("click", () => {
    if (!paused) {
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
    }
});

resetButton.addEventListener("click", () => {
    paused = true;
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;
    laps = 1;
    lastLap = { hrs: 0, mins: 0, secs: 0, tms: 0, ms: 0 };
    hrs = 0;
    mins = 0;
    secs = 0;
    ms = 0;
    money = 0;
    moneyDisplay.textContent = "Total Earnings: $ 0.00";
    timeDisplay.textContent = "Elapsed Time: 00:00:00:00";
    lapTimeDisplay.textContent = "";
    selectedAvg = 0;
});



function pad(unit) {
    return (("0") + unit).length > 2 ? unit : "0" + unit;
}

function updateTime() {
    elapsedTime = Date.now() - startTime;

    ms = Math.floor((elapsedTime / 10) % 100);
    tms = Math.floor((elapsedTime / 10));
    secs = Math.floor((elapsedTime / 1000) % 60);
    mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

    // ms updates are too quick for browser, but sec updates seem to slow
    // using 10ms (tms) which seems to work fine, may need upated to 100ms
    // if latency issues crop up in the future
    tmsly = salary / selectedAvg;
    money = (tmsly * tms).toFixed(2);

    ms = pad(ms);
    secs = pad(secs);
    mins = pad(mins);
    hrs = pad(hrs);


    moneyDisplay.textContent = `Total Earnings: $ ${money}`;
    timeDisplay.textContent = `Elapsed Time: ${hrs}:${mins}:${secs}:${ms}`;

}

function addLap() {

    let lapMs = Math.abs(ms - lastLap.ms);
    let lapTms = Math.abs(tms - lastLap.tms);
    let lapSecs = Math.abs(secs - lastLap.secs);
    let lapMins = Math.abs(mins - lastLap.mins);
    let lapHrs = Math.abs(hrs - lastLap.hrs);
    lastLap = { hrs, mins, secs, tms, ms };

    lapMoney = (tmsly * lapTms).toFixed(2);

    lapMs = pad(lapMs);
    lapSecs = pad(lapSecs);
    lapMins = pad(lapMins);
    lapHrs = pad(lapHrs);

    let printLap = document.createElement("li");
    if(selectedAvg == 3154000000) {
        printLap.textContent = `You made $ ${lapMoney} in ${lapHrs}:${lapMins}:${lapSecs}:${lapMs} at a yearly salary of $ ${salary} (whole year averaged)`;

    } else if (selectedAvg == 720000000) {
        printLap.textContent = `You made $ ${lapMoney} in ${lapHrs}:${lapMins}:${lapSecs}:${lapMs} at a yearly salary of $ ${salary} (simulated 40H/W wage)`;
    }
    lapTimeDisplay.append(printLap);
    laps += 1;
}