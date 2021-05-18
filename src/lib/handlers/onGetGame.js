const bot = require('../../bot')
const { gameService } = require('../../api')
const { getChatId, serializedId } = require('../../utils/helper')
const { ACTIONS_TYPE } = require('../../consts')

function getAvailableSpots(limit, roaster){
  return !roaster.length
    ? `${limit} spots left`
    : limit - roaster.length === 0
      ? 'All spots filled'
      : `${roaster.length} going,  ${(limit - roaster.length)} spots left`
}

module.exports = async function (msg, [source, match]) {
  try {
    const chatId = getChatId(msg)
    const gameId = serializedId(source)
    let isGoing = false

    const [game] = await Promise.all([gameService.findOneGame(gameId),])
    const date = new Date(game.date).toLocaleDateString()
    const spots = getAvailableSpots(game.spots, game.roaster)
    const caption = `Title: ${game.title} \nDate: ${date}\nStart time: ${game.startTime} - Emd Time: ${game.endTime} \n${spots}`
    const btnText = game.roaster.includes(msg.from.id) ? 'Cancel' : 'Join'

    await bot.sendPhoto(chatId, game.imgUrl, {
      caption,
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Roaster', callback_data: JSON.stringify({ type: ACTIONS_TYPE.GAME_ROASTER, gameId: game._id }) },
            { text: 'Location', callback_data: JSON.stringify({ type: ACTIONS_TYPE.SEND_GAME_LOCATION, loc: game.location }) },
          ],
          [
            { text: btnText, callback_data: JSON.stringify({ type: ACTIONS_TYPE.TOGGLE_JOIN_GAME, gameId: game._id }) },
          ]
        ]
      }
    })

  } catch (e) {
    throw e
  }
}
