const bot = require('./bot')
const connectDB = require('./utils/db')
const { emailRegex } = require('./utils/helper')
const {
  onStart,
  onLogin,
  onMessage,
  onGetGame,
  onCallbackQuery
} = require('./lib')

connectDB()

bot.on('message', onMessage)
bot.on('callback_query', onCallbackQuery)
bot.onText(/\/start/, onStart)
bot.onText(/\/g(.+)/, onGetGame)
bot.onText(emailRegex(), onLogin)
