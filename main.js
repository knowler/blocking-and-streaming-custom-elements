import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { logger } from "hono/logger";
import { cache } from "hono/cache";
import { stream } from "hono/streaming";

const app = new Hono();

app.use(logger());
app.use("/", async c => {
  return stream(c, async (stream) => {
    c.res.headers.set("content-type", "text/html");
    const shell = await Deno.open("./public/index.html", { read: true });
    const article = await Deno.open("./content/article.html", { read: true });

    await stream.pipe(shell.readable);

    await sleep(4);

    await stream.pipe(article.readable);
  });
});

app.use("*", serveStatic({ root: "./public" }));
/*
app.use("*", cache({
  cacheName: "app",
  cacheControl: "max-age=60",
  wait: true,
}));
*/

async function sleep(seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, 1_000 * seconds);
  });
}

Deno.serve({
  port: 8010,
  cert: await Deno.readTextFile("./localhost.pem"),
  key: await Deno.readTextFile("./localhost-key.pem"),
}, app.fetch);
