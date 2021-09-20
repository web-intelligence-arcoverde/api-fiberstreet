'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Spreadsheet extends Model {
  provider () {
    return this.belongsTo('App/Models/Provider')
  }

  ceo () {
    return this.belongsTo('App/Models/Ceo')
  }
}

module.exports = Spreadsheet
