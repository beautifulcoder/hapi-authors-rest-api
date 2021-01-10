const config = require('../config')
const mongoose = require('mongoose')

module.exports = {
  connect: async function() {
    await mongoose.connect(
      config.DB_HOST + '/' + config.DB_NAME,
      config.DB_OPTS)
  },
  connection: mongoose.connection,
  Author: require('./author')
}
