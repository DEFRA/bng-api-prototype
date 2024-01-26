// dir ./routes/data-routes.js
const fetchAssetDataFilteredById = require('./api').fetchAssetDataFilteredById
const swaggerOptions = require('./api').swaggerOptions

console.log('fetchAssetDataFilteredById:', fetchAssetDataFilteredById)

module.exports = {
  method: 'GET',
  path: '/fetch-assets-by-flood-station-id/{stationId}',
  handler: fetchAssetDataFilteredById,
  options: swaggerOptions
}
