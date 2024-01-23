const Wreck = require('@hapi/wreck')

const fetchFloodStationData = async function () {
  const url = `https://environment.data.gov.uk/flood-monitoring/id/stations/E8980`

  const { payload } = await Wreck.get(url, { json: true })
  return payload
}

module.exports = {
  method: 'GET',
  path: '/flood-station',
  handler: async (request, h) => {
    const data = await fetchFloodStationData()

    return h.response(data)
  },
}
