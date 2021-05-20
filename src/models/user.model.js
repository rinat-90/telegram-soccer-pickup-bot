
const { Schema, model } = require('mongoose');

const schema = new Schema({
  telegramId: { type: Number, required: true  },
  approved: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  name: { type: String },
});


module.exports = model('User', schema)
