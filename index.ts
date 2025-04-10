import { Elysia, t } from 'elysia';
import { html } from '@elysiajs/html';
import fs from 'fs';
import Index from './pages/index';
import { cwd } from 'process';
import showdown from 'showdown';
import Edit from './pages/edit';
import { JSDOM } from 'jsdom';

const mdClient = new showdown.Converter();

let PSA = fs.readFileSync(cwd() + '/data/PSA.txt', 'utf8');

const app = new Elysia()
    .use(html())
    .get("/index.css", () => fs.readFileSync(cwd() + '/pages/index.css', 'utf8'))
    .get("/lib.js", () => fs.readFileSync(cwd() + '/pages/lib.js', 'utf8'))
    .get("/countdown.min.js", () => fs.readFileSync(cwd() + '/pages/countdown.min.js', 'utf8'))
    .get("/", () => {
        return Index(PSA);
    })
    .get("/edit", () => {
        return Edit(mdClient.makeMarkdown(PSA, new JSDOM().window.document));
    })
    .get("/PSA", () => {
        return PSA;
    })
    .post("/PSA", async ({ body: { md } }) => {
        PSA = mdClient.makeHtml(md);

        fs.writeFileSync(cwd() + '/data/PSA.txt', PSA);

        return PSA;
    }, {
        body: t.Object({
			md: t.String()
		})
    })
    .listen(4000)