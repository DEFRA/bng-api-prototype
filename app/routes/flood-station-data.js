const Wreck = require('@hapi/wreck')

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

module.exports = {
  method: 'GET',
  path: '/flood-station/{id}',
  handler: async (request, h) => {
    try {
      const { id: stationId } = request.params

      if (!stationId) {
        return h.response('Missing parameter: stationId is required').code(400)
      }

      const data = await fetchFloodStationData(stationId)

      return h.response(data).code(200)
    } catch (error) {
      return h.response(error.message).code(500)
    }
  }
}
