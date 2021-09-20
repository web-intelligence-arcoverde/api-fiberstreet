'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Client extends Model {
  static boot () {
    super.boot()

    this.addHook('afterCreate', 'ClientHook.sendNewClient')
    this.addHook('afterDelete', 'ClientHook.sendDeletedClient')
    this.addHook('afterUpdate', 'ClientHook.sendUpdatedClient')
  }

  provider () {
    return this.belongsTo('App/Models/Provider')
  }
}

module.exports = Client
