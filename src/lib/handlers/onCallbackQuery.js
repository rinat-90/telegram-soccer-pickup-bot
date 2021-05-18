const bot = require('../../bot')
const keyboard = require('../keyboards/keyboard')
const { gameService } = require('../../api')
const { ACTIONS_TYPE } = require('../../consts')

async function toggleJoinGame(gameId, userId) {
  return await gameService.toggleJoiningGame(gameId, userId)
}

async function sendRoaster(chatId, gameId ) {
  const users = await gameService.getGameRoaster(gameId)
  if (!users.length) {
    await bot.sendMessage(chatId, 'Roaster is empty.')
  } else {
    const html  = users.map((u, i) => (`<b>${i +1}</b>. ${u.name} - /u${u.telegramId}`)).join('\n')
    await sendHtml(chatId, html, 'home')
  }

}

// TODO repeated function
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

module.exports = async function (query) {
  const userId = query.from.id
  const chatId = query.message.chat.id
  let data

  try {
    data = JSON.parse(query.data)
  } catch (e){
    throw new Error('Data is not an object')
  }

  if (data.type === ACTIONS_TYPE.SEND_GAME_LOCATION) {
    const { lat, lon } = data.loc
    await bot.sendLocation(chatId, lat, lon, )
  } else if (data.type === ACTIONS_TYPE.TOGGLE_JOIN_GAME) {
    await toggleJoinGame(data.gameId, userId)
    await bot.answerCallbackQuery({
      callback_query_id: query.id,
      text: 'All done!'
    })
  } else if (data.type === ACTIONS_TYPE.GAME_ROASTER) {
   await sendRoaster(chatId, data.gameId)
  }

}
