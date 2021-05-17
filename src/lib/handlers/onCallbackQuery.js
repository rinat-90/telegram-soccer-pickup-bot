const bot = require('../../bot')
const { gameService } = require('../../api')
const { ACTIONS_TYPE } = require('../../consts')

async function toggleJoinGame(gameId, userId) {
  return await gameService.toggleJoiningGame(gameId, userId)

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
  }

}
