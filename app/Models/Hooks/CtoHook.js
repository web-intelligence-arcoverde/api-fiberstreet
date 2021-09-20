'use strict'

const Ws = use('Ws')

const CtoHook = exports = module.exports = {}

CtoHook.method = async (modelInstance) => {
}

CtoHook.sendNewCto = async cto => {
  const { slug } = await cto.provider().fetch()

  console.log(slug)

  const topic = Ws.getChannel('ctos:*').topic(
    `ctos:${cto.provider_id}`
  )

  const ctox = JSON.parse(JSON.stringify(cto))

  const { coordinates } = ctox
  const data = {
    type: 'Feature',
    properties: {
      data: cto
    },
    geometry: {
      type: 'Point',
      coordinates: [coordinates.longitude, coordinates.latitude]
    }
  }

  // console.log(data)
  topic && topic.broadcastToAll('newCto', data)
}

CtoHook.sendDeletedCto = async cto => {
  const topic = Ws.getChannel('ctos:*').topic(
    `ctos:${cto.provider_id}`
  )

  topic && topic.broadcastToAll('deletedCto', cto)
}

CtoHook.sendUpdatedCto = async cto => {
  const topic = Ws.getChannel('ctos:*').topic(
    `ctos:${cto.provider_id}`
  )

  const ctox = JSON.parse(JSON.stringify(cto))

  const { coordinates } = ctox
  const data = {
    type: 'Feature',
    properties: {
      data: cto
    },
    geometry: {
      type: 'Point',
      coordinates: [coordinates.longitude, coordinates.latitude]
    }
  }

  topic && topic.broadcastToAll('updatedCto', data)
}
