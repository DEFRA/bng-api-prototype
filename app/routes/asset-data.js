const Wreck = require('@hapi/wreck')

const fetchAssetData = async (assetLatitude, assetLongitude, assetRadius) => {
  // https://environment.data.gov.uk/asset-management/maintained-asset.geojson?lat=50.828848&lng=-0.24883&radius=5
  const url = `https://environment.data.gov.uk/asset-management/maintained-asset.geojson?lat=${assetLatitude}&lng=${assetLongitude}&radius=${assetRadius}`
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
  path: '/asset-data/{latitude}/{longitude}/{radius}',
  handler: async (request, h) => {
    try {
      const { latitude: assetLatitude, longitude: assetLongitude, radius: assetRadius } = request.params

      if (!assetLatitude || !assetLongitude || !assetRadius) {
        return h.response('Missing required parameters: latitude, longitude, and radius are required').code(400)
      }

      const data = await fetchAssetData(assetLatitude, assetLongitude, assetRadius)
      return h.response(data).code(200)
    } catch (error) {
      console.error(error)
      return h.response(error.message).code(500)
    }
  }
}
