'use strict'

class Cable {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required',
      type: 'required',
      coordinates: 'required',
      fiberAmount: 'required'
    }
  }
}

module.exports = Cable
