'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Fiber extends Model {
  provider () {
    return this.belongsTo('App/Models/Provider')
  }

  cable () {
    return this.belongsTo('App/Models/Cable')
  }
}

module.exports = Fiber
