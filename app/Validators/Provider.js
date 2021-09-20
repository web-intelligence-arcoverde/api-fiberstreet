'use strict'

class Provider {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required',
      cnpj: 'required'
    }
  }
}

module.exports = Provider
