const config = require('./config')
const routes = require('./routes')
const db = require('./model')
const Hapi = require('@hapi/hapi')

const server = Hapi.server({
  port: config.APP_PORT,
  host: config.APP_HOST,
  routes: {
    cors: true
  }
})

server.route(routes)

exports.init = async () => {
  await server.initialize()
  await db.connect()
  return server
}

exports.start = async () => {
  await server.start()
  await db.connect()
  console.log(`Server running at: ${server.info.uri}`)
  return server
}

process.on('unhandledRejection', (err) => {
  console.error(err)
  process.exit(1)
})
