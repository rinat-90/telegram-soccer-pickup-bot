
const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  telegramId: { type: Number, },
  name: { type: String },
  email: { type: String,  required: true },
  games: [{
    type: Types.ObjectId,
    required: true,
    ref: 'Game'
  }]
});


module.exports = model('User', schema)
