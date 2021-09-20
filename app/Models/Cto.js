'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cto extends Model {
  static boot () {
    super.boot()

    this.addHook('afterCreate', 'CtoHook.sendNewCto')
    this.addHook('afterDelete', 'CtoHook.sendDeletedCto')
    this.addHook('afterUpdate', 'CtoHook.sendUpdatedCto')
  }

  provider () {
    return this.belongsTo('App/Models/Provider')
  }

  splitters () {
    return this.hasMany('App/Models/Splitter')
  }
}

module.exports = Cto
