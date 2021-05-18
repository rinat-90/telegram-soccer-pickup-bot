const Game = require('../../models/game.model')
const userService = require('./user.service')

module.exports = {
  async createOne(game){
    return new Game(game).save();
  },
  async findGames(query = {}){
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

    return Game.findOneAndUpdate({ _id: gameId }, updateOptions, { new: true })
  },
  async getGameRoaster(gameId) {
    const game = await this.findOneGame(gameId)
    if (!game.roaster.length) {
      return []
    } else {
      const roaster = game.roaster.length ? game.roaster.map(x => Number(x)) : []
      return  await userService.find({ telegramId: { '$in': roaster } })
    }

  }
}
