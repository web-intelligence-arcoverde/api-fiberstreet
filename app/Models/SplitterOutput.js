'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SplitterOutput extends Model {
  provider () {
    return this.belongsTo('App/Models/Provider')
  }

  client () {
    return this.belongsTo('App/Models/Client')
  }

  splitter () {
    return this.belongsTo('App/Models/Splitter')
  }
}

module.exports = SplitterOutput
