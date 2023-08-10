const { Telegraf } = require("telegraf");
const TOKEN = "6672244580:AAG8rwjNJkhEWmf1C6rqmUvhB0CrMZkn4g8";
const bot = new Telegraf(TOKEN);

const web_link = "https://64d2ceee765d6c009077a4d6--lustrous-arithmetic-04545c.netlify.app/";

bot.start((ctx) =>
  ctx.reply("Welcome :)))))", {
    reply_markup: {
      keyboard: [[{ text: "yene cafe", web_app: { url: web_link } }]],
    },
  })
);

bot.launch();