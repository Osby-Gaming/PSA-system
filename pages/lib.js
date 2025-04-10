async function getPSA() {
    return fetch("/PSA")
        .then((response) => response.text());
}

async function pushPSA(md) {
    return fetch("/PSA", {
        method: "POST",
        body: JSON.stringify({ md }),
        headers: {
            "Content-Type": "application/json"
        }
    });
}

async function countdownTimeToStartValues(unix_time_ms) {
    let remaining_ms = unix_time_ms - Date.now();

    const days = Math.floor(remaining_ms / (1000 * 60 * 60 * 24));
    remaining_ms -= days * (1000 * 60 * 60 * 24)

    const hours = Math.floor(remaining_ms / (1000 * 60 * 60));
    remaining_ms -= hours * (1000 * 60 * 60)

    const minutes = Math.floor(remaining_ms / (1000 * 60));
    remaining_ms -= minutes * (1000 * 60)

    const seconds = remaining_ms / 1000;

    return { days, hours, minutes, seconds };
}

const timers = [];

async function renderCountdown(html) {
    for (const timer of timers) {
        timer.removeAllEventListeners();
    }

    const matches = html.match(/^{\d{10,15}}$/gm);
    for (const match of matches) {
        const unix_time_ms = parseInt(match.replace("{", "").replace("}", ""));
        const startValues = await countdownTimeToStartValues(unix_time_ms);
        let timerInstance = new easytimer.Timer();

        timerInstance.start({countdown: true, precision: 'seconds', startValues});

        html = html.replace(match, `<p id="timer_${unix_time_ms}">${timerInstance.getTimeValues().toString()}</p>`);

        timerInstance.addEventListener('secondsUpdated', function (e) {
            document.getElementById(`timer_${unix_time_ms}`).innerHTML = timerInstance.getTimeValues().toString();
        });
        
        timerInstance.addEventListener('targetAchieved', function (e) {
            document.getElementById(`timer_${unix_time_ms}`).innerHTML = timerInstance.getTimeValues().toString();
        });

        timers.push(timerInstance);
    }
}