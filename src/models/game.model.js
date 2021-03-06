const { Schema, model } = require('mongoose');
const schema = new Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    location: {
      type: Schema.Types.Mixed
    },
    spots: {
      type: Number,
      required: true,
      default: 1
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    creator: {
      type: Number,
    },
    roaster: [Number]
  },
  {
    timestamps: true
  })



module.exports =  model('Game', schema)
