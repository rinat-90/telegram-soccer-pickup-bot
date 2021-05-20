const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  TOKEN: process.env.TOKEN,
  MONGO_URI: process.env.MONGO_URI
}
