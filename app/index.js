// index.js

const server = require('./server')

const init = async () => {
  await server.registerPlugins() // Register plugins (including Swagger)
  await server.startServer() // Start the server
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
