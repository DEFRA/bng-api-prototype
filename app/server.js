require('./insights').setup()
const Hapi = require('@hapi/hapi')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const HapiSwagger = require('hapi-swagger')
const swaggerOptions = require('./swagger')

const server = Hapi.server({
  port: process.env.PORT
})

const routes = [].concat(
  require('./routes/healthy'),
  require('./routes/healthz'),
  require('./routes/flood-station-data'),
  require('./routes/asset-data'),
  require('./routes/flood-station-by-id-radius')
)

const registerPlugins = async () => {
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ])
}

const startServer = async () => {
  server.route(routes)
  await server.start()
  console.log('Server running on %s', server.info.uri)
}

module.exports = {
  registerPlugins,
  startServer
}
