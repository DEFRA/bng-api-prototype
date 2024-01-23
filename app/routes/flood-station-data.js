const Wreck = require('@hapi/wreck')

const fetchFloodStationData = async function (stationId) {
  const url = `https://environment.data.gov.uk/flood-monitoring/id/stations/${stationId}`

  const { payload } = await Wreck.get(url, { json: true })
  return payload
}

module.exports = {
  method: 'GET',
  path: '/flood-station/{stationId}',
  handler: async (request, h) => {
    const stationId = request.params.stationId
    const data = await fetchFloodStationData(stationId)

    return h.response(data)
  }
}
