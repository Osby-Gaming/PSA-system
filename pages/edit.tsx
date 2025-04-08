import { Html } from '@elysiajs/html'

export default function Edit(PSA: string) {
    return (
        <html>
            <head>
                <title>PSA edit</title>
                <link rel="stylesheet" href="index.css" />
            </head>
            <body>
                <div style={"display: flex;"}>
                    <textarea name="psa" id="psa" cols="60" rows="10">
                        {PSA}
                    </textarea>
                    <button onclick="pushPSA(document.getElementById('psa').value)">Submit</button>
                </div>
                <script src="/lib.js" />
                <script>
                </script>
            </body>
        </html>
    )
}