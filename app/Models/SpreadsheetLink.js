'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SpreadsheetLink extends Model {
  spreadsheet () {
    return this.belongsTo('App/Models/Spreadsheet')
  }
}

module.exports = SpreadsheetLink
