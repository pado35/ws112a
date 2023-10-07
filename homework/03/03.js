import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as render from './render.js'

const posts = [
  {id:0, title:'小明', body:'0912-345-678'},
  {id:1, title:'小王', body:'0987-654-321'}
];

const router = new Router();

router.get('/', list)
  .get('/post/search', search)
  .get('/post/new', add)
  .get('/post/:id', show)
  .post('/post', create)
  .post('/search', whois);

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

async function list(ctx) {
  ctx.response.body = await render.list(posts);
}

async function search(ctx) {
    ctx.response.body = await render.search();
}

async function add(ctx) {
  ctx.response.body = await render.newPost();
}

async function show(ctx) {
  const id = ctx.params.id;
  const post = posts[id];
  if (!post) ctx.throw(404, 'invalid id');
  ctx.response.body = await render.show(post);
}

async function create(ctx) {
  const body = ctx.request.body()
  if (body.type === "form") {
    const pairs = await body.value
    const post = {}
    for (const [key, value] of pairs) {
      post[key] = value
    }
    console.log('post=', post)
    const id = posts.push(post) - 1;
    post.id = id;
    ctx.response.redirect('/');
  }
}

async function whois(ctx) {
    const body = ctx.request.body()
    if (body.type === "form") {
        const pairs = await body.value
        let name,f=0
        for (const value of pairs) {
            name = value
        }
        //console.log(name[1])
        for(let n of posts){
            if(name[1]==n.title){
                ctx.response.redirect('/post/'+n.id)
                f=1
                break
            }
        }
        if(!f) ctx.response.body=render.notfound
    }
  }

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 });
