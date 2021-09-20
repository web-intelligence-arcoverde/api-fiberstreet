'use strict'

class ImportLayer {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      layerType: 'required',
      ceos: 'required_when:layerType,CEOS',
      ctos: 'required_when:layerType,CTOS',
      clients: 'required_when:layerType,CLIENTS'
    }
  }
}

module.exports = ImportLayer
