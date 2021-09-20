'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const xmlParser = require('xml2json')

class ImportLayerController {
  /**
   * create various layer with data received from API
   * @param {*} param0
   */
  async store ({ request, params, response }) {
    const layerType = request.input('layerType')
    const reqType = request.input('reqType')
    // Aqui vamos importar utilizando o xml

    // Funcionando beleza
    const ceos = request.input('ceos')
    const ctos = request.input('ctos')
    const clients = request.input('clients')

    if (layerType === 'CEOS') {
      const ceosCreated = await request.provider.ceos().createMany(ceos)
      return ceosCreated
    } else if (layerType === 'CTOS') {
      const ctosCreated = await request.provider.ctos().createMany(ctos)
      return ctosCreated
    } else if (layerType === 'CLIENTS') {
      const clientsCreated = await request.provider
        .clients()
        .createMany(clients)
      return clientsCreated
    }
  }
}

module.exports = ImportLayerController
