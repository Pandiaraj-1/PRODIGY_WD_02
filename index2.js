let timer;
let isRunning = false;
let startTime;
let lapCount = 1;

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        document.getElementById('startStop').innerText = 'Start';
        isRunning = false;
    } else {
        startTime = Date.now() - (lapCount > 1 ? parseInt(document.getElementById('display').innerText.replace(/:/g, '')) * 10 : 0);
        timer = setInterval(updateDisplay, 10);
        document.getElementById('startStop').innerText = 'Stop';
        isRunning = true;
    }
}

function updateDisplay() {
    const elapsedTime = Date.now() - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById('display').innerText = formattedTime;
}

function formatTime(time) {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
}

function pad(num) {
    return num.toString().padStart(2, '0');
}

function reset() {
    clearInterval(timer);
    document.getElementById('display').innerText = '00:00:00';
    document.getElementById('startStop').innerText = 'Start';
    isRunning = false;
    lapCount = 1;
    document.getElementById('laps').innerHTML = '';
}

function lap() {
    const lapTime = document.getElementById('display').innerText;
    const lapItem = document.createElement('li');
    lapItem.innerText = `Lap ${lapCount}: ${lapTime}`;
    document.getElementById('laps').prepend(lapItem);
    lapCount++;
}
