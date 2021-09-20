"use strict";

class ClientGeoJsonController {
  async index({ request }) {
    const clients = await request.provider.clients().fetch();

    const clientsx = JSON.parse(JSON.stringify(clients));

    const geojson = await clientsx.map((client, index) => {
      const latitude = JSON.parse(client.coordinates).latitude;
      const longitude = JSON.parse(client.coordinates).longitude;
      const data = {
        type: "Feature",
        properties: {
          data: client
        },
        geometry: {
          type: "Point",
          coordinates: [longitude, latitude]
        }
      };
      return data;
    });

    return geojson;
  }
}

module.exports = ClientGeoJsonController;
