const TelegramBot = require('node-telegram-bot-api');
const _ = require('lodash')
const dotenv = require('dotenv')
const connectDB = require('./utils/db')
const { getChatId, getItemByUuid, debug } = require('./utils/helper')
const kb = require('./keyboard-buttons')
const keyboard = require('./keyboard')

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

bot.on('message', msg => {
  const chatId = getChatId(msg)

  switch (msg.text) {
    case kb.home.games:
      bot.sendMessage(chatId, 'yo')
      break
    case kb.home.myGames:

      break
    case kb.games.mon:

      break
    case kb.games.wen:

      break
    case kb.games.fri:
      break
    case kb.back:
      bot.sendMessage(chatId, 'Browse games', {
        reply_markup: { keyboard: keyboard.home }
      })
      break
  }
})
bot.onText(/\/start/, msg => {
  const text = `Hi, ${msg.from.first_name} \nChoose command to start!`
  const chatId = getChatId(msg)

  bot.sendMessage(chatId, text, {
    reply_markup: {
      keyboard: keyboard.home
    }
  })

})
