const mongoose =  require('mongoose')
const { MONGO_URI } = require('../config')
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })

    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (e) {
    console.error(`Error: ${e.message}`)
    process.exit(1)
  }
}

module.exports = connectDB
