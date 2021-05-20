const bot = require('./bot')
const connectDB = require('./utils/db')
const {
  onStart,
  onMessage,
  onGetGame,
  onCallbackQuery
} = require('./lib')

connectDB()

bot.on('message', onMessage)
bot.on('callback_query', onCallbackQuery)
bot.onText(/\/start/, onStart)
bot.onText(/\/g(.+)/, onGetGame)
