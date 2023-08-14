const { Telegraf } = require("telegraf");
const TOKEN = "6672244580:AAG8rwjNJkhEWmf1C6rqmUvhB0CrMZkn4g8";
const bot = new Telegraf(TOKEN);

const web_link = "https://charming-biscochitos-054f13.netlify.app/";

bot.start((ctx) =>
  ctx.reply("Welcome vender :)))))", {
    reply_markup: {
      keyboard: [[{ text: "multi", web_app: { url: web_link } }]],
    },
  })
);

bot.launch();