'use strict'

const Ws = use('Ws')

const CeoHook = exports = module.exports = {}

CeoHook.method = async (modelInstance) => {
}

CeoHook.sendNewCeo = async ceo => {
  const topic = Ws.getChannel('ceos:*').topic(`ceos:${ceo.provider_id}`)

  const ceox = JSON.parse(JSON.stringify(ceo))
  const { coordinates } = ceox

  const data = {
    type: 'Feature',
    properties: {
      data: ceox
    },
    geometry: {
      type: 'Point',
      coordinates: [coordinates.longitude, coordinates.latitude]
    }
  }

  topic && topic.broadcastToAll('newCeo', data)
}

CeoHook.sendUpdatedCeo = async ceo => {
  const topic = Ws.getChannel('ceos:*').topic(`ceos:${ceo.provider_id}`)

  const ceox = JSON.parse(JSON.stringify(ceo))
  const { coordinates } = ceox

  const data = {
    type: 'Feature',
    properties: {
      data: ceox
    },
    geometry: {
      type: 'Point',
      coordinates: [coordinates.longitude, coordinates.latitude]
    }
  }

  // console.log(ceo)

  topic && topic.broadcastToAll('updatedCeo', data)
}

CeoHook.sendDeletedCeo = async ceo => {
  const topic = Ws.getChannel('ceos:*').topic(`ceos:${ceo.provider_id}`)

  topic && topic.broadcastToAll('deletedCeo', ceo)
}
