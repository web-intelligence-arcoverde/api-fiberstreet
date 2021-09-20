'use strict'

class CtoGeoJsonController {
  async index ({ request }) {
    const ctos = await request.provider.ctos().fetch()

    const ctosx = JSON.parse(JSON.stringify(ctos))

    const geojson = await ctosx.map((cto, index) => {
      const latitude = JSON.parse(cto.coordinates).latitude
      const longitude = JSON.parse(cto.coordinates).longitude

      const data = {
        type: 'Feature',
        properties: {
          data: cto
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

module.exports = CtoGeoJsonController
