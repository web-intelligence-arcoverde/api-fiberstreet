'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class RelCableCeo extends Model {
  provider () {
    return this.belongsTo('App/Models/Provider')
  }

  cto () {
    return this.belongsTo('App/Models/Cto')
  }

  cable () {
    return this.belongsTo('App/Models/Cable')
  }
}

module.exports = RelCableCeo
