// dir ./routes/server.js

require('./insights').setup()
const Hapi = require('@hapi/hapi')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const HapiSwagger = require('hapi-swagger')
const swaggerOptions = require('./swagger')

async function createServer () {
  const server = Hapi.server({
    port: process.env.PORT,
    routes:{
      cors: {
        origin: ['http://localhost:3001'] // frontend address
      }
    }
  })

  const routes = [].concat(
    require('./routes/healthy'),
    require('./routes/healthz'),
    require('./routes/api')
  )

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ])

  server.route(routes)

  return server
}

module.exports = createServer
