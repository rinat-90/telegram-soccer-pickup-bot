const Game = require('../../models/game.model')

module.exports = {
  async findGames(query){
    return Game.find(query);
  },
  async findOneGame(id){
    return Game.findById({_id: id});
  },
}
