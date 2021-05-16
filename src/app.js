const TelegramBot = require('node-telegram-bot-api');
const _ = require('lodash')
const dotenv = require('dotenv')
const connectDB = require('./utils/db')
const { getChatId, getItemByUuid, debug } = require('./utils/helper')
const { gameService } = require('./api')
const kb = require('./keyboards/keyboard-buttons')
const keyboard = require('./keyboards/keyboard')



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

bot.on('message', async msg => {
  const chatId = getChatId(msg)

  switch (msg.text) {
    case kb.home.games:
      await sendGames(chatId, {})
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
      await bot.sendMessage(chatId, 'Browse games', {
        reply_markup: { keyboard: keyboard.home }
      })
      break
  }
})
bot.onText(/\/start/, async msg => {
  const text = `Hi, ${msg.from.first_name} \nChoose command to start!`
  const chatId = getChatId(msg)

  await bot.sendMessage(chatId, text, {
    reply_markup: {
      keyboard: keyboard.home
    }
  })

})
bot.onText(/\/g(.+)/, (msg, [source, match]) => {
  const chatId = getChatId(msg)
  const gameId = getItemByUuid(source)

  Promise.all([
    gameService.findOneGame(gameId),
  ]).then(([game]) => {
    const date = new Date(game.date).toLocaleDateString()
    const spots = getAvailableSpots(game.spots, game.roaster)
    const caption = `Title: ${game.title} \nDate: ${date}\nStart time: ${game.startTime} - Emd Time: ${game.endTime} \n${spots}`
    bot.sendPhoto(chatId, game.imgUrl, {
      caption,
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Join', callback_data: 'join'},
            { text: 'Location', callback_data: 'location' },
          ],
        ]
      }
    })
  })

})

async function sendGames(userId, query) {
  try {
    const games = await gameService.findGames(query)
    const html  = games.map((g, i) => `<b>${i +1}</b> - ${g.title} - /g${g._id}`).join('\n')
    sendHtml(userId, html, 'home')
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
function getAvailableSpots(limit, roaster){
  return !roaster.length
    ? `${limit} spots left`
    : limit - roaster.length === 0
      ? 'All spots filled'
      : `${roaster.length} going,  ${(limit - roaster.length)} spots left`
}
