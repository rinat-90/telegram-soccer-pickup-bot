const TelegramBot = require('node-telegram-bot-api');
const _ = require('lodash')
const dotenv = require('dotenv')
const connectDB = require('./utils/db')
const { getChatId, getItemByUuid, debug } = require('./utils/helper')

dotenv.config()
connectDB()

const bot = new TelegramBot(process.env.TOKEN, {
  polling: {
    interval: 300,
    autoStart: true,
    params: {
      timeout: 10
    }
  }
});

bot.onText(/\/start/, msg => {
  const text = `Hi, ${msg.from.first_name} \nChoose command to start!`
  const chatId = getChatId(msg)

  bot.sendMessage(chatId, text, {
    reply_markup: {
      keyboard: []
    }
  })

})
