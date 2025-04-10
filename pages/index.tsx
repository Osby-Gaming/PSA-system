import { Html } from '@elysiajs/html'

export default function Index(PSA: string) {
    return (
        <html>
            <head>
                <title>PSA display </title>
                <link rel="stylesheet" href="index.css"></link>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Goldman:wght@400;700&family=League+Spartan:wght@100..900&display=swap" rel="stylesheet"></link>
                <style>
                    {`div {
                        font: 1.8rem 'League Spartan';
                    }
                    .goldman {
                        font: 1.8rem 'Goldman';
                    }
                    #kioskText {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        font: 1.2rem 'League Spartan';
                    }`}
                </style>
            </head>
            <body style={"margin: 0;"}>
                <main style={"width:100vw;height:100vh;display:flex;justify-content:center;align-items:center;text-align:center;"}>
                    <div id="main">
                        {PSA}
                    </div>
                    <p id="kioskText">Albin Hedwall - @wavpro</p>
                </main>
                <script src="/countdown.min.js" />
                <script src="/lib.js" />
                <script>
                    {`let lastPSA = document.getElementById('main').innerHTML;
                        const main = document.getElementById('main');
                        if (main) {
                            lastPSA = main.innerHTML;
                            main.innerHTML = renderCountdown(main.innerHTML);
                        }
                    setInterval(() => {
                        getPSA().then((html) => {
                            if (html.replaceAll("\\r\\n", "\\n") === lastPSA.replaceAll("\\r\\n", "\\n")) {
                                return;
                            }
                            console.log(lastPSA, html)
                            lastPSA = html;
                            const main = document.getElementById('main');
                            if (main) {
                                const render = renderCountdown(html);
                                main.innerHTML = render;
                            }
                        })
                    }, 5000)`}
                </script>
            </body>
        </html>
    )
}