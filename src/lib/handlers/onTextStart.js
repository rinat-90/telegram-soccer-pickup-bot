const bot = require('../../bot')
const keyboard = require('../keyboards/keyboard')
const { userService } = require('../../api')
const { getChatId } = require('../../utils/helper')


module.exports = async function (msg) {
  try {
    const text = `Hi, ${msg.from.first_name} \nChoose command to start!`
    const chatId = getChatId(msg)
    const user = await userService.findOne({ telegramId: msg.from.id })
    const startKeyboard = user ? keyboard.home : keyboard.auth

    // await bot.sendPoll(chatId, 'Choose event location', JSON.stringify(['Quad', 'Lane Tech', 'James Park']))


    await bot.sendMessage(chatId, text, {
      reply_markup: {
        keyboard: startKeyboard
      }
    })
  } catch (e) {
    throw e
  }
}
