// dir ./routes/data-routes.js
const fetchAssetDataFilteredById = require('./api').fetchAssetDataFilteredById
const swaggerTags = require('./api').swaggerTags

console.log('fetchAssetDataFilteredById:', fetchAssetDataFilteredById)

module.exports = {
  method: 'GET',
  path: '/fetch-assets-by-flood-station-id/{stationId}',
  handler: fetchAssetDataFilteredById,
  options: swaggerTags
}
