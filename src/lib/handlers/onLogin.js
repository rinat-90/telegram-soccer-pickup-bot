const bot = require('../../bot')
const { userService } = require('../../api')
const { getChatId } = require('../../utils/helper')
const keyboard = require('../keyboards/keyboard')

module.exports = async function (msg, [source, match]) {
  const chatId = getChatId(msg)
  const telegramId = msg.from.id
  const name = `${msg.from.first_name} ${msg.from.last_name}`

  const user = await userService.findOne({ email: source})
  if (user) {
    await userService.updateOne({ _id: user._id }, { telegramId, name })
    await bot.sendMessage(chatId, 'Successfully Logged In!', {
      reply_markup: { keyboard: keyboard.home }
    })
  } else {
    await bot.sendMessage(chatId, 'No user found with given email!')
  }

}
