const Wreck = require('@hapi/wreck')

const fetchAssetData = async () => {
  const url =
    'https://environment.data.gov.uk/asset-management/maintained-asset.geojson?lat=50.828848&lng=-0.24883&radius=5'

  const { payload } = await Wreck.get(url, { json: true })

  return payload
}

module.exports = {
  method: 'GET',
  path: '/asset-data',
  handler: async (request, h) => {
    const data = await fetchAssetData()
    return h.response(data).code(200)
  }
}
