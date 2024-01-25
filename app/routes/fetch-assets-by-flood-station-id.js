const Wreck = require('@hapi/wreck')
const Joi = require('joi')

const fetchFloodStationData = async (stationId) => {
  const url = `https://environment.data.gov.uk/flood-monitoring/id/stations/${stationId}`

  try {
    const { payload } = await Wreck.get(url, { json: true })
    return payload
  } catch (error) {
    console.error('Error fetching flood station data', error.message)
    throw error
  }
}

const fetchAssetData = async (lat, lng, radius) => {
  const url = `https://environment.data.gov.uk/asset-management/maintained-asset.geojson?lat=${lat}&lng=${lng}&radius=${radius}`
  console.log(url)

  try {
    const { payload } = await Wreck.get(url, { json: true })
    return payload
  } catch (error) {
    console.error('Error fetching asset data', error.message)
    throw new Error(
      `Failed to fetch asset data, the url you're trying to access is ${url}`
    )
  }
}

module.exports = {
  method: 'GET',
  path: '/fetch-assets-by-flood-station-id/{stationId}',
  options: {

    handler: async (request, h) => {
      try {
        const { stationId } = request.params
        const radius = request.query.radius

        const stationData = await fetchFloodStationData(stationId)
        const { lat, long } = stationData.items

        const assetIds = await fetchAssetData(lat, long, radius)

        const filteredAssetIds = assetIds.features.map((asset) => asset.id)

        return h.response(filteredAssetIds).code(200)
      } catch (error) {
        console.error(error)
        return h.response(error.message).code(500)
      }
    },
    description: 'Asset IDs by station ID and radius',
    tags: ['api'],
    validate: {
      params: Joi.object({
        stationId: Joi.string()
          .required()
          .description('The station ID of the flood station of interest')
      }),
      query: Joi.object({
        radius: Joi.number()
          .required()
          .description('The radius around the flood station to display asset IDs')
      })
    }
  }
}
