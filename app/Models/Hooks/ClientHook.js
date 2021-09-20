'use strict'

const Ws = use('Ws')
// const Client = use('App/Models/Client')

const ClientHook = exports = module.exports = {}

ClientHook.method = async (modelInstance) => {
}

ClientHook.sendNewClient = async client => {
  const { slug } = await client.provider().fetch()

  console.log(slug)

  const topic = Ws.getChannel('clients:*').topic(
    `clients:${client.provider_id}`
  )

  const cliente = JSON.parse(JSON.stringify(client))

  const { coordinates } = cliente
  const data = {
    type: 'Feature',
    properties: {
      data: client
    },
    geometry: {
      type: 'Point',
      coordinates: [coordinates.longitude, coordinates.latitude]
    }
  }

  topic && topic.broadcastToAll('newClient', data)
}

ClientHook.sendDeletedClient = async client => {
  const topic = Ws.getChannel('clients:*').topic(
    `clients:${client.provider_id}`
  )
  console.log(client)
  topic && topic.broadcastToAll('deletedClient', client)
}

ClientHook.sendUpdatedClient = async client => {
  const topic = Ws.getChannel('clients:*').topic(
    `clients:${client.provider_id}`
  )

  // Converting client to usable object
  const cliente = JSON.parse(JSON.stringify(client))

  // Obtaining coordinates
  const { coordinates } = cliente

  // Creating geojson
  const updatedClient = {
    type: 'Feature',
    properties: {
      data: client
    },
    geometry: {
      type: 'Point',
      coordinates: [coordinates.longitude, coordinates.latitude]
    }
  }

  topic && topic.broadcastToAll('updatedClient', updatedClient)
}
