'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SpreadsheetSchema extends Schema {
  up () {
    this.create('spreadsheets', table => {
      table.increments()
      table.string('file').notNullable()
      table.string('name').notNullable()
      table.string('type', 250)
      table.string('subtype', 250)
      table
        .integer('ceo_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('ceos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('provider_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('providers')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('spreadsheets')
  }
}

module.exports = SpreadsheetSchema
