'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cable extends Model {
  static boot () {
    super.boot()

    this.addHook('afterCreate', 'CableHook.sendNewCable')
    this.addHook('afterDelete', 'CableHook.sendDeletedCable')
    this.addHook('afterUpdate', 'CableHook.sendUpdatedCable')
    // this.addHook('afterCreate', 'CableHook.sendWs')
  }

  provider () {
    return this.belongsTo('App/Models/Provider')
  }

  fibers () {
    return this.hasMany('App/Models/Fiber')
  }
}

module.exports = Cable
