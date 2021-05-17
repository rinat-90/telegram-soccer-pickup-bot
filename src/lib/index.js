const onMessage = require('./handlers/onMessage')
const onCallbackQuery = require('./handlers/onCallbackQuery')
const onStart = require('./handlers/onStart')
const onGetGame = require('./handlers/onGetGame')
const onLogin = require('./handlers/onLogin')

module.exports = {
  onMessage,
  onCallbackQuery,
  onStart,
  onGetGame,
  onLogin
}
