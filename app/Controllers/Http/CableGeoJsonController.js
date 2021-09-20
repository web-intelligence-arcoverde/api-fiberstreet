'use strict'

class CableGeoJsonController {
  /** Returns all cables in the first request */
  async index ({ request }) {
    const cables = await request.provider.cables().fetch()

    const cablesx = JSON.parse(JSON.stringify(cables))

    const geojson = await cablesx.map(cable => {
      const coord = JSON.parse(cable.coordinates)

      const coords = coord.map(coordinates => {
        return [coordinates.longitude, coordinates.latitude]
      })

      const data = {
        type: 'Feature',
        properties: {
          data: cable
        },
        geometry: {
          type: 'LineString',
          coordinates: coords
        }
      }

      return data
    })

    return geojson
  }
}

module.exports = CableGeoJsonController
