const { Telegraf } = require("telegraf");
const TOKEN = "6672244580:AAG8rwjNJkhEWmf1C6rqmUvhB0CrMZkn4g8";
const bot = new Telegraf(TOKEN);

const web_link = "https://charming-biscochitos-054f13.netlify.app/";

bot.start((ctx) =>
  ctx.reply("Let's get started 🍟\n\n Please tap the button below to order your food", {
    reply_markup: {
      inline_keyboard: [[{ text: "Order Food", web_app: { url: web_link } }]],
      
      keyboard_button: [[{ text: "Durger", web_app: { url: web_link } }]],

    },
  })
);

bot.launch();