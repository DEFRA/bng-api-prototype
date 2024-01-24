require('./insights').setup()
const Hapi = require('@hapi/hapi')

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

server.route(routes)

module.exports = server
