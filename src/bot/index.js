const TelegramBot = require('node-telegram-bot-api');
const { TOKEN } = require('../config')

const index = new TelegramBot(TOKEN, {
  polling: {
    interval: 300,
    autoStart: true,
    params: {
      timeout: 10
    }
  }
});
module.exports = index
