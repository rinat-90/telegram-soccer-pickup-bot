const onMessage = require('./handlers/onMessage')
const onCallbackQuery = require('./handlers/onCallbackQuery')
const onStart = require('./handlers/onTextStart')
const onGetGame = require('./handlers/onGetGame')

module.exports = {
  onMessage,
  onCallbackQuery,
  onStart,
  onGetGame
}
