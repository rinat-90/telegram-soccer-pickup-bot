

module.exports = {
  debug(obj= {}) {
    return JSON.stringify(obj, null, 4)
  },
  getChatId(msg) {
    return msg.chat.id
  },
  serializedId(source){
    return source.substr(2, source.length)
  },
  emailRegex () {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  }
}
