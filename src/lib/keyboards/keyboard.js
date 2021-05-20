const kb = require('./keyboard-buttons')
module.exports = {
  home: [
    [kb.home.games, kb.home.myGames],
  ],
  games: [
    [kb.games.mon, kb.games.wen, kb.games.fri],
    [kb.back]
  ],
  auth: [
    [kb.auth.login, kb.auth.requestAccess]
  ]
}
