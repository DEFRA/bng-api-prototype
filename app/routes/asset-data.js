const Wreck = require('@hapi/wreck')
// url request example
// http://localhost:3000/asset-data?lat=50.828848&lng=-0.24883&radius=5

const fetchAssetData = async (lat, lng, radius) => {
  // https://environment.data.gov.uk/asset-management/maintained-asset.geojson?lat=50.828848&lng=-0.24883&radius=5
  const url = `https://environment.data.gov.uk/asset-management/maintained-asset.geojson?lat=${lat}&lng=${lng}&radius=${radius}`
  console.log(url)

  try {
    const { payload } = await Wreck.get(url, { json: true })
    return payload
  } catch (error) {
    console.error('Error fetching asset data', error.message)
    throw new Error(`Failed to fetch asset data, the url you're trying to access is ${url}`)
  }
}

module.exports = {
  method: 'GET',
  path: '/asset-data',
  handler: async (request, h) => {
    try {
      const { lat, lng, radius } = request.query

      if (!lat || !lng || !radius) {
        return h.response('Missing required parameters: lat, lng, and radius are required').code(400)
      }

      const data = await fetchAssetData(lat, lng, radius)
      return h.response(data).code(200)
    } catch (error) {
      console.error(error)
      return h.response(error.message).code(500)
    }
  }
}
