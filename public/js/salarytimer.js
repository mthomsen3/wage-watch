// UI Elements
const timeDisplay = document.querySelector("#timeDisplay");
const moneyDisplay = document.querySelector("#moneyDisplay");
const lapTimeDisplay = document.querySelector("#lapTimeDisplay");
const salaryInput = document.querySelector(".salaryInput");
const yearAverageHourly = document.getElementById('yearAverageHourly');
const fortyHourWeekHourly = document.getElementById('fortyHourWeekHourly');
const buttons = {
    start: document.querySelector("#startButton"),
    lap: document.querySelector("#lapButton"),
    pause: document.querySelector("#pauseButton"),
    reset: document.querySelector("#resetButton")
};

// Constants
const MS_PER_HOUR = 3600000; 
const MS_PER_YEAR = 31540000000;  // Milliseconds per year
const MS_PER_FORTY_HOURS_WEEK = 720000000;  // Milliseconds per 40 hours week
const INTERVAL_DELAY_MS = 30;  // Interval delay in milliseconds

// Variables
let startTime = 0;
let elapsedTime = 0;
let intervalId;
let salary = 0;
let moneyPerMs = 0;
let lapData = { elapsedTime: 0, money: 0 };
let laps = 1;

function pad(unit) {
    return unit.toString().padStart(2, '0');
}

function updateTime() {
    elapsedTime = Date.now() - startTime;

    const hours = Math.floor(elapsedTime / MS_PER_HOUR);
    const minutes = Math.floor((elapsedTime % MS_PER_HOUR) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    const ms = Math.floor((elapsedTime % 1000) / 10);

    const money = (moneyPerMs * elapsedTime).toFixed(2);

    moneyDisplay.textContent = `Total Earnings: $ ${money}`;
    timeDisplay.textContent = `Elapsed Time: ${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(ms)}`;
}


function addLap() {
    const lapElapsedTime = elapsedTime - lapData.elapsedTime; // Calculate the elapsed time for this lap

    const lapHours = Math.floor(lapElapsedTime / MS_PER_HOUR);
    const lapMinutes = Math.floor((lapElapsedTime % MS_PER_HOUR) / (1000 * 60));
    const lapSeconds = Math.floor((lapElapsedTime % (1000 * 60)) / 1000);
    const lapMs = Math.floor((lapElapsedTime % 1000) / 10);

    const currentMoney = (moneyPerMs * elapsedTime).toFixed(2); // Calculate the current money
    const lapMoney = (currentMoney - lapData.money).toFixed(2); // Calculate the money earned during this lap

    let printLap = document.createElement("li");
    if(moneyPerMs === salary / MS_PER_YEAR) {
        printLap.textContent = `You made $ ${lapMoney} in ${pad(lapHours)}:${pad(lapMinutes)}:${pad(lapSeconds)}:${pad(lapMs)} at a yearly salary of $ ${salary} (whole year averaged)`;
    } else if (moneyPerMs === salary / MS_PER_FORTY_HOURS_WEEK) {
        printLap.textContent = `You made $ ${lapMoney} in ${pad(lapHours)}:${pad(lapMinutes)}:${pad(lapSeconds)}:${pad(lapMs)} at a yearly salary of $ ${salary} (simulated 40H/W wage)`;
    }
    lapTimeDisplay.append(printLap);
    laps += 1;

    // Update the start time and money for the next lap
    lapData = { elapsedTime, money: parseFloat(currentMoney) };
}

function resetVariables() {
    startTime = 0;
    elapsedTime = 0;
    lapData = { elapsedTime: 0, money: 0 };
    laps = 1;
    moneyDisplay.textContent = "Total Earnings: $0.00";
    timeDisplay.textContent = "Elapsed Time: 00:00:00:00";
    lapTimeDisplay.textContent = "";
    salary = 0;
    moneyPerMs = 0;
}

document.getElementById("home").onclick = () => location.href = "/";

buttons.start.addEventListener("click", () => {
    if (salaryInput.value) {
        salary = parseFloat(salaryInput.value);
        if (yearAverageHourly.checked) {
            moneyPerMs = salary / MS_PER_YEAR;
        } else if (fortyHourWeekHourly.checked) {
            moneyPerMs = salary / MS_PER_FORTY_HOURS_WEEK;
        } else {
            console.error('Please select average salary calculation method.');
            return;
        }
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, INTERVAL_DELAY_MS);
    } else {
        console.error('Please input a valid salary.');
    }
});

buttons.lap.addEventListener("click", addLap);
buttons.pause.addEventListener("click", () => clearInterval(intervalId));
buttons.reset.addEventListener("click", () => {
    clearInterval(intervalId);
    resetVariables();
});
