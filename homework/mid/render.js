export function layout(head, content) {
    return `
    <html>
    <head>
      ${head}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/pado35/ws112a/homework/mid/style.css">
    </head>
    <body>
      <section id="content">
        ${content}
      </section>
    </body>
    </html>
    `
}

export function mainUi() {
  return layout(`
  <title>Main</title>`,`
  <h1>Minesweeper</h1>
  <ol>
    <li><a href="/login">登入</a></li>
    <li><a href="/signup">註冊</a></li>
  </ol>
  `)
}

export function loginUi() {
  return layout(`
  <title>loginUi</title>`, `
  <h1>登入帳號</h1>
    <form action="/login "method="post">
      <label for="username">帳號：</label>
      <input type="text" id="username" name="username" required><br>
      <label for="password">密碼：</label>
      <input type="password" id="password" name="password" required><br>
      <button type="submit">提交</button>
    </form>
  `)
}

export function signupUi() {
  return layout(`
  <title>signupUi</title>`, `
  <h1>註冊帳號</h1>
    <form action="/signup "method="post">
      <label for="username">帳號：</label>
      <input type="text" id="username" name="username" required><br>
      <label for="password">密碼：</label>
      <input type="password" id="password" name="password" required><br>
      <button type="submit">提交</button>
    </form>
  `)
}

export function gameUi() {
  return layout(`
  <title>Main</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/pado35/ws112a/homework/mid/public/minesweeper.js"></link>`, `
  <h1>Mines: <span id="mines-count">0</span></h1>
  <div id="board"></div><br>
  <button id="flag-button">🚩</button>
  `)
}


export function fail() {
  return layout('Fail', `
  <h1>Fail!</h1>
  You may <a href="/">read all Post</a> or <a href="JavaScript:window.history.back()">go back</a> !
  `)
}