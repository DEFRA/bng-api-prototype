const Wreck = require('@hapi/wreck')

const fetchAssetData = async () => {
  const url =
    'https://environment.data.gov.uk/asset-management/maintained-asset.geojson?lat=50.828848&lng=-0.24883&radius=5'

  try {
    const { payload } = await Wreck.get(url, { json: true })
    return payload
  } catch (error) {
    console.error('Error fetching asset data', error.message)
    throw error
  }
}

module.exports = {
  method: 'GET',
  path: '/asset-data',
  handler: async (request, h) => {
    try {
      const data = await fetchAssetData()
      return h.response(data).code(200)
    } catch (error) {
      return h.response(error.message).code(500)
    }
  }
}
