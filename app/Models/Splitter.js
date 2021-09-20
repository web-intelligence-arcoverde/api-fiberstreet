'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Splitter extends Model {
  provider () {
    return this.belongsTo('App/Models/Provider')
  }

  ceo () {
    return this.belongsTo('App/Models/Ceo')
  }

  cto () {
    return this.belongsTo('App/Models/Cto')
  }

  fiber () {
    return this.belongsTo('App/Models/Fiber')
  }
}

module.exports = Splitter
