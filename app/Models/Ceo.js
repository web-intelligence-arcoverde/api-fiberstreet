'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Ceo extends Model {
  static boot () {
    super.boot()

    this.addHook('afterCreate', 'CeoHook.sendNewCeo')
    this.addHook('afterUpdate', 'CeoHook.sendUpdatedCeo')
    this.addHook('afterDelete', 'CeoHook.sendDeletedCeo')
  }

  provider () {
    return this.belongsTo('App/Models/Provider')
  }

  ceo () {
    return this.belongsTo('App/Models/Ceo')
  }

  cable () {
    return this.belongsTo('App/Models/Cable')
  }
}

module.exports = Ceo
