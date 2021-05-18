const bot = require('../../bot')
const kb = require('../keyboards/keyboard-buttons')
const keyboard = require('../keyboards/keyboard')
const { gameService, userService } = require('../../api')
const { getChatId } = require('../../utils/helper')

async function sendGames(userId, query) {
  try {
    const games = await gameService.findGames(query)
    if (!games.length) {
      await bot.sendMessage(userId, 'You have no games')
    } else {
      const html  = games.map((g, i) => (`<b>${i +1}</b> - ${g.title} - /g${g._id}`)).join('\n')
      await sendHtml(userId,  html, 'home')
    }

  } catch (e) {
    throw e
  }
}
async function sendHtml(chatId, html, kbName = null) {
  const options = {
    parse_mode: 'HTML'
  }
  if (kbName) {
    options['reply_markup'] = {
      keyboard: keyboard[kbName]
    }
  }
  await bot.sendMessage(chatId, html, options)
}

module.exports = async function (msg) {
  const chatId = getChatId(msg)
  const userId = msg.from.id

  switch (msg.text) {
    case kb.home.games:
      await sendGames(chatId, {})
      break
    case kb.auth.requestAccess:
      const user = await userService.createOne({
        telegramId: userId,
        isAdmin: false,
        approved: true
      })
      const requestKeyboard = user.approved ? keyboard.home : keyboard.auth
      await bot.sendMessage(chatId, 'Request sent', {
        reply_markup: { keyboard: requestKeyboard }
      })
      break
    case kb.home.myGames:
      await sendGames(chatId, { roaster: userId } )
      break
    case kb.back:
      await bot.sendMessage(chatId, 'Browse games', {
        reply_markup: { keyboard: keyboard.home }
      })
      break
  }
}
