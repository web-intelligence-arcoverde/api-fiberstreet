'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class RelCableClient extends Model {
  provider () {
    return this.belongsTo('App/Models/Provider')
  }

  client () {
    return this.belongsTo('App/Models/Client')
  }

  cable () {
    return this.belongsTo('App/Models/Cable')
  }
}

module.exports = RelCableClient
