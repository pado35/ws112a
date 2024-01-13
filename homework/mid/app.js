import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import * as render from './render.js'
import { DB } from "https://deno.land/x/sqlite/mod.ts";
import { Session } from "https://deno.land/x/oak_sessions/mod.ts";

const db = new DB("blog.db");
db.query("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");

const router = new Router();
router
  .get("/", mainUi)
  .get("/login", loginUi)
  .post("/login", login)
  .get("/signup", signupUi)
  .post("/signup", signup)
  // .get("/game", gameUi)


const app = new Application();
app.use(Session.initMiddleware())
app.use(router.routes());
app.use(router.allowedMethods());

function userQuery(sql) {
  let list = []
  var results = db.query(sql)
  for (const [id, username, password, email] of results) {
    list.push({id, username, password, email})
  }
  return list
}

async function parseFormBody(body) {
  const pairs = await body.value
  const obj = {}
  for (const [key, value] of pairs) {
    obj[key] = value
  }
  return obj
}

async function mainUi(ctx) {
  ctx.response.body = await render.mainUi()
}

async function loginUi(ctx) {
  ctx.response.body = await render.loginUi()
}

async function login(ctx) {
  const body = ctx.request.body()
  if (body.type === "form") {
    var user = await parseFormBody(body)
    var dbUsers = userQuery(`SELECT id, username, password FROM users WHERE username='${user.username}'`)
    var dbUser = dbUsers[0]
    if (dbUser.password === user.password) {
      ctx.state.session.set('user', user)
      console.log('session.user=', await ctx.state.session.get('user'))
      ctx.response.redirect('/game');
    } else {
      ctx.response.body = render.fail()
    }
  }
}

async function signupUi(ctx) {
  ctx.response.body = await render.signupUi()
}

async function signup(ctx) {
  
}

async function gameUi(ctx) {
  
}


console.log('start at : http://127.0.0.1:8000')

await app.listen({ port: 8000 });




// var user = await ctx.state.Session.get('user')
// if (user !=null) {
//   ctx.state.Session.set('user', null)
// }