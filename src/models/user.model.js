
const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  telegramId: { type: Number, required: true },
  games: [{
    type: Types.ObjectId,
    required: true,
    ref: 'Game'
  }]
});


module.exports = model('Bookmark', schema)
