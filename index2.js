let startTime;
let running = false;
let elapsedTime = 0;
let interval;

function startStopwatch() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        interval = setInterval(updateDisplay, 10);
        running = true;
        document.querySelector('.start').textContent = 'Stop';
    } else {
        clearInterval(interval);
        running = false;
        document.querySelector('.start').textContent = 'Start';
    }
}

function pauseStopwatch() {
    clearInterval(interval);
    running = false;
    document.querySelector('.start').textContent = 'Start';
}

function resetStopwatch() {
    clearInterval(interval);
    running = false;
    elapsedTime = 0;
    updateDisplay();
    document.querySelector('.start').textContent = 'Start';
    document.querySelector('.laps').innerHTML = '';
}

function recordLap() {
    if (running) {
        const lapTime = Date.now() - startTime;
        const formattedLapTime = formatTime(lapTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = formattedLapTime;
        document.querySelector('.laps').appendChild(lapItem);
    }
}

function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.querySelector('.display').textContent = formattedTime;
}

function formatTime(time) {
    const hours = Math.floor(time / (60 * 60 * 1000));
    const minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    const milliseconds = time % 1000;
    return (
        pad(hours, 2) +
        ':' +
        pad(minutes, 2) +
        ':' +
        pad(seconds, 2) +
        '.' +
        pad(milliseconds, 3)
    );
}

function pad(number, length) {
    let str = String(number);
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

