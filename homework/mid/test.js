import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import * as render from './render.js'

const router = new Router();
router
  .get("/", game);


const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

async function game(ctx) {
    ctx.response.body = await render.gameUi()
}


console.log('start at : http://127.0.0.1:8000')

await app.listen({ port: 8000 });