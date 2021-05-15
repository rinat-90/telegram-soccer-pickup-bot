const Game = require('../../models/game.model')

module.exports = {
  async findGames(query){
    return await Game.find(query)
  },
  async findOneGame(id){
    return await Game.findById({ _id: id })
  },
}
