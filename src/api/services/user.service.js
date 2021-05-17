const User = require('../../models/user.model')

module.exports = {
  async findOne(options){
    return User.findOne(options)
  },
  async createOne(user){
    return new User(user).save()
  },
  async updateOne(options, data) {
    const user = await User.findOneAndUpdate(options, { $set: { ...data } }, { new: true })
    return user;
  },

}
