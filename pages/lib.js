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


async function renderCountdown(html) {
    var timerInstance = new easytimer.Timer();
}