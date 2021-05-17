
const { Schema, model } = require('mongoose');

const schema = new Schema({
  telegramId: { type: Number, },
  name: { type: String },
  email: { type: String,  required: true },
  games: [String]
});


module.exports = model('User', schema)
