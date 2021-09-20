'use strict'

const Ws = use('Ws')

const CableHook = exports = module.exports = {}

/**
 * Send cable when this is created to frontend get and push into geojson data
 * of FeatureColletion of LineString */
CableHook.sendWs = async cable => {
  const topic = Ws.getChannel('cables').topic('cables')

  const coordParsed = await JSON.parse(cable.coordinates)
  const coordinates = []
  await coordParsed.map((coordinate, index) => {
    return coordinates.push([coordinate.longitude, coordinate.latitude])
  })

  const data = {
    type: 'Feature',
    properties: {
      data: cable
    },
    geometry: {
      type: 'LineString',
      coordinates
    }
  }

  if (topic) {
    topic.broadcastAll('message', data)
  }
}

CableHook.sendNewCable = async newCable => {
  const topic = Ws.getChannel('cables:*').topic(`cables:${newCable.provider_id}`)

  const coordParsed = await JSON.parse(newCable.coordinates)
  const coordinates = []
  await coordParsed.map((coordinate, index) => {
    return coordinates.push([coordinate.longitude, coordinate.latitude])
  })

  const data = {
    type: 'Feature',
    properties: {
      data: newCable
    },
    geometry: {
      type: 'LineString',
      coordinates
    }
  }

  topic && topic.broadcastToAll('newCable', data)
}

CableHook.sendDeletedCable = async cable => {
  const topic = Ws.getChannel('cables:*').topic(`cables:${cable.provider_id}`)

  topic && topic.broadcastToAll('deletedCable', cable)
}

CableHook.sendUpdatedCable = async cable => {
  const topic = Ws.getChannel('cables:*').topic(`cables:${cable.provider_id}`)

  const coordParsed = await JSON.parse(cable.coordinates)
  const coordinates = []
  await coordParsed.map((coordinate, index) => {
    return coordinates.push([coordinate.longitude, coordinate.latitude])
  })

  const data = {
    type: 'Feature',
    properties: {
      data: cable
    },
    geometry: {
      type: 'LineString',
      coordinates
    }
  }

  topic && topic.broadcastToAll('updatedCable', data)
}
