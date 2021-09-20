'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SpreadsheetLinkSchema extends Schema {
  up () {
    this.create('spreadsheet_links', table => {
      table.increments()
      table
        .string('sublink', 255)
        .notNullable()
        .unique()
        .index()
      table.timestamp('sublink_created_at')
      table.boolean('is_revoked').defaultTo(false)
      table
        .integer('ceo_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('ceos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('spreadsheet_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('spreadsheets')
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
    this.drop('spreadsheet_links')
  }
}

module.exports = SpreadsheetLinkSchema
