const Game = require('../../models/game.model')

module.exports = {
  async findGames(query){
    return Game.find(query);
  },
  async findOneGame(id){
    return Game.findById({_id: id});
  },
  async toggleJoiningGame (gameId, userId) {
    const game = await this.findOneGame(gameId)
    const isJoined = game.roaster.includes(userId)
    const updateOptions = isJoined
      ? { $pull: { roaster: userId } }
      : { $addToSet: { roaster: userId } }

    return await Game.findOneAndUpdate({ _id: gameId }, updateOptions, { new: true })
  }
}
