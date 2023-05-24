// UI Elements
const timeDisplay = document.querySelector("#timeDisplay");
const moneyDisplay = document.querySelector("#moneyDisplay");
const lapTimeDisplay = document.querySelector("#lapTimeDisplay");
const hourlyInput = document.querySelector(".hourlyInput");
const buttons = {
    start: document.querySelector("#startButton"),
    lap: document.querySelector("#lapButton"),
    pause: document.querySelector("#pauseButton"),
    reset: document.querySelector("#resetButton")
};

// Constants
const MS_PER_HOUR = 3600000;  // One hour in milliseconds
const INTERVAL_DELAY_MS = 30;  // Interval delay in milliseconds

// Variables
let startTime = 0;
let elapsedTime = 0;
let intervalId;
let hourlyWage = 0;
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
    printLap.textContent = `You made $ ${lapMoney} in ${pad(lapHours)}:${pad(lapMinutes)}:${pad(lapSeconds)}:${pad(lapMs)} at a rate of ${hourlyWage} dollars per hour`;
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
    hourlyWage = 0;
    moneyPerMs = 0;
}

// Event Listeners
buttons.start.addEventListener("click", () => {
    hourlyWage = hourlyInput.value;
    if (!isNaN(hourlyWage) && hourlyWage > 0) {
        moneyPerMs = hourlyWage / MS_PER_HOUR;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, INTERVAL_DELAY_MS);
    } else {
        alert("Please enter a valid hourly wage");
    }
});

document.getElementById("home").onclick = () => location.href = "/";

buttons.lap.addEventListener("click", addLap);

buttons.pause.addEventListener("click", () => {
    clearInterval(intervalId);
    elapsedTime = Date.now() - startTime;
});

buttons.reset.addEventListener("click", () => {
    clearInterval(intervalId);
    resetVariables();
});
