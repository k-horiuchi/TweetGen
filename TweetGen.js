// TODO:冪等性のある実装

// ツイッターのIDとパスワードいれてね
const TwitterID = '';
const TwitterPassword = '';

// お　ま　じ　な　い
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
        args: ['--lang=ja,en-US,en']
  })

  // Twitterを開く
  const page = await browser.newPage();
  await page.goto('https://twitter.com/login', {waitUntil: "domcontentloaded"});
  await page.waitFor(20000);

  // Twitterログイン TODO:よくわからんけど、この辺でよく落ちる
  // await page.screenshot({path: 'example.png'});
  await page.type('div.css-1dbjc4n:nth-child(6) > label:nth-child(1) > div:nth-child(2) > div:nth-child(1) > input', TwitterID);
  await page.type('div.css-1dbjc4n:nth-child(7) > label:nth-child(1) > div:nth-child(2) > div:nth-child(1) > input', TwitterPassword);
  await page.click('.r-jwli3a');    

  await page.waitFor(20000);

  // ついじぇねに移動
  await page.goto('https://aitter-twigene.me/', {waitUntil: "domcontentloaded"});

  // ついじぇねログイン
  await page.click('div.login__auth:nth-child(4) > button:nth-child(1)');
  await page.waitFor(20000);

  // ついじぇねでツイート生成
  await page.click('button.amber');
  await page.waitFor(20000);

  // 生成されたテキストを取得
  const Text = await page.evaluate(() => document.querySelector('div.v-card__text:nth-child(2)').innerText);

  // 先程のテキストを入力してつぶやく TODO:なんかハッシュタグの形式ミスってね？
  await page.goto(`https://twitter.com/intent/tweet?text=${Text}%0A%0A&hashtags=ついじぇね,自分bot&url=https%3A%2F%2Faitter-twigene.me%2F`, {waitUntil: "domcontentloaded"});
  await page.waitFor(10000);
  await page.click('.button');

  await browser.close();
})();
