const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual bot token obtained from the BotFather
const bot = new TelegramBot('6672244580:AAG8rwjNJkhEWmf1C6rqmUvhB0CrMZkn4g8', { polling: false });

// Listen for any incoming messages
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  console.log(`User ID: ${chatId}`);
});

// Start the bot
bot.startPolling();
