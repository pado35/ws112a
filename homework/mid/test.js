import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import * as render from './render.js'
import { DB } from "https://deno.land/x/sqlite/mod.ts";
import { Session } from "https://deno.land/x/oak_sessions/mod.ts";

const db = new DB("blog.db");
db.query("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");

const router = new Router();
router
  .get("/", game);


const app = new Application();
app.use(Session.initMiddleware())
app.use(router.routes());
app.use(router.allowedMethods());

async function game(ctx) {
    ctx.response.body = await render.gameUi()
}


console.log('start at : http://127.0.0.1:8000')

await app.listen({ port: 8000 });