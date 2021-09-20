'use strict'

class CeoGeoJsonController {
  async index ({ request }) {
    const ceos = await request.provider.ceos().fetch()

    const ceosx = JSON.parse(JSON.stringify(ceos))

    const geojson = await ceosx.map((ceo, index) => {
      const latitude = JSON.parse(ceo.coordinates).latitude
      const longitude = JSON.parse(ceo.coordinates).longitude

      const data = {
        type: 'Feature',
        properties: {
          data: ceo
        },
        geometry: {
          type: 'Point',
          coordinates: [longitude, latitude]
        }
      }
      return data
    })

    return geojson
  }
}

module.exports = CeoGeoJsonController
