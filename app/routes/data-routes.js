const api = require('./api')

module.exports = {
  method: 'GET',
  path: '/fetch-assets-by-flood-station-id/{stationId}',
  handler: api.fetchAssetDataFilteredById,
  options: api.swaggerOptions
}
