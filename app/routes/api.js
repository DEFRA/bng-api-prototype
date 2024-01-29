// dir ./routes/api.js
// Functions to fetch asset IDs by flood station ID and radius

const Wreck = require('@hapi/wreck')
const Joi = require('joi')

const fetchFloodStationData = async (stationId) => {
  const url = `https://environment.data.gov.uk/flood-monitoring/id/stations/${stationId}`

  try {
    const { payload } = await Wreck.get(url, { json: true })
    return payload
  } catch (error) {
    console.error('Error fetching flood station data', error.message)

    const errorMessage = `Failed to fetch flood station data, the url you're trying to access is ${url}`
    throw new Error(errorMessage)
  }
}

const fetchAssetData = async (lat, lng, radius) => {
  const url = `https://environment.data.gov.uk/asset-management/maintained-asset.geojson?lat=${lat}&lng=${lng}&radius=${radius}`

  try {
    const { payload } = await Wreck.get(url, { json: true })
    return payload
  } catch (error) {
    console.error('Error fetching asset data', error.message)

    const errorMessage = `Failed to fetch asset data, the url you're trying to access is ${url}`
    throw new Error(errorMessage)
  }
}

const fetchAssetDataFilteredById = async (request, h) => {
  try {
    const { stationId } = request.params
    const radius = request.query.radius

    const { error: stationIdError } = Joi.string().max(12).validate(stationId)

    if (stationIdError) {
      const errorMessage = `Invalid stationId: ${stationIdError.message}`
      return h.response({ error: errorMessage }).code(400)
    }

    const { error } = Joi.object({
      radius: Joi.number().min(1.0).max(50.0).required()
    }).validate({ radius })

    if (error) {
      const errorMessage = `Invalid radius: ${error.message}`
      return h.response({ error: errorMessage }).code(400)
    }

    const stationData = await fetchFloodStationData(stationId)
    const { lat, long } = stationData.items

    const assetIds = await fetchAssetData(lat, long, radius)

    const filteredAssetIds = assetIds.features.map((asset) => asset.id)

    return h.response(filteredAssetIds).code(200)
  } catch (error) {
    console.error(error)
    return h.response({ error: error.message }).code(500)
  }
}

const swaggerTags = {
  description: 'Asset IDs by station ID and radius',
  tags: ['api'],
  validate: {
    params: Joi.object({
      stationId: Joi.string()
        .required()
        .max(12)
        .description(
          'The station ID of the flood station of interest')
    }),
    query: Joi.object({
      radius: Joi.number()
        .required()
        .description(
          'The radius around the flood station to display asset IDs'
        )
    })
  }
}

module.exports = {
  fetchAssetDataFilteredById,
  swaggerTags
}
